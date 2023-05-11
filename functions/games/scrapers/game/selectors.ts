import { EJArchiveRoundIdentifiers } from "./types";
const JEOPARDY_ROUND = `#jeopardy_round`;
const DOUBLE_JEOPARDY_ROUND = `#double_jeopardy_round`;

export const getJeopardyRoundSelectors = (round: string) => {
  const roundSelector = `${round} .round`;
  const clueSelector = `${roundSelector} .clue`;

  return {
    [EJArchiveRoundIdentifiers.CATEGORIES]: `${roundSelector} .category .category_name`,
    [EJArchiveRoundIdentifiers.CLUE_ORDER]: `${clueSelector} .clue_order_number`,
    [EJArchiveRoundIdentifiers.CLUE_DAILY_DOUBLE]: `${clueSelector} .clue_value_daily_double`,
    [EJArchiveRoundIdentifiers.CLUE_TEXT]: `${clueSelector} tr td.clue_text:first-child`,
    [EJArchiveRoundIdentifiers.CLUE_CONTESTANT_CORRECT]: `${clueSelector} .right`,
    [EJArchiveRoundIdentifiers.CLUE_CONTESTANTS_INCORRECT]: `${clueSelector} .wrong`,
    [EJArchiveRoundIdentifiers.CLUE_CORRECT_RESPONSE]: `${clueSelector} .correct_response`,
  };
};

export const ROUND_SELECTORS_JEOPARDY =
  getJeopardyRoundSelectors(JEOPARDY_ROUND);

export const ROUND_SELECTORS_DOUBLE_JEOPARDY = getJeopardyRoundSelectors(
  DOUBLE_JEOPARDY_ROUND
);
