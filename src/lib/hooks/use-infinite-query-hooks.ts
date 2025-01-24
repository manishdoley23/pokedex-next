import { getPaginatedPokemonWithDetails } from "@/services/pokemon-service";
import { useInfiniteQuery } from "@tanstack/react-query";

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
