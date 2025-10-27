export interface ActiveBet {
  id: string;
  score: string;
  odds: number;
  stake: number;
}

export const SCORE_VALUES = [
  "0-0",
  "0-1",
  "0-2",
  "0-3",
  "1-0",
  "1-1",
  "1-2",
  "1-3",
  "2-0",
  "2-1",
  "2-2",
  "2-3",
  "3-0",
  "3-1",
  "3-2",
  "3-3",
  "Any Other Home Win",
  "Any Other Away Win",
  "Any Other Draw",
];
