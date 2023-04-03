// id="clue_DJ_1_1"
// id="clue_J_1_4"
// toggle('clue_J_1_4', 'clue_J_1_4_stuck', '<em class="correct_response">the witches</em><br /><br /><table width="100%"><tr><td class="right">Ray</td></tr></table>')

const gameState = {
    round: 1,
    clue: 1,
  };
  
  const categories = ["First", "Second", "Third", "Fourth", "Fifth"];
  const categoriesDJ = [
    "DJ First",
    "DJ Second",
    "DJ Third",
    "DJ Fourth",
    "DJ Fifth",
  ];
  
  const values = [200, 400, 600, 800, 1000];
  const valuesDJ = [400, 800, 1200, 1600, 2000];
  
  type TClue = {
    text: string;
    correctResponse: string;
    category: string; // should be limited to known categories?
  };
  
  type TWagerable = {
    wager: number;
  };
  
  export type TJeopardyClue = TClue & {
    value: number;
    dd: boolean;
  };
  
  type TDailyDoubleClue = TJeopardyClue & TWagerable;
  type TFinalJeopardyClue = TClue & TWagerable;
  
  type TClueState = {
    correct: boolean;
  };
  
  export const jeopardyClues: Array<TJeopardyClue | TDailyDoubleClue> = [
    {
      value: 1000,
      dd: true,
      category: "FICTION'S FICTIONAL PLACES",
      text: "Macondo is a town that's originally isolated from the outside world in this 1967 Gabriel García Márquez classic",
      correctResponse: "One Hundred Years of Solitude",
    },
    {
        value: 600,
        dd: false,
        category: "DAILY DUBBLES",
        text: "This is a test for daily doubles",
        correctResponse: "There is no correct response",
      },
      {
        value: 200,
        dd: true,
        category: "DAILY DUBBLES",
        text: "This is a test for daily doubles",
        correctResponse: "There is no correct response",
      },
      {
        value: 800,
        dd: false,
        category: "DAILY DUBBLES",
        text: "This is a test for daily doubles",
        correctResponse: "There is no correct response",
      },
      {
        value: 400,
        dd: false,
        category: "DAILY DUBBLES",
        text: "This is a test for daily doubles",
        correctResponse: "There is no correct response",
      }
  ];
  
  const jeopardyClue: TJeopardyClue = {
    // order: 1, // of 30, per round
    value: 200,
    dd: false,
    category: "Jeopard",
    text: "A thing you try to solve for on Jeopardy!",
    correctResponse: "Clue",
  };

  const doubleJeopardyClues: Array<TJeopardyClue | TDailyDoubleClue> = [];
  
//   const finalJeopardyClue: TFinalJeopardyClue = {};
  
  export {};
  
  // type TJeopardyClue = TClue & {
  //   order: number;
  //   column: number;
  //   row: number;
  //   dd: boolean;
  // };
  