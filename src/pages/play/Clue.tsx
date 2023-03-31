import React, { useState } from "react";
import "./Clue.css";
import { TJeopardyClue } from "./types";

const Clue: React.FC<TJeopardyClue> = ({
  dd,
  value,
  text,
  correctResponse,
  category,
}) => {
  const [showCorrectResponse, setShowCorrectResponse] = useState(false);
  return (
    <div
      className="clue"
      onDoubleClick={() => setShowCorrectResponse(!showCorrectResponse)}
    >
      <div className="clue-details">
        <div className="clue-details-value">{category}</div>
        <div className="clue-details-value">${value}</div>
      </div>

      <div className="clue-details-title">
        {showCorrectResponse ? correctResponse : text}
      </div>
    </div>
  );
};

export default Clue;
