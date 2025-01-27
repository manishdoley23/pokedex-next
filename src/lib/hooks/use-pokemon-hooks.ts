import { useQueries, useQuery } from "@tanstack/react-query";
import {
  getEvolutionChain,
  getPokemonById,
  getTypesDataFromId,
} from "../api/pokemon";
import { NamedAPIResource } from "../types/common";
import { useContext } from "react";
import { CompareContext } from "@/components/providers/compare-pokemon-provider";

/**
 * Hook to fetch evolution chain data for a pokemon
 */
export function useEvolutionChain(evolutionChainId: number) {
  return useQuery({
    queryKey: ["evolution", evolutionChainId],
    queryFn: () => getEvolutionChain(evolutionChainId),
  });
}

/**
 * Hook to fetch type details for a pokemon's types in parallel
 */
export function useGetPokemonTypeDetails(
  types: { slot: number; type: NamedAPIResource }[]
) {
  return useQueries({
    queries: types.map((type) => {
      const typeId = type.type.url.split("/").slice(-2, -1)[0];
      return {
        queryKey: ["type", type.type.name],
        queryFn: () => getTypesDataFromId(parseInt(typeId)),
      };
    }),
  });
}

/**
 * Hook to fetch detailed pokemon data by ID
 */
export function useGetPokemonDetails(pokemonId: number) {
  return useQuery({
    queryKey: ["pokemon", pokemonId],
    queryFn: () => getPokemonById(pokemonId),
  });
}

/**
 * Hook to access compare context
 *  Returns functions to:
 * - Add pokemon to comparison list
 * - Remove pokemon from comparison list
 * - Access current comparison list
 * - Get max allowed selections
 */
export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error("useCompare must be used within CompareProvider");
  }
  return context;
};
