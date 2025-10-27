"use client";

import PlaceBet from "./PlaceBet";

interface ActiveBet {
  id: string;
  score: string;
  odds: number;
  stake: number;
}

interface BetProps {
  betType: "Back" | "Lay";
  activeBets: ActiveBet[];
  updateBetDetails: (id: string, odds: number, stake: number) => void;
  onClear: () => void;
  onRemoveBet: (id: string) => void;
}

const Bet = ({
  betType,
  activeBets,
  updateBetDetails,
  onClear,
  onRemoveBet,
}: BetProps) => {
  return (
    <div
      className={`p-4 border rounded shadow-md m-4 ${
        betType === "Back" ? "bg-green-300" : "bg-red-300"
      }`}
    >
      <p>Placing {betType} bet</p>
      {activeBets.map((bet) => (
        <PlaceBet
          key={bet.id}
          id={bet.id}
          score={bet.score}
          betType={betType}
          updateBetDetails={updateBetDetails}
          onRemove={onRemoveBet}
        />
      ))}
      <button onClick={onClear} className="ml-2">
        Clear All
      </button>
    </div>
  );
};

export default Bet;
