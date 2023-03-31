import React from "react";
import Clue from "./Clue";

import "./Game.css";

import { jeopardyClues } from "./types";

const Game: React.FC<{}> = () => {
  const clue = jeopardyClues[1];

  return (
    <div id="game">
      <Clue
        value={clue.value}
        text={clue.text}
        dd={clue.dd}
        correctResponse={clue.correctResponse}
        category={clue.category}
      />
      <div>Right | Wrong | Skip</div>
    </div>
  );
};

export default Game;
