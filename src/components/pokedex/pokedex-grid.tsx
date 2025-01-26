import { useEffect, useRef, useCallback, useMemo } from "react";
import { Loader2 } from "lucide-react";
import { usePokemonInfiniteQuery } from "@/lib/hooks/use-infinite-query-hooks";
import { INITIAL_FETCH_LIMIT } from "@/lib/utils/constants";
import { useTeamStore } from "@/lib/store/team-store";
import type { PokemonApiResponse } from "@/lib/types/pokemon";
import { PokemonTeamCard } from "../cards/pokemon-team-card";
import { PokemonCompareCard } from "../cards/pokemon-compare-card";
import { PokemonPokedexCard } from "../cards/pokemon-pokedex-card";
import { PokemonCardType } from "@/lib/types/common";

interface PokedexGridProps {
  searchTerm: string;
  selectedTypes: string[];
  selectedGenerations: string[];
  selectedAbilities: string[];
  statRanges: Record<string, number>;
  mode: PokemonCardType;
}

export default function PokedexGrid({
  searchTerm,
  selectedTypes,
  selectedGenerations,
  selectedAbilities,
  statRanges,
  mode = "pokedex",
}: PokedexGridProps) {
  const activeTeam = useTeamStore((state) => state.activeTeam);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const {
    data,
    status,
    hasNextPage,
    isFetchingNextPage,
    error,
    fetchNextPage,
    refetch,
  } = usePokemonInfiniteQuery(INITIAL_FETCH_LIMIT);

  const selectedPokemonIds = useMemo(
    () => new Set(activeTeam?.pokemon.filter(Boolean).map((p) => p!.id) || []),
    [activeTeam]
  );

  const filteredPokemon = useMemo(
    () =>
      data?.pages.flatMap((page) =>
        page.pokemons.filter((pokemon) => {
          const matchesSearch =
            !searchTerm ||
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesType =
            selectedTypes.length === 0 ||
            pokemon.types.some((t) => selectedTypes.includes(t.type.name));
          const matchesGeneration =
            selectedGenerations.length === 0 ||
            pokemon.past_types.some((pt) =>
              selectedGenerations.includes(pt.generation.name)
            );
          const matchesAbility =
            selectedAbilities.length === 0 ||
            pokemon.abilities.some((a) =>
              selectedAbilities.includes(a.ability.name)
            );
          const matchesStats = Object.entries(statRanges).every(
            ([stat, min]) =>
              (pokemon.stats.find((s) => s.stat.name === stat)?.base_stat ||
                0) >= min
          );

          return (
            matchesSearch &&
            matchesType &&
            matchesGeneration &&
            matchesAbility &&
            matchesStats
          );
        })
      ) ?? [],
    [
      data,
      searchTerm,
      selectedTypes,
      selectedGenerations,
      selectedAbilities,
      statRanges,
    ]
  );

  // Track if we should stop fetching
  const shouldStopFetching = useMemo(() => {
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
        <div className="text-center mt-4">
          <Loader2 className="animate-spin" />
        </div>
      )}
    </>
  );
}
