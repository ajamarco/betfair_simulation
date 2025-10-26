"use client";
import { useState, useEffect } from "react";
import Score from "./(components)/score";
import { SCORE_VALUES } from "./(consts)";
import Bet from "./(components)/bet";
import PlacedBets from "./(components)/PlacedBets";
import { useStore } from "./store/StoreContext";

interface BetDetails {
  [score: string]: {
    odds: number;
    stake: number;
  };
}

export default function Home() {
  const store = useStore();
  const [showBackBetComponent, setShowBackBetComponent] = useState<string[]>(
    []
  );
  const [showLayBetComponent, setShowLayBetComponent] = useState<string[]>([]);
  const [backBetDetails, setBackBetDetails] = useState<BetDetails>({});
  const [layBetDetails, setLayBetDetails] = useState<BetDetails>({});

  const toggleBackBet = (score: string) => {
    setShowBackBetComponent((prev) => {
      if (prev.includes(score)) {
        // If removing the score, also clear its bet details
        setBackBetDetails((details) => {
          const newDetails = { ...details };
          delete newDetails[score];
          return newDetails;
        });
        return prev.filter((s) => s !== score);
      } else {
        return [...prev, score];
      }
    });
  };

  const toggleLayBet = (score: string) => {
    setShowLayBetComponent((prev) => {
      if (prev.includes(score)) {
        // If removing the score, also clear its bet details
        setLayBetDetails((details) => {
          const newDetails = { ...details };
          delete newDetails[score];
          return newDetails;
        });
        return prev.filter((s) => s !== score);
      } else {
        return [...prev, score];
      }
    });
  };

  const updateBackBetDetails = (score: string, odds: number, stake: number) => {
    setBackBetDetails((prev) => ({
      ...prev,
      [score]: { odds, stake },
    }));
  };

  const updateLayBetDetails = (score: string, odds: number, stake: number) => {
    setLayBetDetails((prev) => ({
      ...prev,
      [score]: { odds, stake },
    }));
  };

  const clearBackBets = () => {
    setShowBackBetComponent([]);
    setBackBetDetails({});
  };

  const clearLayBets = () => {
    setShowLayBetComponent([]);
    setLayBetDetails({});
  };

  const resetPlacedBets = () => {
    const [, setPlacedBack] = store.placedBackBets;
    const [, setPlacedLay] = store.placedLayBets;
    setPlacedBack([]);
    setPlacedLay([]);
    // Also clear any active bet details to reset profits
    setBackBetDetails({});
    setLayBetDetails({});
  };

  const handlePlaceBet = () => {
    const [placedBack, setPlacedBack] = store.placedBackBets;
    const [placedLay, setPlacedLay] = store.placedLayBets;

    // Store back bets
    const newBackBets = showBackBetComponent
      .map((score) => {
        const bet = backBetDetails[score];
        if (bet && bet.odds > 0 && bet.stake > 0) {
          return {
            score,
            odds: bet.odds,
            amount: bet.stake,
          };
        }
        return null;
      })
      .filter((bet) => bet !== null);

    // Store lay bets
    const newLayBets = showLayBetComponent
      .map((score) => {
        const bet = layBetDetails[score];
        if (bet && bet.odds > 0 && bet.stake > 0) {
          return {
            score,
            odds: bet.odds,
            amount: bet.stake,
          };
        }
        return null;
      })
      .filter((bet) => bet !== null);

    // Add new bets to placed bets
    setPlacedBack([...placedBack, ...newBackBets]);
    setPlacedLay([...placedLay, ...newLayBets]);

    // Clear active bets UI (but keep bet details for profit calculation)
    setShowBackBetComponent([]);
    setShowLayBetComponent([]);
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
    showBackBetComponent.forEach((activeScore) => {
      const bet = backBetDetails[activeScore];
      if (bet && bet.odds > 0 && bet.stake > 0) {
        // For the winning score: profit = (odds * stake) - stake
        const winProfit = bet.odds * bet.stake - bet.stake;

        Object.keys(newScores).forEach((scoreKey) => {
          if (scoreKey === activeScore) {
            newScores[scoreKey].profit += winProfit;
          } else {
            newScores[scoreKey].profit -= bet.stake;
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
    showLayBetComponent.forEach((activeScore) => {
      const bet = layBetDetails[activeScore];
      if (bet && bet.odds > 0 && bet.stake > 0) {
        // Liability = (odds - 1) * stake
        const liability = (bet.odds - 1) * bet.stake;

        Object.keys(newScores).forEach((scoreKey) => {
          if (scoreKey === activeScore) {
            // For the laid score: lose the liability
            newScores[scoreKey].profit -= liability;
          } else {
            // For all other scores: win the stake
            newScores[scoreKey].profit += bet.stake;
          }
        });
      }
    });

    setScores(newScores);
  }, [
    backBetDetails,
    showBackBetComponent,
    layBetDetails,
    showLayBetComponent,
    store.placedBackBets,
    store.placedLayBets,
  ]);

  return (
    <div className="flex min-h-screen items-start justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col px-16 py-8 bg-white dark:bg-black">
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
          <Bet
            betType="Back"
            activeScores={showBackBetComponent}
            updateBetDetails={updateBackBetDetails}
            onClear={clearBackBets}
            onRemoveScore={toggleBackBet}
          />
        )}
        {showLayBetComponent.length > 0 && (
          <Bet
            betType="Lay"
            activeScores={showLayBetComponent}
            updateBetDetails={updateLayBetDetails}
            onClear={clearLayBets}
            onRemoveScore={toggleLayBet}
          />
        )}
        {(showBackBetComponent.length > 0 ||
          showLayBetComponent.length > 0) && (
          <button
            onClick={handlePlaceBet}
            className="m-4 p-2 border rounded shadow-md"
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
  );
}
