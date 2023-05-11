export const getHandlers = (
  games: any[]
): {
  [key: string]: HTMLRewriterElementContentHandlers;
} => ({
  ["GAME_LINK"]: {
    element(el) {
      const href = el.getAttribute("href");
      const gameId = href?.split("=")[1];
      games.push({
        id: gameId,
        date: undefined,
      });
    },
  },
  ["GAME_TEXT"]: {
    text({ text }) {
      if (!text) return;

      if (text.includes("&#35")) {
        const date = text.split("aired&#160;")[1];
        games[games.length - 1].date = date;
      }
    },
  },
});
