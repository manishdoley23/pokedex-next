import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getPaginatedPokemon } from "@/services/pokemon-service";
import PokemonGrid from "@/components/pokemon-grid";

const LIMIT = 30;

async function getInitialPokemon() {
  return await getPaginatedPokemon(LIMIT, 0);
}

export default async function HomePage() {
  const queryClient = new QueryClient();

  // Prefetch the initial data on the server
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["pokemonList"],
    queryFn: () => getInitialPokemon(),
    initialPageParam: 0,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PokemonGrid />
    </HydrationBoundary>
  );
}
