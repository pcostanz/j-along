import { TSeasonData } from "./types";

import { TPagesFunctionEventContext } from "../types";

import { scrapeSeasonGameIds } from "./scrapers/seasonGameIds/index";
import { scrapeSeasons } from "./scrapers/seasons/index";
import { scrapeGame } from "./scrapers/game/index";

import { isDateWithinInterval } from "./utils";

export const getGamesForDate = async (
  context: TPagesFunctionEventContext,
  date: string
): Promise<any> => {
  const gameIds = await getGameIds(context, date);

  const gamesData: any[] = await Promise.all(
    gameIds.map(async (gameId: string): Promise<any> => {
      return await fetchGameData(context, gameId);
    })
  );

  return gamesData;
};

export const getGameIds = async (
  context: TPagesFunctionEventContext,
  date: string
): Promise<any> => {
  const gameIdsFromKV = await context.env.GAMES_BY_DATE.get(date);
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
      return await getSeasonGameIdsByDate(context, seasonId);
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
    await context.env.GAMES_BY_DATE.put(date, JSON.stringify(gameIds));
  }

  return gameIds;
};

export const getSeasonGameIdsByDate = async (
  context: TPagesFunctionEventContext,
  seasonId: string
) => {
  // SEASONS -> SEASON_GAME_IDS?
  const seasonFromKV = await context.env.SEASONS.get(seasonId);
  if (seasonFromKV) {
    return JSON.parse(seasonFromKV);
  }

  const gameIds = await scrapeSeasonGameIds(seasonId);

  await context.env.SEASONS.put(seasonId, JSON.stringify(gameIds));
  return gameIds;
};

export const fetchSeasons = async (
  context: TPagesFunctionEventContext
): Promise<TSeasonData[]> => {
  const seasonsFromKV = await context.env.SEASONS.get("_ALL");
  if (seasonsFromKV) return JSON.parse(seasonsFromKV);

  const seasons = await scrapeSeasons();
  await context.env.SEASONS.put("_ALL", JSON.stringify(seasons));
  return seasons;
};

export const fetchGameData = async (
  context: TPagesFunctionEventContext,
  id: string
): Promise<any> => {
  const gameDataFromKV = await context.env.GAMES.get(id);

  if (gameDataFromKV) return JSON.parse(gameDataFromKV);

  const game = await scrapeGame(id);
  await context.env.GAMES.put(id, JSON.stringify(game));

  return game;
};
