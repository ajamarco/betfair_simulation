"use client";

import { useStore } from "../store/StoreContext";
import PlaceBet from "./PlaceBet";

interface BetProps {
  betType: "Back" | "Lay";
  activeScores: string[];
}

const Bet = ({ betType, activeScores }: BetProps) => {
  const store = useStore();
  return (
    <div
      className={`p-4 border rounded shadow-md m-4 ${
        betType === "Back" ? "bg-green-300" : "bg-red-300"
      }`}
    >
      <p>Placing {betType} bet</p>
      {activeScores.map((score) => (
        <PlaceBet key={score} score={score} betType={betType} />
      ))}
      <button>Place Bet</button>
    </div>
  );
};

export default Bet;
