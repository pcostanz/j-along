import React, { useState, useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import "./Clue.css";
import { TJeopardyClue } from "./types";

import ClueDailyDoubleSplash from "./ClueDailyDoubleSplash";
import ClueWager from "./ClueWager";

type TClueProps = TJeopardyClue & {
  setWager: (value: number) => void;
  wager: number;
  index: number;
  score: number;
  onWagerComplete: () => void;
  needsWager: boolean;
  correct: boolean;
};

const Clue: React.FC<TClueProps> = ({
  dd,
  value,
  text,
  correctResponse,
  category,
  setWager,
  wager,
  index,
  score,
  onWagerComplete,
  needsWager,
  correct,
}) => {
  const ref = useRef(null);
  //https://codesandbox.io/s/framer-motion-useinview-cgt5kc?from-embed
  const isInView = useInView(ref, { once: true });
  const [showWagerInput, setShowWagerInput] = useState(dd);
  const [showDailyDoubleSplash, setShowDailyDoubleSplash] = useState(dd);
  const [showCorrectResponse, setShowCorrectResponse] = useState(false);

  const minimumMaxWager = index <= 29 ? 1000 : 2000;
  const maxWager = score > minimumMaxWager ? score : minimumMaxWager;

  useEffect(() => {
    if (showDailyDoubleSplash && isInView) {
      const timeout = setTimeout(() => setShowDailyDoubleSplash(false), 2500);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [showDailyDoubleSplash, isInView]);

  useEffect(() => {
    if (dd) {
      setShowDailyDoubleSplash(true);
    }
  }, []);

  // in some cases there is a bug where you see a flash of the question
  // before the splash screen takes over
  // we can't show the splash until the card is in view due to the
  // way the carousel works - I don't feel like swapping out the carousel
  // so i should look into the isInView threshold (maybe lower it?)
  if (showDailyDoubleSplash && isInView) {
    return <ClueDailyDoubleSplash />;
  }

  const showClueWager = needsWager && !showDailyDoubleSplash;
  const showWagered = !showClueWager && dd;
  const isTrueDailyDouble = wager === maxWager;

  const unanswered = correct === undefined;

  return (
    <div
      ref={ref}
      className="clue"
      onDoubleClick={() => setShowCorrectResponse(!showCorrectResponse)}
    >
      <div className="clue-details">
        {dd && (
          <div className="font-effect-anaglyph lightyellow">DAILY DOUBLE</div>
        )}
        <div className="clue-details-category">{category}</div>
        <div
          className={`clue-details-value ${
            unanswered ? "" : correct ? "green" : "red"
          }`}
        >
          ${showWagered ? wager : value}
        </div>
      </div>

      {showClueWager ? (
        <ClueWager
          trueDailyDouble={isTrueDailyDouble}
          maxValue={maxWager}
          value={wager}
          onChange={(value) => setWager(value)}
          onConfirm={onWagerComplete}
        />
      ) : (
        <div className="clue-details-text">
          {showCorrectResponse ? (
            <span className="green">{correctResponse}</span>
          ) : (
            text
          )}
        </div>
      )}
    </div>
  );
};

export default Clue;
