import React from "react";
import Home from "./pages/home/Home";
import Launcher from "./pages/play/Launcher";
import Game from "./pages/play/Game";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
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
    loader: async ({ params }) => {
      return fetch(`http://localhost:8788/games/${params.date}`);
    },
  },
  {
    path: "/stats",
    element: <div>stats go here</div>,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
