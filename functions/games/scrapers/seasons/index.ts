import { scrape } from "../scraper";
import { SEASON_LINK, SEASON_TEXT } from "./seasons.selectors";

import { getHandlers } from "./seasons.handlers";

import { TSeasonData } from "../../types";

export const scrapeSeasons = async () => {
  const seasons: TSeasonData[] = [];
  const seasonHandlers = getHandlers(seasons);

  await scrape(`https://j-archive.com/listseasons.php`, [
    {
      selector: SEASON_LINK,
      handler: seasonHandlers.LINK,
    },
    {
      selector: SEASON_TEXT,
      handler: seasonHandlers.TEXT,
    },
  ]);

  return seasons;
};
