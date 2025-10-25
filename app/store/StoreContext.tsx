// store/StoreContext.tsx
"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// 2️⃣ Define what actions your store exposes
// Updated to expose individual states as tuples
interface AppContextType {
  user: [string | null, React.Dispatch<React.SetStateAction<string | null>>];
  theme: [
    "light" | "dark",
    React.Dispatch<React.SetStateAction<"light" | "dark">>
  ];
  activeBetButton: [
    string | undefined,
    React.Dispatch<React.SetStateAction<string | undefined>>
  ];
  score: [
    Record<
      string,
      {
        profit: number;
        backBetActive: boolean;
        layBetActive: boolean;
      }
    >,
    React.Dispatch<
      React.SetStateAction<
        Record<
          string,
          {
            profit: number;
            backBetActive: boolean;
            layBetActive: boolean;
          }
        >
      >
    >
  ];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// 3️⃣ Create a provider component
export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const user = useState<string | null>("Alex");
  const theme = useState<"light" | "dark">("light");
  const activeBetButton = useState<string | undefined>(undefined);
  const score = useState<
    Record<
      string,
      {
        profit: number;
        backBetActive: boolean;
        layBetActive: boolean;
      }
    >
  >({
    "0-0": { profit: 0, backBetActive: false, layBetActive: false },
    "0-1": { profit: 0, backBetActive: false, layBetActive: false },
    "1-0": { profit: 0, backBetActive: false, layBetActive: false },
  });

  return (
    <AppContext.Provider value={{ user, theme, activeBetButton, score }}>
      {children}
    </AppContext.Provider>
  );
};

// 4️⃣ Create a custom hook to use the store
export const useStore = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
