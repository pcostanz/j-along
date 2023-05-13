import React from "react";
import {
  createBrowserRouter,
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
} from "react-router-dom";
import * as Sentry from "@sentry/react";
import { ENVIRONMENT, RELEASE } from "./env";

// @TODO: opt in with env to enable this in dev

const isProduction = process.env.REACT_APP_CF_PAGES_BRANCH === "main";
const isPreview = !!process.env.REACT_APP_CF_PAGES_BRANCH;
const commitSha = process.env.REACT_APP_CF_PAGES_COMMIT_SHA;

console.log("ENVIRONMENT", ENVIRONMENT);

export const initSentry = () => {
  Sentry.init({
    dsn: "https://76e57abc1814455799982dae493d5e98@o4505163580506112.ingest.sentry.io/4505163602001920",
    release: RELEASE,
    environment: "development",
    integrations: [
      new Sentry.BrowserTracing({
        routingInstrumentation: Sentry.reactRouterV6Instrumentation(
          React.useEffect,
          useLocation,
          useNavigationType,
          createRoutesFromChildren,
          matchRoutes
        ),
      }),
      new Sentry.Replay(),
    ],
    tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
    replaysSessionSampleRate: 1.0,
    replaysOnErrorSampleRate: 1.0,
  });
};

export const sentryCreateBrowserRouter =
  Sentry.wrapCreateBrowserRouter(createBrowserRouter);
