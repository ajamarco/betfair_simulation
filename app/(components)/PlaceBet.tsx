import React from "react";

const PlaceBet = ({
  score,
  betType,
}: {
  score: string;
  betType: "Back" | "Lay";
}) => {
  return (
    <div>
      {score}
      <input type="number" placeholder="Stake Amount" />
    </div>
  );
};

export default PlaceBet;
