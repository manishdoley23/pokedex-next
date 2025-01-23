// components/pokemon-grid.tsx
"use client";

import { useEffect, useRef, useCallback, useMemo } from "react";
import { debounce } from "lodash";
import PokemonItem from "./pokemon-item";
import { usePokemonInfiniteQuery } from "@/lib/hooks/use-query";

const LIMIT = 30;
const DEBOUNCE_DELAY = 300;

interface PokemonGridProps {
  searchTerm: string;
  selectedTypes: string[];
  setIsSearching: (value: boolean) => void;
}

export default function PokemonGrid({
  searchTerm,
  selectedTypes,
  setIsSearching,
}: PokemonGridProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    refetch,
  } = usePokemonInfiniteQuery(LIMIT, searchTerm, selectedTypes);

  const lastPokemonRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  const filteredPokemon = useMemo(() => {
    const allPokemon =
      data?.pages.flatMap((page) =>
        page.pokemons.filter((pokemon) => {
          const matchesSearch =
            searchTerm === "" ||
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());

          const matchesType =
            selectedTypes.length === 0 ||
            pokemon.types.some((type) =>
              selectedTypes.includes(type.type.name)
            );

          return matchesSearch && matchesType;
        })
      ) ?? [];

    console.log("allPokemon", allPokemon);
    console.log("selectedTypes", selectedTypes);

    return allPokemon;
  }, [data?.pages, searchTerm, selectedTypes]);

  // Update search status when data is loaded
  useEffect(() => {
    if (status !== "pending") {
      setIsSearching(false);
    }
  }, [status, setIsSearching]);

  if (status === "error") {
    return (
      <div className="text-center p-4 text-red-500">
        <p>Error loading Pokemon data: {(error as Error)?.message}</p>
        <button
          onClick={() => refetch()}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <>
      {filteredPokemon.length === 0 ? (
        <div className="text-center py-8">
          No Pokemon found matching your criteria
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPokemon.map((pokemon, index) => {
            const isLastPokemon = index === filteredPokemon.length - 1;

            return (
              <PokemonItem
                key={pokemon.id}
                lastPokemonRef={lastPokemonRef}
                isLastPokemon={isLastPokemon}
                pokemon={pokemon}
              />
            );
          })}
        </div>
      )}

      {isFetchingNextPage && (
        <div className="text-center mt-4">Loading more Pokemon...</div>
      )}
    </>
  );
}
