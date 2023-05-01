import { TPagesFunctionEventContext, TSeasonData } from "./types";

import {
  ROUND_SELECTORS_JEOPARDY,
  ROUND_SELECTORS_DOUBLE_JEOPARDY,
} from "./selectors";

import { getHandlers, JeopardyRound } from "./handlers";

const isDateWithinInterval = (
  date: string,
  start: string,
  end: string
): boolean => {
  if (!date || !start || !end) return false;

  const time = new Date(date).getTime();
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();

  if (startTime >= endTime) {
    throw new Error("Start time must be earlier than end time");
  }

  return time >= startTime && time <= endTime;
};

// getGameByDate? if fetch handlers are abstracted just to interact with j-archive
// https://www.newline.co/@bespoyasov/how-to-use-fetch-with-typescript--a81ac257
export const fetchGameByDate = async (
  context: TPagesFunctionEventContext,
  date: string
): Promise<any> => {
  const gameIds = await getGameIds(context, date);

  // @TODO: Types
  const gamesData: any[] = await Promise.all(
    gameIds.map(async (gameId: string): Promise<any> => {
      const gameData = await fetchGameData(context, gameId);
      return gameData;
    })
  );

  return gamesData;
};

// @TODO: Types for this whole thing
export const getGameIds = async (
  context: TPagesFunctionEventContext,
  date: string
): Promise<any> => {
  const gameIdsFromKV = await context.env.GAMES.get(date);
  if (gameIdsFromKV) return JSON.parse(gameIdsFromKV);

  const seasons = await fetchSeasons(context);

  const seasonsToCheck = seasons.reduce((prev, next) => {
    const seasonHasGame = isDateWithinInterval(date, next.start, next.end);

    if (seasonHasGame) {
      return [...prev, next.id];
    } else return prev;
  }, []);

  const seasonGames: any[] = await Promise.all(
    seasonsToCheck.map(async (seasonId: string): Promise<any> => {
      const gameStuff = await fetchSeason(context, seasonId);
      return gameStuff;
    })
  );

  const gameIds = seasonGames.reduce((prev, next) => {
    if (next[date]) {
      return [...prev, next[date]];
    } else {
      return prev;
    }
  }, []);

  if (gameIds.length) {
    await context.env.GAMES.put(date, JSON.stringify(gameIds));
  }

  return gameIds;
};

export const fetchSeason = async (
  context: TPagesFunctionEventContext,
  id: string
) => {
  const seasonFromKV = await context.env.SEASONS.get(id);
  if (seasonFromKV) {
    return JSON.parse(seasonFromKV);
  }

  const response = await fetch(
    `https://j-archive.com/showseason.php?season=${id}`
  );

  const games = [];

  const rewriter = new HTMLRewriter()
    .on("tr a", {
      element(el) {
        const href = el.getAttribute("href");
        const gameId = href?.split("=")[1];
        games.push({
          id: gameId,
          date: undefined,
        });
      },
    })
    .on("tr", {
      text({ text }) {
        if (!text) return;

        if (text.includes("&#35")) {
          const date = text.split("aired&#160;")[1];
          games[games.length - 1].date = date;
        }
      },
    });
  await rewriter.transform(response).text();

  const gameDateIds = games.reduce((prev, next) => {
    return {
      ...prev,
      [next.date]: next.id,
    };
  }, {});

  await context.env.SEASONS.put(id, JSON.stringify(gameDateIds));
  return gameDateIds;
};

// Promise<TSeasonData[]>
export const fetchSeasons = async (
  context: TPagesFunctionEventContext
): Promise<any> => {
  const seasonsFromKV = await context.env.SEASONS.get("ALL");
  if (seasonsFromKV) return JSON.parse(seasonsFromKV);

  const response = await fetch("https://j-archive.com/listseasons.php");
  const seasons: TSeasonData[] = [];
  const rewriter = new HTMLRewriter()
    .on("tr a", {
      element(el) {
        const href = el.getAttribute("href");
        const seasonId = href?.split("=")[1];
        seasons.push({
          id: seasonId,
          start: undefined,
          end: undefined,
          title: undefined,
        });
      },
    })
    .on("tr", {
      text({ text }) {
        // There are a lot of empty nodes and line breaks in the tr elements
        if (text.length === 0) return;

        // We don't care about how many games are archived, we're gonna put these into a database
        // ex: (119 games archived)
        if (text.startsWith("(")) return;

        const firstFour = text.substring(0, 3);

        // If we have text, concatenate it in cases where <i> elements are used for italics in some season titles
        if (isNaN(firstFour as unknown as number)) {
          let title = seasons[seasons.length - 1].title;

          if (title === undefined) {
            title = text;
          } else {
            title = title + text;
          }

          seasons[seasons.length - 1].title = title;
        } else {
          const dates = text.split(" to ");
          seasons[seasons.length - 1].start = dates[0];
          seasons[seasons.length - 1].end = dates[1];
        }
      },
    });
  await rewriter.transform(response).text();
  await context.env.SEASONS.put("ALL", JSON.stringify(seasons));
  return seasons;
};

// separate fetch methods so i can generically handle errors and then separate out fetch and parse
// fix Promise<any> to be a typed game
export const fetchGameData = async (
  context: TPagesFunctionEventContext,
  id: string
): Promise<any> => {
  const gameDataFromKV = await context.env.GAMES.get(id);

  if (gameDataFromKV) return JSON.parse(gameDataFromKV);

  const response = await fetch(
    `https://j-archive.com/showgame.php?game_id=${id}`
  );

  const jeopardyRound = new JeopardyRound();
  const doubleJeopardyRound = new JeopardyRound();

  const jeopardyHandlers = getHandlers(jeopardyRound);
  const doubleJeopardyHandlers = getHandlers(doubleJeopardyRound);

  // Selector/Handler ordering is important because the handlers are
  // aggregating data as encountered into JeopardyRound instances
  const rewriter = new HTMLRewriter()

    // @TODO: Contestants
    // @TODO: Show number
    // @TODO: Final scores? (I might be able to compute this client side)
    // @TODO: Coryat / combined coryat (also may be able to handle client side)

    // Jeopardy Round

    .on(ROUND_SELECTORS_JEOPARDY.CATEGORIES, jeopardyHandlers.CATEGORIES)
    .on(ROUND_SELECTORS_JEOPARDY.CLUE_ORDER, jeopardyHandlers.CLUE_ORDER)

    // @TODO: There is a bug with these selectors
    .on(
      ROUND_SELECTORS_JEOPARDY.CLUE_DAILY_DOUBLE,
      jeopardyHandlers.CLUE_DAILY_DOUBLE
    )
    .on(ROUND_SELECTORS_JEOPARDY.CLUE_TEXT, jeopardyHandlers.CLUE_TEXT)
    .on(
      ROUND_SELECTORS_JEOPARDY.CLUE_CONTESTANT_CORRECT,
      jeopardyHandlers.CLUE_CONTESTANT_CORRECT
    )
    .on(
      ROUND_SELECTORS_JEOPARDY.CLUE_CONTESTANTS_INCORRECT,
      jeopardyHandlers.CLUE_CONTESTANTS_INCORRECT
    )
    .on(
      ROUND_SELECTORS_JEOPARDY.CLUE_CORRECT_RESPONSE,
      jeopardyHandlers.CLUE_CORRECT_RESPONSE
    )

    // Double Jeopardy Round

    .on(
      ROUND_SELECTORS_DOUBLE_JEOPARDY.CATEGORIES,
      doubleJeopardyHandlers.CATEGORIES
    )
    .on(
      ROUND_SELECTORS_DOUBLE_JEOPARDY.CLUE_ORDER,
      doubleJeopardyHandlers.CLUE_ORDER
    )
    .on(
      ROUND_SELECTORS_DOUBLE_JEOPARDY.CLUE_DAILY_DOUBLE,
      doubleJeopardyHandlers.CLUE_DAILY_DOUBLE
    )
    .on(
      ROUND_SELECTORS_DOUBLE_JEOPARDY.CLUE_TEXT,
      doubleJeopardyHandlers.CLUE_TEXT
    )
    .on(
      ROUND_SELECTORS_DOUBLE_JEOPARDY.CLUE_CONTESTANT_CORRECT,
      doubleJeopardyHandlers.CLUE_CONTESTANT_CORRECT
    )
    .on(
      ROUND_SELECTORS_DOUBLE_JEOPARDY.CLUE_CONTESTANTS_INCORRECT,
      doubleJeopardyHandlers.CLUE_CONTESTANTS_INCORRECT
    )
    .on(
      ROUND_SELECTORS_DOUBLE_JEOPARDY.CLUE_CORRECT_RESPONSE,
      doubleJeopardyHandlers.CLUE_CORRECT_RESPONSE
    );

  // Final Jeopardy TODO

  await rewriter.transform(response).text();

  jeopardyRound.sortClues();
  doubleJeopardyRound.sortClues();

  const game = {
    id,
    clues: {
      jeopardy: jeopardyRound.clues,
      doubleJeopardy: doubleJeopardyRound.clues,
    },
  };

  await context.env.GAMES.put(id, JSON.stringify(game));

  return game;
};
