import React, { useState, useEffect, useRef } from "react";
import CountUp from "react-countup";
import { useLongPress } from "use-long-press";

import "./GameControls.css";

// I don't like how this component is shaping up
// I think it should be renamed to Scoreboard and
// all this fancy click bullshit should go away.
// maybe clicking the Scoreboard can pull up game information
// and stats and stuff

// https://spacejelly.dev/posts/how-to-detect-long-press-gestures-in-javascript-events-in-react/
// @ts-ignore
function useAdvancedClick(
  // @ts-ignore
  action,
  delay = 250
) {
  const [click, setClick] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      // simple click
      if (click === 1) action(true);
      setClick(0);
    }, delay);

    // the duration between this click and the previous one
    // is less than the value of delay = double-click
    if (click === 2) action(false);

    return () => clearTimeout(timer);
  }, [click]);

  return () => {
    setClick((prev) => prev + 1);
  };
}

// https://www.npmjs.com/package/react-signature-canvas
const GameControls: React.FC<{
  score: number;
  locked: boolean;
  onAnswer: (value: boolean | undefined) => void;
  isCorrect: boolean;
}> = ({ score, locked, onAnswer, isCorrect }) => {
  const scoreRef = useRef(0);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  const handleClick = useAdvancedClick(onAnswer);
  const bind = useLongPress(
    () => {
      onAnswer(undefined);
    },
    { threshold: 600 }
  );

  const isNegative = Math.sign(score) === -1;

  return (
    <div id="game-controls">
      <div
        id="game-controls-score"
        className={`${isNegative ? "negative" : ""}`}
        onClick={handleClick}
        {...bind()}
      >
        <CountUp prefix="$" duration={2} start={scoreRef.current} end={score} />
      </div>
    </div>
  );
};

export default GameControls;
