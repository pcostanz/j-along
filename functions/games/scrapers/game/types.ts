import { TJeopardyClue } from "../../../../types";

export enum EJArchiveRoundIdentifiers {
  CATEGORIES = "CATEGORIES",
  CLUE_ORDER = "CLUE_ORDER",
  CLUE_DAILY_DOUBLE = "CLUE_DAILY_DOUBLE",
  CLUE_TEXT = "CLUE_TEXT",
  CLUE_CONTESTANT_CORRECT = "CLUE_CONTESTANT_CORRECT",
  CLUE_CONTESTANTS_INCORRECT = "CLUE_CONTESTANTS_INCORRECT",
  CLUE_CORRECT_RESPONSE = "CLUE_CORRECT_RESPONSE",
}

export type TJeopardyRound = {
  clueIndex: number;
  categories: string[];
  clues: TJeopardyClue[];
  sortClues: () => void;
};
