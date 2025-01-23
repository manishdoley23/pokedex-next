import { useInfiniteQuery } from "@tanstack/react-query";
import { getPaginatedPokemon } from "@/services/pokemon-service";

export function usePokemonInfiniteQuery(
  LIMIT: number,
  searchTerm: string,
  selectedTypes: string[]
) {
  return useInfiniteQuery({
    queryKey: ["pokemonList", searchTerm, selectedTypes],
    queryFn: async ({ pageParam = 0 }) => getPaginatedPokemon(LIMIT, pageParam), // Add pageParam here
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextOffset : undefined,
  });
}
