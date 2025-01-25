import { useQueries, useQuery } from "@tanstack/react-query";
import {
  getEvolutionChain,
  getPokemonById,
  getTypesDataFromId,
} from "../api/pokemon";
import { NamedAPIResource } from "../types/common";

export function useEvolutionChain(evolutionChainId: number) {
  return useQuery({
    queryKey: ["evolution", evolutionChainId],
    queryFn: () => getEvolutionChain(evolutionChainId),
  });
}

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

export function useGetPokemonDetails(pokemonId: number) {
  return useQuery({
    queryKey: ["pokemon", pokemonId],
    queryFn: () => getPokemonById(pokemonId),
  });
}
