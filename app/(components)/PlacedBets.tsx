import React from "react";

interface PlacedBet {
  score: string;
  odds: number;
  amount: number;
}

interface PlacedBetsProps {
  placedBackBets: PlacedBet[];
  placedLayBets: PlacedBet[];
  onReset: () => void;
}

const PlacedBets = ({
  placedBackBets,
  placedLayBets,
  onReset,
}: PlacedBetsProps) => {
  return (
    <div className="m-4 p-4 border rounded shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Placed Bets</h2>
        {(placedBackBets.length > 0 || placedLayBets.length > 0) && (
          <button
            onClick={onReset}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Reset All
          </button>
        )}
      </div>

      {placedBackBets.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">Back Bets</h3>
          <div className="space-y-2">
            {placedBackBets.map((bet, index) => (
              <div
                key={`back-${index}`}
                className="flex gap-4 p-2 bg-green-100 rounded"
              >
                <span className="font-semibold">{bet.score}</span>
                <span>Odds: {bet.odds}</span>
                <span>Amount: {bet.amount}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {placedLayBets.length > 0 && (
        <div>
          <h3 className="text-lg font-bold mb-2">Lay Bets</h3>
          <div className="space-y-2">
            {placedLayBets.map((bet, index) => (
              <div
                key={`lay-${index}`}
                className="flex gap-4 p-2 bg-red-100 rounded"
              >
                <span className="font-semibold">{bet.score}</span>
                <span>Odds: {bet.odds}</span>
                <span>Amount: {bet.amount}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {placedBackBets.length === 0 && placedLayBets.length === 0 && (
        <p className="text-gray-500">No bets placed yet</p>
      )}
    </div>
  );
};

export default PlacedBets;
