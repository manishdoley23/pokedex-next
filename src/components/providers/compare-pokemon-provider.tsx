"use client";

import { PokemonApiResponse } from "@/lib/types/pokemon";
import { createContext, useState } from "react";

type CompareContextType = {
  compareList: PokemonApiResponse[];
  addToCompare: (pokemon: PokemonApiResponse) => void;
  removeFromCompare: (id: number) => void;
  maxSelection: number;
};

export const CompareContext = createContext<CompareContextType | null>(null);

export function CompareProvider({
  children,
  max = 6,
}: {
  children: React.ReactNode;
  max?: number;
}) {
  const [compareList, setCompareList] = useState<PokemonApiResponse[]>([]);

  const addToCompare = (pokemon: PokemonApiResponse) => {
    setCompareList((prev) => {
      if (prev.length >= max || prev.some((p) => p.id === pokemon.id)) {
        return prev;
      }
      return [...prev, pokemon];
    });
  };

  const removeFromCompare = (id: number) => {
    setCompareList((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <CompareContext.Provider
      value={{
        compareList,
        addToCompare,
        removeFromCompare,
        maxSelection: max,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}
