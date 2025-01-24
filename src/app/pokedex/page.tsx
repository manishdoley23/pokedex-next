import PokemonContainer from "@/components/pokedex/pokedex-container";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/utils/get-query-client";
import { INITIAL_FETCH_LIMIT } from "@/lib/utils/constants";
import { PokemonListServiceDTO } from "@/lib/types/dto/pokemon";
import { getPaginatedPokemonWithDetails } from "@/services/pokemon-service";

export default async function PokedexPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["pokemonList"],
    queryFn: () => getPaginatedPokemonWithDetails(INITIAL_FETCH_LIMIT, 0),
    initialPageParam: 0,
    getNextPageParam: (lastPage: PokemonListServiceDTO) =>
      lastPage.hasMore ? lastPage.nextOffset : undefined,
  });

  return (
    <main className="min-h-screen">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PokemonContainer />
      </HydrationBoundary>
    </main>
  );
}
