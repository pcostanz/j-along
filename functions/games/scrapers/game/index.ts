import { scrape } from "../scraper";
import {
  ROUND_SELECTORS_JEOPARDY,
  ROUND_SELECTORS_DOUBLE_JEOPARDY,
} from "./selectors";

import { getHandlers, JeopardyRound } from "./handlers";

export const scrapeGame = async (id: string) => {
  const jeopardyRound = new JeopardyRound();
  const doubleJeopardyRound = new JeopardyRound();

  const jeopardyRoundHandlers = getHandlers(jeopardyRound);
  const doubleJeopardyHandlers = getHandlers(doubleJeopardyRound);

  // @TODO: Contestants
  // @TODO: Show number
  // @TODO: Final scores? (I might be able to compute this client side)
  // @TODO: Coryat / combined coryat (also may be able to handle client side)

  await scrape(`https://j-archive.com/showgame.php?game_id=${id}`, [
    // Jeopardy Round

    {
      selector: ROUND_SELECTORS_JEOPARDY.CATEGORIES,
      handler: jeopardyRoundHandlers.CATEGORIES,
    },
    {
      selector: ROUND_SELECTORS_JEOPARDY.CLUE_ORDER,
      handler: jeopardyRoundHandlers.CLUE_ORDER,
    },
    {
      selector: ROUND_SELECTORS_JEOPARDY.CLUE_DAILY_DOUBLE,
      handler: jeopardyRoundHandlers.CLUE_DAILY_DOUBLE,
    },
    {
      selector: ROUND_SELECTORS_JEOPARDY.CLUE_TEXT,
      handler: jeopardyRoundHandlers.CLUE_TEXT,
    },
    {
      selector: ROUND_SELECTORS_JEOPARDY.CLUE_CONTESTANT_CORRECT,
      handler: jeopardyRoundHandlers.CLUE_CONTESTANT_CORRECT,
    },
    {
      selector: ROUND_SELECTORS_JEOPARDY.CLUE_CONTESTANTS_INCORRECT,
      handler: jeopardyRoundHandlers.CLUE_CONTESTANTS_INCORRECT,
    },
    {
      selector: ROUND_SELECTORS_JEOPARDY.CLUE_CORRECT_RESPONSE,
      handler: jeopardyRoundHandlers.CLUE_CORRECT_RESPONSE,
    },

    // Double Jeopardy Round

    {
      selector: ROUND_SELECTORS_DOUBLE_JEOPARDY.CATEGORIES,
      handler: doubleJeopardyHandlers.CATEGORIES,
    },
    {
      selector: ROUND_SELECTORS_DOUBLE_JEOPARDY.CLUE_ORDER,
      handler: doubleJeopardyHandlers.CLUE_ORDER,
    },
    {
      selector: ROUND_SELECTORS_DOUBLE_JEOPARDY.CLUE_DAILY_DOUBLE,
      handler: doubleJeopardyHandlers.CLUE_DAILY_DOUBLE,
    },
    {
      selector: ROUND_SELECTORS_DOUBLE_JEOPARDY.CLUE_TEXT,
      handler: doubleJeopardyHandlers.CLUE_TEXT,
    },
    {
      selector: ROUND_SELECTORS_DOUBLE_JEOPARDY.CLUE_CONTESTANT_CORRECT,
      handler: doubleJeopardyHandlers.CLUE_CONTESTANT_CORRECT,
    },
    {
      selector: ROUND_SELECTORS_DOUBLE_JEOPARDY.CLUE_CONTESTANTS_INCORRECT,
      handler: doubleJeopardyHandlers.CLUE_CONTESTANTS_INCORRECT,
    },
    {
      selector: ROUND_SELECTORS_DOUBLE_JEOPARDY.CLUE_CORRECT_RESPONSE,
      handler: doubleJeopardyHandlers.CLUE_CORRECT_RESPONSE,
    },
  ]);

  jeopardyRound.sortClues();
  doubleJeopardyRound.sortClues();

  const game = {
    id,
    clues: {
      jeopardy: jeopardyRound.clues,
      doubleJeopardy: doubleJeopardyRound.clues,
    },
  };

  return game;
};
