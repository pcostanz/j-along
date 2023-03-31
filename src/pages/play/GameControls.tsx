import React, { useState, useEffect } from "react";

import "./GameControls.css";

const GameControls: React.FC<{
  onNext: () => void;
  onPrevious: () => void;
  wagerable: boolean;
  score: number;
}> = ({ onPrevious, onNext, wagerable, score }) => {
  return (
    <div>
      {wagerable && <div>wagerable</div>}
      <button onClick={onPrevious}>Previous</button>
      <button onClick={onNext}>Next</button>
      <div>Score: {score}</div>
    </div>
  );
};

export default GameControls;
