import React from "react";
import "./Clue.css";
import { TJeopardyClue } from './types';

const Clue: React.FC<TJeopardyClue> = ({
  dd,
  value,
  text,
  correctResponse,
  category
}) => {
  return (
    <div className="clue">
      <div className="clue-details">
        <div className="clue-details-value">${value}</div>
        <div className="clue-details-value">{category}</div>
      </div>

      <div className="clue-details-title">{text}</div>
    </div>
  );
};

export default Clue;
