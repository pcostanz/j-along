export type TPagesFunctionEnv = {
  GAMES: KVNamespace;
  GAMES_BY_DATE: KVNamespace;
  SEASONS: KVNamespace;
  CF_PAGES: string;
  CF_PAGES_URL: string;
};

export type TPagesFunctionEventContext = EventContext<
  TPagesFunctionEnv,
  any,
  Record<string, unknown>
>;
