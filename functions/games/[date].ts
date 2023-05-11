import { getGamesForDate } from "./handlers";
import { TPagesFunctionEnv } from "./types";

export const onRequest: PagesFunction<TPagesFunctionEnv> = async (context) => {
  const date = context.params.date as string;
  const games = await getGamesForDate(context, date);

  return new Response(JSON.stringify(games), {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  });
};
