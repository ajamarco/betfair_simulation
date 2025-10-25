"use client";

import { useStore } from "../store/StoreContext";

interface BetProps {
  betType: "Back" | "Lay";
}

const Bet = ({ betType }: BetProps) => {
  const store = useStore();
  return (
    <div
      className={`p-4 border rounded shadow-md m-4 ${
        betType === "Back" ? "bg-green-300" : "bg-red-300"
      }`}
    >
      <p>Placing {betType} bet</p>
      {/*TODO: add an input for all the active back / lay bets */}
      {/* <input type="number" placeholder="Stake Amount" />
       */}
      <button>Place Bet</button>
    </div>
  );
};

export default Bet;
