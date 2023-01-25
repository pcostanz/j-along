// https://developers.cloudflare.com/workers/runtime-apis/html-rewriter/
// https://qwtel.com/posts/software/how-to-use-htmlrewriter-for-web-scraping/
export const onRequest: PagesFunction = async (context) => {
  const response = await fetch(
    "https://j-archive.com/showseason.php?season=39",
    {
      headers: {
        "content-type": "text/html;charset=UTF-8",
      },
    }
  );
  const respText = await response.text();
  return new Response(respText, {
    headers: {
      "content-type": "text/html;charset=UTF-8",
    },
  });
};
