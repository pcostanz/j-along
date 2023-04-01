import React, { useState, useEffect } from "react";
import Carousel from "nuka-carousel";
import GameControls from "./GameControls";
import Clue from "./Clue";

import "./Game.css";

import { jeopardyClues } from "./types";

//https://codesandbox.io/s/framer-motion-useinview-cgt5kc?from-embed

const Game: React.FC<{}> = () => {
  const clue = jeopardyClues[0];

  return (
    <div id="game">
      <Carousel withoutControls dragThreshold={0.2}>
        <Clue
          value={clue.value}
          text={clue.text}
          dd={clue.dd}
          correctResponse={clue.correctResponse}
          category={clue.category}
        />
        <Clue
          value={clue.value}
          text={clue.text}
          dd={true}
          correctResponse={clue.correctResponse}
          category={clue.category}
        />
        <Clue
          value={clue.value}
          text={clue.text}
          dd={clue.dd}
          correctResponse={clue.correctResponse}
          category={clue.category}
        />
      </Carousel>

      <GameControls score={0} wagerable={false} />
    </div>
  );
};

export default Game;
