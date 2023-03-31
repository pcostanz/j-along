import React from "react";
import Home from "./pages/home/Home";
import Launcher from "./pages/play/Launcher";
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
