import React, { useState } from "react";
import Game from "./Game";

const Launcher: React.FC<{}> = () => {
  const [gameDate, setGameDate] = useState("today");

  return (
    <div>
      {gameDate ? (
        <Game />
      ) : (
        <div onClick={() => setGameDate("today")}>Launcher</div>
      )}
    </div>
  );
};

export default Launcher;
