import { getGamesForDate } from "./handlers";
import { TPagesFunction } from "../types";

export const onRequest: TPagesFunction = async (context) => {
  const date = context.params.date as string;
  const games = await getGamesForDate(context, date);

  return new Response(JSON.stringify(games), {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  });
};
