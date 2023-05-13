import { Toucan } from "toucan-js";
import { TPagesFunction } from "./types";

export const onRequestOptions: TPagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Max-Age": "86400",
    },
  });
};

export const onRequest: TPagesFunction = async ({
  next,
  env,
  data,
  request,
}) => {
  const isDev = env.CF_PAGES !== "1";
  const isPreview = env.CF_PAGES_ENVIRONMENT === "preview";

  data.sentry = new Toucan({
    environment: isDev ? "development" : isPreview ? "preview" : "production",
    dsn: "https://65a335c2d7ed47b6979c21a3e152180b@o4505163580506112.ingest.sentry.io/4505163607638016",
  });

  try {
    const response = await next();

    if (!isDev) {
      // @TODO: Limit this to j-along.pages.dev and subdomains for previews
      console.log(env.CF_PAGES_URL);
      console.log(request.url);
      response.headers.set("Access-Control-Allow-Origin", "*");
      response.headers.set("Access-Control-Max-Age", "86400");
    }

    return response;
  } catch (err) {
    data.sentry.captureException(err);

    if (isDev) {
      throw err;
    } else {
      return new Response(JSON.stringify({ error: "Something went wrong!" }), {
        status: 400,
      });
    }
  }
};
