export type TJeopardyClue = {
  order: number;
  right?: string;
  wrong: string[];
  category: string;
  value: number;
  dailyDoubleWager?: number;
  text?: string;
  tripleStumper?: boolean;
  correctResponse?: string;
};
