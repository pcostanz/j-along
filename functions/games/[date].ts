import { fetchGameByDate } from "./utils";
import { TPagesFunctionEnv } from "./types";

// @TODO: Need to add a way to force update KV entries, since everything
// is heavily cached. Theoretically we should know around the times when
// new seasons should be checked for, but also it could be helpful while developing
// and changing things? Not sure yet
export const onRequest: PagesFunction<TPagesFunctionEnv> = async (context) => {
  const date = context.params.date as string;
  const games = await fetchGameByDate(context, date);

  return new Response(JSON.stringify(games), {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  });
};
