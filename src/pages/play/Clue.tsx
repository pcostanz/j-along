import React, { useState, useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import "./Clue.css";
import { TJeopardyClue } from "./types";
import ClueDailyDoubleSplash from "./ClueDailyDoubleSplash";

const Clue: React.FC<TJeopardyClue> = ({
  dd,
  value,
  text,
  correctResponse,
  category,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [showWagerInput, setShowWagerInput] = useState(dd);
  const [wager, setWager] = useState(value);
  const [showDailyDoubleSplash, setShowDailyDoubleSplash] = useState(dd);
  const [showCorrectResponse, setShowCorrectResponse] = useState(false);

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
  }, [dd]);

  if (showDailyDoubleSplash && isInView) {
    return <ClueDailyDoubleSplash />;
  }

  const needsWager = showWagerInput && !showDailyDoubleSplash;

  return (
    <div
      ref={ref}
      className="clue"
      onDoubleClick={() => setShowCorrectResponse(!showCorrectResponse)}
    >
      <div className="clue-details">
        <div className="clue-details-category">{category}</div>
        <div className="clue-details-value">${value}</div>
      </div>

      {needsWager ? (
        <div>wager: {wager}</div>
      ) : (
        <div className="clue-details-text">
          {showCorrectResponse ? correctResponse : text}
        </div>
      )}
    </div>
  );
};

export default Clue;
