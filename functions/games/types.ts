export type TPagesFunctionEnv = {
  GAMES: KVNamespace;
  GAMES_BY_DATE: KVNamespace;
  SEASONS: KVNamespace;
};

export type TPagesFunctionEventContext = EventContext<
  TPagesFunctionEnv,
  any,
  Record<string, unknown>
>;

export type TSeasonData = {
  id?: string;
  title?: string;
  start?: string;
  end?: string;
};
