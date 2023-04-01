import React, { useState, useEffect } from "react";

import "./GameControls.css";

const GameControls: React.FC<{
  wagerable: boolean;
  score: number;
}> = ({ wagerable, score }) => {
  return (
    <div>
      {wagerable && <div>wagerable</div>}
      <div>Score: {score}</div>
    </div>
  );
};

export default GameControls;
