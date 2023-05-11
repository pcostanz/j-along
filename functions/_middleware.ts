import { TPagesFunctionEnv } from "./types";

// Respond to OPTIONS method
export const onRequestOptions: PagesFunction<TPagesFunctionEnv> = async () => {
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

// Set CORS to all /api responses
export const onRequest: PagesFunction<TPagesFunctionEnv> = async ({
  next,
  env,
  request,
}) => {
  const response = await next();

  // CF_PAGES is a Cloudflare Pages system environment variable, when it's
  // set we can assume that we're in a production or preview environment
  //
  // https://developers.cloudflare.com/pages/platform/build-configuration/#environment-variables
  if (env.CF_PAGES === "1") {
    // @TODO: Limit this to j-along.pages.dev and subdomains for previews
    console.log(env.CF_PAGES_URL);
    console.log(request.url);
    response.headers.set("Access-Control-Allow-Origin", "*");
  } else {
    response.headers.set("Access-Control-Allow-Origin", "*");
  }
  response.headers.set("Access-Control-Max-Age", "86400");
  return response;
};
