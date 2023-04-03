import React, { useState, useRef, useEffect } from "react";
import { Range } from "react-range";

import "./ClueWager.css";

type TClueWagerProps = {
  value: number;
  onChange: (value: number) => void;
  maxValue: number;
  onConfirm: () => void;
  trueDailyDouble: boolean;
};

const ClueWager: React.FC<TClueWagerProps> = ({
  value,
  onChange,
  maxValue,
  onConfirm,
  trueDailyDouble,
}) => {
  return (
    <div id="wager-container">
      <div>WAGER</div>
      <input
        onKeyUp={(event) => {
          // @ts-ignore
          if (Number(event.target.value) > maxValue) {
            onChange(maxValue);
          }
          if (event.key === "Enter") {
            // @ts-ignore
            event.target.blur();
          }
        }}
        onFocus={(e) => e.target.select()}
        id="wager-input"
        value={String(value)}
        onChange={(event) => onChange(Number(event.target.value))}
        type="number"
      />
      <div id="wager-range-container">
        <Range
          step={10}
          min={0}
          max={maxValue}
          values={[value]}
          onChange={(values) => onChange(values[0])}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "6px",
                width: "100%",
                backgroundColor: "white",
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "25px",
                width: "25px",
                borderRadius: "50%",
                backgroundColor: "blue",
                border: "2px solid white",
              }}
            />
          )}
        />
      </div>
      <div>
        {trueDailyDouble ? "Let's make it a true Daily Double!" : "  d"}
      </div>
      <button onClick={onConfirm}>Confirm!</button>
    </div>
  );
};

export default ClueWager;
