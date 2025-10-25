import React from "react";
import BackLayButton from "./backLayButton";

// Assuming SCORE_VALUES is an array of strings or an object with string values
// Update the ScoreProps interface to restrict value to SCORE_VALUES
interface ScoreProps {
  value: string; // Correctly restricts value to strings in SCORE_VALUES
  profit: number;
  setShowBackBetComponent: () => void;
  setShowLayBetComponent: () => void;
}

const Score = ({
  value,
  profit,
  setShowBackBetComponent,
  setShowLayBetComponent,
}: ScoreProps) => {
  return (
    <div>
      <div>{value}</div>
      <div>{profit}</div>
      <BackLayButton text="Back" onClick={setShowBackBetComponent} />
      <BackLayButton text="Lay" onClick={setShowLayBetComponent} />
    </div>
  );
};

export default Score;
