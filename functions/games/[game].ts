export const onRequest: PagesFunction = async (context) => {
  const response = await fetch(
    "https://j-archive.com/showgame.php?game_id=7670",
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
