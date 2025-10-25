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
    <div>
      <span className="m-2">{score}</span>
      <input
        type="number"
        placeholder="Odds"
        step="0.01"
        value={odds || ""}
        onChange={handleOddsChange}
      />
      <input
        type="number"
        placeholder="Stake Amount"
        step="0.1"
        value={stake || ""}
        onChange={handleStakeChange}
      />
    </div>
  );
};

export default PlaceBet;
