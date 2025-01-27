import { useCallback, useMemo, useState } from "react";
import { InfiniteData } from "@tanstack/react-query";
import { PokemonApiResponse } from "../types/pokemon";
import { PokemonListServiceDTO } from "../types/dto/pokemon";
import { filterPokemon } from "../utils/pokemon-utils";

type PokemonFilters = {
  searchTerm: string;
  selectedTypes: string[];
  selectedGenerations: string[];
  selectedAbilities: string[];
  statRanges: Record<string, number>;
};
type PokemonQueryData = InfiniteData<PokemonListServiceDTO> | undefined;
/**
 * Hook to filter pokemon based on search, types, generations, abilities and stats
 */
export const useFilteredPokemon = (
  data: PokemonQueryData,
  filters: PokemonFilters
) => {
  return useMemo(
    () =>
      data?.pages.flatMap((page) =>
        page.pokemons.filter((pokemon) => filterPokemon(pokemon, filters))
      ) ?? [],
    [data, filters]
  );
};

type TeamWithPokemon = {
  pokemon: (PokemonApiResponse | null)[];
};
/**
 * Hook to get a Set of currently selected pokemon IDs from active team
 */
export const useSelectedPokemonIds = (activeTeam: TeamWithPokemon | null) => {
  return useMemo(
    () => new Set(activeTeam?.pokemon.filter(Boolean).map((p) => p!.id) || []),
    [activeTeam]
  );
};

/**
 * Hook to determine if we should stop fetching more pokemon
 * Returns true if current page has no matching pokemon
 */
export const useShouldStopFetching = (
  data: PokemonQueryData,
  searchTerm: string,
  selectedTypes: string[]
) => {
  return useMemo(() => {
    const currentPagePokemons =
      data?.pages[data.pages.length - 1]?.pokemons || [];

    const filteredCurrentPage = currentPagePokemons.filter((pokemon) =>
      filterPokemon(pokemon, {
        searchTerm,
        selectedTypes,
        selectedGenerations: [],
        selectedAbilities: [],
        statRanges: {},
      })
    );

    return filteredCurrentPage.length === 0;
  }, [data?.pages, searchTerm, selectedTypes]);
};

/**
 * Hook to manage pokedex filter states and handlers
 */
export const usePokedexFilters = () => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedGenerations, setSelectedGenerations] = useState<string[]>([]);
  const [selectedAbilities, setSelectedAbilities] = useState<string[]>([]);
  const [statRanges, setStatRanges] = useState<Record<string, number>>({});
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const handleTypeFilter = useCallback((type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  }, []);

  const handleGenerationFilter = useCallback((gen: string) => {
    setSelectedGenerations((prev) =>
      prev.includes(gen) ? prev.filter((g) => g !== gen) : [...prev, gen]
    );
  }, []);

  const handleStatRangeFilter = useCallback((stat: string, value: number) => {
    setStatRanges((prev) => ({
      ...prev,
      [stat]: value,
    }));
  }, []);

  const handleAbilityFilter = useCallback((ability: string) => {
    setSelectedAbilities((prev) =>
      prev.includes(ability)
        ? prev.filter((a) => a !== ability)
        : [...prev, ability]
    );
  }, []);

  return {
    // Filter states
    selectedTypes,
    selectedGenerations,
    selectedAbilities,
    statRanges,
    searchTerm,
    // Filter handlers
    handleSearch,
    handleTypeFilter,
    handleGenerationFilter,
    handleStatRangeFilter,
    handleAbilityFilter,
  };
};
