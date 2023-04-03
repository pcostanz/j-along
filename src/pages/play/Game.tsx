import React, { useState, useEffect } from "react";
import Carousel from "nuka-carousel";
import GameControls from "./GameControls";
import Clue from "./Clue";

import "./Game.css";

import { jeopardyClues } from "./types";

const gameStateInitial = jeopardyClues.reduce((prev, next, index) => {
  return {
    ...prev,
    [index]: {
      correct: undefined,
      value: next.value,
    },
  };
}, {});

const Game: React.FC<{}> = () => {
  const [wageredClues, setWageredClues] = useState<number[]>([]);
  const [gameState, setGameState] = useState(gameStateInitial);
  const [lockGameControls, setLockGameControls] = useState(false);
  const [currentClue, setCurrentClue] = useState(0);
  const clue = jeopardyClues[currentClue];

  const onWagerComplete = () => {
    setWageredClues([...wageredClues, currentClue]);
  };

  const clueNeedsWager = clue.dd && !wageredClues.includes(currentClue);

  const onAnswer = (value: boolean | undefined) => {
    const newGameState = { ...gameState };
    // @ts-ignore
    newGameState[currentClue].correct = value;
    setGameState(newGameState);
  };

  const setClueWager = (value: number) => {
    const newGameState = { ...gameState };
    // @ts-ignore
    newGameState[currentClue].value = value;
    setGameState(newGameState);
  };

  const score = Object.keys(gameState).reduce((prev, next, index) => {
    // @ts-ignore
    if (gameState[index].correct === true) return prev + gameState[index].value;
    // @ts-ignore
    if (gameState[index].correct === false)
      // @ts-ignore
      return prev - gameState[index].value;
    return prev;
  }, 12500);

  // https://github.com/FormidableLabs/nuka-carousel
  // can manually set index with slideIndex for resume?
  return (
    <div id="game">
      <Carousel
        dragging={!clueNeedsWager}
        swiping={!clueNeedsWager}
        withoutControls
        dragThreshold={0.05}
        onUserNavigation={() => setLockGameControls(true)}
        afterSlide={(index) => {
          setCurrentClue(index);
          setLockGameControls(false);
        }}
      >
        {jeopardyClues.map((clue, index) => (
          // holy shit this component is prop city
          // clue can be sent as an object
          <Clue
            // @ts-ignore
            correct={gameState[index].correct}
            needsWager={clueNeedsWager}
            onWagerComplete={onWagerComplete}
            score={score}
            index={index}
            setWager={setClueWager}
            key={clue.text}
            // @ts-ignore
            wager={gameState[index].value}
            value={clue.value}
            text={clue.text}
            dd={clue.dd}
            correctResponse={clue.correctResponse}
            category={clue.category}
          />
        ))}
      </Carousel>

      {/* instead of conditional rendering, maybe slide this out of the frame with framer motion? it's causing re-renders and the Counter to reset when the wager screen leaves */}
      {!clueNeedsWager && (
        <GameControls
          // @ts-ignore
          isCorrect={gameState[currentClue].correct}
          locked={false}
          score={score}
          onAnswer={onAnswer}
        />
      )}
    </div>
  );
};

export default Game;
