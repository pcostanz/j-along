import React from "react";
import "./Clue.css";

const clue = {
  title: "between your cheecks, and round",
  answer: "butthole",
  value: 1000,
  category: "butt stuff",
  categoryIndex: 4,
};

const Clue: React.FC<{}> = () => {
  return (
    <div className="clue">
      <div className="clue-details">
        <div className="clue-details-value">${clue.value}</div>
        <div className="clue-details-value">{clue.category}</div>
      </div>

      <div className="clue-details-title">{clue.title}</div>
    </div>
  );
};

export default Clue;
