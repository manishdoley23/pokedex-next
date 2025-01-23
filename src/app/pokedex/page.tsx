import { getPaginatedPokemon } from "@/services/pokemon-service";
import PokemonContainer from "@/components/pokemon/pokemon-container";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/utils";

const LIMIT = 30;

export default async function HomePage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["pokemonList"],
    queryFn: async () => await getPaginatedPokemon(LIMIT, 0),
    initialPageParam: 0,
  });

  return (
    <main className="min-h-screen">
      <HydrationBoundary>
        <PokemonContainer dehydratedState={dehydrate(queryClient)} />
      </HydrationBoundary>
    </main>
  );
}
