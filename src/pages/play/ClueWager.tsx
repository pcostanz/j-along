import React, { useState, useRef, useEffect } from "react";
import { Range, getTrackBackground } from "react-range";

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
      <div id="wager-label">WAGER</div>
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
          step={100}
          min={0}
          max={maxValue}
          values={[value]}
          onChange={(values) => onChange(values[0])}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: "50px",
                display: "flex",
                width: "100%",
              }}
            >
              <div
                ref={props.ref}
                style={{
                  ...props.style,
                  alignSelf: "center",
                  height: "4px",
                  width: "100%",
                  borderRadius: "5px",
                  background: getTrackBackground({
                    values: [value],
                    colors: ["yellow", "#ccc"],
                    min: 0,
                    max: maxValue,
                  }),
                }}
              >
                {children}
              </div>
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
                backgroundColor: "white",
                border: "3px solid white",
              }}
            />
          )}
        />
      </div>
      <span id="true-daily-double">
        {trueDailyDouble ? "Let's make it a true Daily Double!" : ""}
      </span>
      <button id="wager-confirm" onClick={onConfirm}>
        Confirm
      </button>
    </div>
  );
};

export default ClueWager;
