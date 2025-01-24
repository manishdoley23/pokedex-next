"use client";

import { useEffect, useRef, useCallback, useMemo } from "react";
import PokemonItem from "./pokemon-item";
import { usePokemonInfiniteQuery } from "@/lib/hooks/use-infinite-query-hooks";
import { INITIAL_FETCH_LIMIT } from "@/lib/utils/constants";
import { Loader2 } from "lucide-react";

export default function PokemonGrid({
  searchTerm,
  selectedTypes,
  selectedGenerations,
  selectedAbilities,
  statRanges,
}: {
  searchTerm: string;
  selectedTypes: string[];
  selectedGenerations: string[];
  selectedAbilities: string[];
  statRanges: Record<string, number>;
}) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const {
    data,
    status,
    hasNextPage,
    isFetchingNextPage,
    error,
    refetch,
    fetchNextPage,
  } = usePokemonInfiniteQuery(INITIAL_FETCH_LIMIT);

  const filteredPokemon = useMemo(() => {
    return (
      data?.pages.flatMap((page) =>
        page.pokemons.filter((pokemon) => {
          // Search filter
          const matchesSearch =
            !searchTerm ||
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());

          // Type filter
          const matchesType =
            selectedTypes.length === 0 ||
            pokemon.types.some((type) =>
              selectedTypes.includes(type.type.name)
            );

          // Generation filter using past_types
          const matchesGeneration =
            selectedGenerations.length === 0 ||
            pokemon.past_types.some((pastType) =>
              selectedGenerations.includes(pastType.generation.name)
            );

          // Stats filter
          const matchesStats = Object.entries(statRanges).every(
            ([stat, minValue]) => {
              const pokemonStat = pokemon.stats.find(
                (s) => s.stat.name === stat
              );
              return !pokemonStat || pokemonStat.base_stat >= minValue;
            }
          );

          // Ability filter
          const matchesAbility =
            selectedAbilities.length === 0 ||
            pokemon.abilities.some((ability) =>
              selectedAbilities.includes(ability.ability.name)
            );

          return (
            matchesSearch &&
            matchesType &&
            matchesGeneration &&
            matchesStats &&
            matchesAbility
          );
        })
      ) ?? []
    );
  }, [
    data?.pages,
    searchTerm,
    selectedTypes,
    selectedGenerations,
    statRanges,
    selectedAbilities,
  ]);

  // Track if we should stop fetching
  const shouldStopFetching = useMemo(() => {
    // Stop if we have filtered results but they're not increasing
    const currentPagePokemons =
      data?.pages[data.pages.length - 1]?.pokemons || [];
    const filteredCurrentPage = currentPagePokemons.filter((pokemon) => {
      const matchesSearch =
        !searchTerm ||
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType =
        selectedTypes.length === 0 ||
        pokemon.types.some((type) => selectedTypes.includes(type.type.name));
      return matchesSearch && matchesType;
    });

    // If the last page added no new filtered results, stop fetching
    return filteredCurrentPage.length === 0;
  }, [data?.pages, searchTerm, selectedTypes]);

  const lastPokemonRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          hasNextPage &&
          !isFetchingNextPage &&
          !shouldStopFetching
        ) {
          fetchNextPage();
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage, shouldStopFetching]
  );

  // Modify the auto-fetch logic
  useEffect(() => {
    if (
      filteredPokemon.length < INITIAL_FETCH_LIMIT * 2 &&
      hasNextPage &&
      !isFetchingNextPage &&
      !shouldStopFetching
    ) {
      fetchNextPage();
    }
  }, [
    filteredPokemon.length,
    hasNextPage,
    isFetchingNextPage,
    shouldStopFetching,
    fetchNextPage,
  ]);

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
        <div className="text-center mt-4">
          <Loader2 />
        </div>
      )}
    </>
  );
}
