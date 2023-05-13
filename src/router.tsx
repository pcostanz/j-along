import React from "react";
import Home from "./pages/home/Home";
import Launcher from "./pages/play/Launcher";
import Game from "./pages/play/Game";
import "./App.css";
import { sentryCreateBrowserRouter } from "./sentry";

export const router = sentryCreateBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/play",
    element: <Launcher />,
  },
  {
    path: "/play/:date",
    element: <Game />,
    loader: async ({ params }: any) => {
      return fetch(`http://localhost:8788/games/${params.date}`);
    },
  },
  {
    path: "/stats",
    element: <div>stats go here</div>,
  },
]);
