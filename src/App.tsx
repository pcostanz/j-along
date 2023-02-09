import React, { useState } from "react";
import Home from "./home/Home";
import Launcher from "./play/Launcher";
import "./App.css";

//https://www.section.io/engineering-education/page-transition-in-react-using-framer-motion/

function App() {
  const [mode, setMode] = useState<"home" | "play" | "stats">("home");

  return (
    <div className="App">
      {mode === "home" && <Home setMode={setMode} />}
      {mode === "play" && <Launcher />}
    </div>
  );
}

export default App;
