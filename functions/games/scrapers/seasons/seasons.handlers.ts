import { TSeasonData } from "../../types";

export const getHandlers = (
  seasons: TSeasonData[]
): {
  [key: string]: HTMLRewriterElementContentHandlers;
} => ({
  ["LINK"]: {
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
  },
  ["TEXT"]: {
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
  },
});
