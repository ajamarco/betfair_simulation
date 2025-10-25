import React, { useState } from "react";

const PlaceBet = ({
  score,
  betType,
  updateBetDetails,
}: {
  score: string;
  betType: "Back" | "Lay";
  updateBetDetails: (score: string, odds: number, stake: number) => void;
}) => {
  const [odds, setOdds] = useState<number>(0);
  const [stake, setStake] = useState<number>(0);

  const handleOddsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setOdds(value);
    updateBetDetails(score, value, stake);
  };

  const handleStakeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setStake(value);
    updateBetDetails(score, odds, value);
  };

  return (
    <div className="flex items-center gap-3 p-3 mb-2 border border-gray-300 rounded-lg bg-white">
      <span className="font-semibold w-32">{score}</span>
      <input
        type="number"
        placeholder="Odds"
        step="0.01"
        value={odds || ""}
        onChange={handleOddsChange}
        className="w-24 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      />
      <input
        type="number"
        placeholder="Stake"
        step="0.1"
        value={stake || ""}
        onChange={handleStakeChange}
        className="w-24 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      />
    </div>
  );
};

export default PlaceBet;
