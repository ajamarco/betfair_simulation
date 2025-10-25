"use client";
import { useState } from "react";
import Score from "./(components)/score";
import { SCORE_VALUES } from "./(consts)";
import Bet from "./(components)/bet";
import { useStore } from "./store/StoreContext";

export default function Home() {
  const store = useStore();
  const [showBackBetComponent, setShowBackBetComponent] = useState<string[]>(
    []
  );
  const [showLayBetComponent, setShowLayBetComponent] = useState<string[]>([]);

  const toggleBackBet = (score: string) => {
    setShowBackBetComponent((prev) =>
      prev.includes(score) ? prev.filter((s) => s !== score) : [...prev, score]
    );
  };

  const toggleLayBet = (score: string) => {
    setShowLayBetComponent((prev) =>
      prev.includes(score) ? prev.filter((s) => s !== score) : [...prev, score]
    );
  };

  return (
    <div className="flex min-h-screen items-start justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        {Object.entries(store.score[0]).map(([scoreKey, scoreData]) => (
          <Score
            key={scoreKey}
            value={scoreKey}
            profit={scoreData.profit}
            setShowBackBetComponent={() => toggleBackBet(scoreKey)}
            setShowLayBetComponent={() => toggleLayBet(scoreKey)}
          />
        ))}
      </main>
      <div className="flex min-h-screen flex-col">
        {showBackBetComponent.length > 0 && (
          <Bet betType="Back" activeScores={showBackBetComponent} />
        )}
        {showLayBetComponent.length > 0 && (
          <Bet betType="Lay" activeScores={showLayBetComponent} />
        )}
      </div>
    </div>
  );
}
