import React, { useState, useEffect } from "react";
import Carousel from "nuka-carousel";
import GameControls from "./GameControls";
import Clue from "./Clue";

import "./Game.css";

import { jeopardyClues } from "./types";

const gameStateInitial = jeopardyClues.reduce((prev, next, index) => {
  return {
    ...prev,
    [index]: undefined,
  };
}, {});

const Game: React.FC<{}> = () => {
  const [gameState, setGameState] = useState(gameStateInitial);
  const [lockGameControls, setLockGameControls] = useState(false);
  const [currentClue, setCurrentClue] = useState(0);
  const clue = jeopardyClues[currentClue];
  // const [clueValue, setClueValue] = useState(clue.value);

  const onAnswer = (value: boolean | undefined) => {
    const newGameState = { ...gameState };
    // @ts-ignore
    newGameState[currentClue] = value;
    setGameState(newGameState);
  };

  console.log(gameState);

  // useEffect(() => {
  //   setClueValue(clue.value);
  // }, [currentClue]);

  const score = jeopardyClues.reduce((prev, next, index) => {
    // @ts-ignore
    if (gameState[index] === true) return prev + next.value;
    // @ts-ignore
    if (gameState[index] === false) return prev - next.value;
    return prev;
  }, 0);

  // https://github.com/FormidableLabs/nuka-carousel
  // can manually set index with slideIndex for resume?
  return (
    <div id="game">
      <Carousel
        withoutControls
        dragThreshold={0.05}
        onUserNavigation={() => setLockGameControls(true)}
        afterSlide={(index) => {
          setCurrentClue(index);
          setLockGameControls(false);
        }}
      >
        {jeopardyClues.map((clue) => (
          <Clue
            key={clue.text}
            value={clue.value}
            text={clue.text}
            dd={clue.dd}
            correctResponse={clue.correctResponse}
            category={clue.category}
          />
        ))}
      </Carousel>

      <GameControls
        // @ts-ignore
        isCorrect={gameState[currentClue]}
        locked={lockGameControls}
        score={score}
        onAnswer={onAnswer}
      />
    </div>
  );
};

export default Game;
