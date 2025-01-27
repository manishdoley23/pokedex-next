import { getPaginatedPokemonWithDetails } from "@/services/pokemon-service";
import { useInfiniteQuery } from "@tanstack/react-query";

/**
 * Hook to fetch pokemon list with infinite query
 * @param LIMIT number of items to fetch per page
 */
export function usePokemonInfiniteQuery(LIMIT: number) {
  return useInfiniteQuery({
    queryKey: ["pokemonList"],
    queryFn: ({ pageParam = 0 }) =>
      getPaginatedPokemonWithDetails(LIMIT, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextOffset : undefined,
  });
}
