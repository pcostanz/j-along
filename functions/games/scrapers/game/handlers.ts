import { TJeopardyClue } from "../../../../types";
import { EJArchiveRoundIdentifiers, TJeopardyRound } from "./types";

export class JeopardyRound implements TJeopardyRound {
  clueIndex = -1;

  categories: string[] = [];

  clues: TJeopardyClue[] = [];

  sortClues = () => {
    this.clues.sort((a, b) => a.order - b.order);
  };
}

export const getHandlers = (
  round: TJeopardyRound
): {
  [key in EJArchiveRoundIdentifiers]: HTMLRewriterElementContentHandlers;
} => ({
  [EJArchiveRoundIdentifiers.CATEGORIES]: {
    text({ text }) {
      if (!text) return;

      round.categories.push(text);
    },
  },
  [EJArchiveRoundIdentifiers.CLUE_ORDER]: {
    text({ text }) {
      if (!text) return;

      round.clueIndex = round.clueIndex + 1;
      round.clues.push({
        order: Number(text),
        right: undefined,
        wrong: [],
        category: round.categories[round.clueIndex % 6],
        value: (Math.floor(round.clueIndex / 6) + 1) * 200,
      });
    },
  },
  [EJArchiveRoundIdentifiers.CLUE_DAILY_DOUBLE]: {
    text({ text }) {
      if (!text) return;

      // "DD: $5,000" => 5000
      round.clues[round.clueIndex].dailyDoubleWager = Number(
        text.match(/\d+/g).join("")
      );
    },
  },
  [EJArchiveRoundIdentifiers.CLUE_TEXT]: {
    text({ text }) {
      if (!text) return;

      const clueText = round.clues[round.clueIndex].text;

      if (!clueText) {
        round.clues[round.clueIndex].text = text;
      } else {
        round.clues[round.clueIndex].text = clueText + text;
      }
    },
  },
  [EJArchiveRoundIdentifiers.CLUE_CONTESTANT_CORRECT]: {
    text({ text }) {
      if (!text) return;

      round.clues[round.clueIndex].right = text;
    },
  },
  [EJArchiveRoundIdentifiers.CLUE_CONTESTANTS_INCORRECT]: {
    text({ text }) {
      if (!text) return;

      if (text === "Triple Stumper") {
        round.clues[round.clueIndex].tripleStumper = true;
      } else {
        round.clues[round.clueIndex].wrong.push(text);
      }
    },
  },
  [EJArchiveRoundIdentifiers.CLUE_CORRECT_RESPONSE]: {
    text({ text }) {
      if (!text) return;

      round.clues[round.clueIndex].correctResponse = text;
    },
  },
});
