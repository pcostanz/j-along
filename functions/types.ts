import type { Toucan } from "toucan-js";

type TCFPagesEnvironments = "production" | "preview";

export type TPagesFunctionEnv = {
  GAMES: KVNamespace;
  GAMES_BY_DATE: KVNamespace;
  SEASONS: KVNamespace;
  CF_PAGES: string;
  CF_PAGES_URL: string;
  CF_PAGES_ENVIRONMENT: TCFPagesEnvironments;
};

export type SentryData = { sentry: Toucan };

export type TPagesFunction = PagesFunction<
  TPagesFunctionEnv,
  any,
  Record<string, unknown> & SentryData
>;

export type TPagesFunctionEventContext = EventContext<
  TPagesFunctionEnv,
  any,
  Record<string, unknown> & SentryData
>;
