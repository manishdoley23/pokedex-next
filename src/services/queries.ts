import { useInfiniteQuery } from "@tanstack/react-query";
import { getPokemonList } from "@/lib/api/pokemon";

export function usePokemonInfiniteQuery() {
  return useInfiniteQuery({
    queryKey: ["pokemon"],
    queryFn: ({ pageParam }) => getPokemonList(20, pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.next ? lastPage.offset + 20 : undefined,
    initialPageParam: 0,
  });
}
