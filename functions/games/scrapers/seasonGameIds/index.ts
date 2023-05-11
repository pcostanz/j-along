import { scrape } from "../scraper";
import { GAME_LINK, GAME_TEXT } from "./selectors";

import { getHandlers } from "./handlers";

export const scrapeSeasonGameIds = async (seasonId: string) => {
  const games: any[] = [];
  const gamesHandlers = getHandlers(games);

  await scrape(`https://j-archive.com/showseason.php?season=${seasonId}`, [
    {
      selector: GAME_LINK,
      handler: gamesHandlers.GAME_LINK,
    },
    {
      selector: GAME_TEXT,
      handler: gamesHandlers.GAME_TEXT,
    },
  ]);

  const gameIds = games.reduce((prev, next) => {
    return {
      ...prev,
      [next.date]: next.id,
    };
  }, {});

  return gameIds;
};
