import React, { useState, useEffect } from "react";
import GameControls from "./GameControls";
import Clue from "./Clue";
import ClueDailyDoubleSplash from "./ClueDailyDoubleSplash";

import "./Game.css";

import { jeopardyClues } from "./types";

const Game: React.FC<{}> = () => {
  const [currentClueIndex, setCurrentClueIndex] = useState(0);
  const clue = jeopardyClues[currentClueIndex];
  const [showDailyDoubleSplash, setShowDailyDoubleSplash] = useState(clue.dd);

  useEffect(() => {
    if (showDailyDoubleSplash) {
      const timeout = setTimeout(() => setShowDailyDoubleSplash(false), 2500);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [showDailyDoubleSplash]);

  if (showDailyDoubleSplash) {
    return <ClueDailyDoubleSplash />;
  }

  return (
    <div id="game">
      <Clue
        value={clue.value}
        text={clue.text}
        dd={clue.dd}
        correctResponse={clue.correctResponse}
        category={clue.category}
      />
      <GameControls
        score={0}
        wagerable={false}
        onPrevious={() => setCurrentClueIndex(currentClueIndex - 1)}
        onNext={() => setCurrentClueIndex(currentClueIndex + 1)}
      />
    </div>
  );
};

export default Game;
