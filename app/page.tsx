"use client";
import { useState, useEffect } from "react";
import Score from "./(components)/score";
import { SCORE_VALUES, ActiveBet } from "./(consts)";
import Bet from "./(components)/bet";
import PlacedBets from "./(components)/PlacedBets";
import { useStore } from "./store/StoreContext";

export default function Home() {
  const store = useStore();
  const [activeBackBets, setActiveBackBets] = useState<ActiveBet[]>([]);
  const [activeLayBets, setActiveLayBets] = useState<ActiveBet[]>([]);

  const addBackBet = (score: string) => {
    const newBet: ActiveBet = {
      id: `back-${Date.now()}-${Math.random()}`,
      score,
      odds: 0,
      stake: 0,
    };
    setActiveBackBets((prev) => [...prev, newBet]);
  };

  const addLayBet = (score: string) => {
    const newBet: ActiveBet = {
      id: `lay-${Date.now()}-${Math.random()}`,
      score,
      odds: 0,
      stake: 0,
    };
    setActiveLayBets((prev) => [...prev, newBet]);
  };

  const removeBackBet = (id: string) => {
    setActiveBackBets((prev) => prev.filter((bet) => bet.id !== id));
  };

  const removeLayBet = (id: string) => {
    setActiveLayBets((prev) => prev.filter((bet) => bet.id !== id));
  };

  const updateBackBetDetails = (id: string, odds: number, stake: number) => {
    setActiveBackBets((prev) =>
      prev.map((bet) => (bet.id === id ? { ...bet, odds, stake } : bet))
    );
  };

  const updateLayBetDetails = (id: string, odds: number, stake: number) => {
    setActiveLayBets((prev) =>
      prev.map((bet) => (bet.id === id ? { ...bet, odds, stake } : bet))
    );
  };

  const clearBackBets = () => {
    setActiveBackBets([]);
  };

  const clearLayBets = () => {
    setActiveLayBets([]);
  };

  const resetPlacedBets = () => {
    const [, setPlacedBack] = store.placedBackBets;
    const [, setPlacedLay] = store.placedLayBets;
    setPlacedBack([]);
    setPlacedLay([]);
  };

  const handlePlaceBet = () => {
    const [placedBack, setPlacedBack] = store.placedBackBets;
    const [placedLay, setPlacedLay] = store.placedLayBets;

    // Store back bets
    const newBackBets = activeBackBets
      .filter((bet) => bet.odds > 0 && bet.stake > 0)
      .map((bet) => ({
        score: bet.score,
        odds: bet.odds,
        amount: bet.stake,
      }));

    // Store lay bets
    const newLayBets = activeLayBets
      .filter((bet) => bet.odds > 0 && bet.stake > 0)
      .map((bet) => ({
        score: bet.score,
        odds: bet.odds,
        amount: bet.stake,
      }));

    // Add new bets to placed bets
    setPlacedBack([...placedBack, ...newBackBets]);
    setPlacedLay([...placedLay, ...newLayBets]);

    // Clear active bets UI
    setActiveBackBets([]);
    setActiveLayBets([]);
  };

  // Calculate profits for back and lay bets
  useEffect(() => {
    const [scores, setScores] = store.score;
    const [placedBack] = store.placedBackBets;
    const [placedLay] = store.placedLayBets;
    const newScores = { ...scores };

    // Reset all profits to 0
    Object.keys(newScores).forEach((key) => {
      newScores[key] = { ...newScores[key], profit: 0 };
    });

    // Calculate profits from placed back bets
    placedBack.forEach((placedBet) => {
      const winProfit = placedBet.odds * placedBet.amount - placedBet.amount;

      Object.keys(newScores).forEach((scoreKey) => {
        if (scoreKey === placedBet.score) {
          newScores[scoreKey].profit += winProfit;
        } else {
          newScores[scoreKey].profit -= placedBet.amount;
        }
      });
    });

    // Calculate profits from active back bets (not yet placed)
    activeBackBets.forEach((activeBet) => {
      if (activeBet.odds > 0 && activeBet.stake > 0) {
        const winProfit = activeBet.odds * activeBet.stake - activeBet.stake;

        Object.keys(newScores).forEach((scoreKey) => {
          if (scoreKey === activeBet.score) {
            newScores[scoreKey].profit += winProfit;
          } else {
            newScores[scoreKey].profit -= activeBet.stake;
          }
        });
      }
    });

    // Calculate profits from placed lay bets
    placedLay.forEach((placedBet) => {
      const liability = (placedBet.odds - 1) * placedBet.amount;

      Object.keys(newScores).forEach((scoreKey) => {
        if (scoreKey === placedBet.score) {
          newScores[scoreKey].profit -= liability;
        } else {
          newScores[scoreKey].profit += placedBet.amount;
        }
      });
    });

    // Calculate profits from active lay bets (not yet placed)
    activeLayBets.forEach((activeBet) => {
      if (activeBet.odds > 0 && activeBet.stake > 0) {
        const liability = (activeBet.odds - 1) * activeBet.stake;

        Object.keys(newScores).forEach((scoreKey) => {
          if (scoreKey === activeBet.score) {
            newScores[scoreKey].profit -= liability;
          } else {
            newScores[scoreKey].profit += activeBet.stake;
          }
        });
      }
    });

    setScores(newScores);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    activeBackBets,
    activeLayBets,
    store.placedBackBets[0],
    store.placedLayBets[0],
  ]);

  return (
    <div className="flex h-screen bg-zinc-50 font-sans dark:bg-black p-4">
      <div className="flex w-full max-w-7xl mx-auto gap-4 h-full">
        {/* Left Column - Scores */}
        <div className="w-2/3 flex flex-col bg-white dark:bg-black p-4 overflow-y-auto h-full">
          {Object.entries(store.score[0]).map(([scoreKey, scoreData]) => (
            <Score
              key={scoreKey}
              value={scoreKey}
              profit={scoreData.profit}
              setShowBackBetComponent={() => addBackBet(scoreKey)}
              setShowLayBetComponent={() => addLayBet(scoreKey)}
            />
          ))}
        </div>

        {/* Right Column - Betting Components */}
        <div className="w-1/3 flex flex-col h-full overflow-y-auto">
          {activeBackBets.length > 0 && (
            <Bet
              betType="Back"
              activeBets={activeBackBets}
              updateBetDetails={updateBackBetDetails}
              onClear={clearBackBets}
              onRemoveBet={removeBackBet}
            />
          )}
          {activeLayBets.length > 0 && (
            <Bet
              betType="Lay"
              activeBets={activeLayBets}
              updateBetDetails={updateLayBetDetails}
              onClear={clearLayBets}
              onRemoveBet={removeLayBet}
            />
          )}
          {(activeBackBets.length > 0 || activeLayBets.length > 0) && (
            <button
              onClick={handlePlaceBet}
              className="mx-4 my-2 p-2 border rounded shadow-md"
            >
              Place Bets
            </button>
          )}
          {(store.placedBackBets[0].length > 0 ||
            store.placedLayBets[0].length > 0) && (
            <PlacedBets
              placedBackBets={store.placedBackBets[0]}
              placedLayBets={store.placedLayBets[0]}
              onReset={resetPlacedBets}
            />
          )}
        </div>
      </div>
    </div>
  );
}
