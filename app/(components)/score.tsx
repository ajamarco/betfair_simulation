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
  const profitColor = profit >= 0 ? "text-green-600" : "text-red-600";

  return (
    <div className="flex items-center justify-between w-full gap-4 p-2 border-b">
      <div className="font-semibold w-32">{value}</div>
      <div className={`flex-1 ${profitColor}`}>
        &gt;&gt; ${profit.toFixed(2)}
      </div>
      <div className="flex gap-2">
        <button
          onClick={setShowBackBetComponent}
          className="px-3 py-1 border border-gray-400 rounded"
          style={{ backgroundColor: "#A6D8FF" }}
        >
          Back
        </button>
        <button
          onClick={setShowLayBetComponent}
          className="px-3 py-1 border border-gray-400 rounded"
          style={{ backgroundColor: "#FAC9D4" }}
        >
          Lay
        </button>
      </div>
    </div>
  );
};

export default Score;
