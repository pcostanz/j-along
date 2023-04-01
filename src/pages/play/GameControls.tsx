import React, { useState, useEffect, useRef } from "react";
import CountUp from "react-countup";

import "./GameControls.css";

// https://www.npmjs.com/package/react-signature-canvas
const GameControls: React.FC<{
  score: number;
  locked: boolean;
  onCorrect: () => void;
}> = ({ score, locked, onCorrect }) => {
  const [isCorrect, setIsCorrect] = React.useState(false);
  const scoreRef = useRef(0);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  useEffect(() => {
    if (isCorrect) {
      const timeout = setTimeout(() => setIsCorrect(false), 3000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isCorrect]);

  return (
    <div id="game-controls">
      <div
        id="game-controls-score"
        className={`${isCorrect ? "correct" : ""}`}
        onDoubleClick={
          locked
            ? () => {}
            : () => {
                onCorrect();
                setIsCorrect(true);
              }
        }
      >
        <CountUp prefix="$" duration={2} start={scoreRef.current} end={score} />
      </div>
    </div>
  );
};

export default GameControls;
