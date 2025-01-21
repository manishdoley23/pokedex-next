import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import PokemonGrid from "@/components/PokemonGrid";
import { Pokemon } from "../../types/pokemon";

const LIMIT = 30;

async function getInitialPokemon() {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?limit=${LIMIT}&offset=0`
  );
  const listData = await res.json();

  // Fetch detailed data for each Pokemon
  const details = await Promise.all(
    listData.results.map(async (pokemon) => {
      const detailRes = await fetch(pokemon.url);
      return detailRes.json();
    })
  );

  console.log("details", details);

  return {
    pokemons: details,
    nextOffset: LIMIT,
    hasMore: listData.next !== null,
  };
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
