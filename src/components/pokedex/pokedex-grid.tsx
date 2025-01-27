import { useEffect } from "react";
import { Loader } from "../ui/loader";
import { useIntersectionObserver } from "@/lib/hooks/use-ui-hook";
import { usePokemonInfiniteQuery } from "@/lib/hooks/use-infinite-query-hooks";
import { INITIAL_FETCH_LIMIT } from "@/lib/utils/constants";
import { useTeamStore } from "@/lib/store/team-store";
import type { PokemonApiResponse } from "@/lib/types/pokemon";
import { PokemonTeamCard } from "../pokemon/cards/pokemon-team-card";
import { PokemonCompareCard } from "../pokemon/cards/pokemon-compare-card";
import { PokemonPokedexCard } from "../pokemon/cards/pokemon-pokedex-card";
import { PokemonCardType } from "@/lib/types/common";
import {
  useFilteredPokemon,
  useSelectedPokemonIds,
  useShouldStopFetching,
} from "@/lib/hooks/use-pokemon-filter-hooks";

type PokedexGridProps = {
  searchTerm: string;
  selectedTypes: string[];
  selectedGenerations: string[];
  selectedAbilities: string[];
  statRanges: Record<string, number>;
  mode: PokemonCardType;
};

export default function PokedexGrid({
  searchTerm,
  selectedTypes,
  selectedGenerations,
  selectedAbilities,
  statRanges,
  mode = "pokedex",
}: PokedexGridProps) {
  const activeTeam = useTeamStore((state) => state.activeTeam);

  const {
    data,
    status,
    hasNextPage,
    isFetchingNextPage,
    error,
    fetchNextPage,
    refetch,
  } = usePokemonInfiniteQuery(INITIAL_FETCH_LIMIT);

  const filteredPokemon = useFilteredPokemon(data, {
    searchTerm,
    selectedTypes,
    selectedGenerations,
    selectedAbilities,
    statRanges,
  });

  const selectedPokemonIds = useSelectedPokemonIds(activeTeam);

  const shouldStopFetching = useShouldStopFetching(
    data,
    searchTerm,
    selectedTypes
  );

  const { lastPokemonRef } = useIntersectionObserver({
    hasNextPage,
    isFetchingNextPage,
    shouldStopFetching,
    fetchNextPage,
  });

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

  const renderPokemonCard = (pokemon: PokemonApiResponse, index: number) => {
    const isLastPokemon = index === filteredPokemon.length - 1;
    const isSelected = selectedPokemonIds.has(pokemon.id);
    const commonProps = {
      pokemon,
      isLastPokemon,
      lastPokemonRef,
      isSelected,
    };

    switch (mode) {
      case "team":
        return <PokemonTeamCard key={pokemon.id} {...commonProps} />;
      case "compare":
        return <PokemonCompareCard key={pokemon.id} {...commonProps} />;
      default:
        return <PokemonPokedexCard key={pokemon.id} {...commonProps} />;
    }
  };

  return (
    <>
      {filteredPokemon.length === 0 ? (
        <div className="text-center py-8">
          No Pokemon found matching your criteria
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPokemon.map(renderPokemonCard)}
        </div>
      )}
      {isFetchingNextPage && (
        <div className="flex w-full justify-center">
          <Loader />
        </div>
      )}
    </>
  );
}
