import PokemonContainer from "@/components/pokemon/pokemon-container";
import { PokemonContainerLoadingSkeleton } from "@/components/pokemon/pokemon-container-loading-skeleton";
import { _fetch, BASE_URL } from "@/lib/api/config";
import { getPokemonById } from "@/lib/api/pokemon";
import { PokemonListApiResponse } from "@/lib/types/pokemon";
import { Suspense } from "react";

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 60;

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true; // or false, to 404 on unknown paths

export async function generateStaticParams() {
  const pokemonList: PokemonListApiResponse = await _fetch(
    `${BASE_URL}pokemon`
  );
  return pokemonList.results.map((pokemon) => {
    const pokemonId = pokemon.url.split("/").slice(-2)[0];

    return {
      "pokemon-id": String(pokemonId),
    };
  });
}

export default async function PokemonPage({
  params,
}: {
  params: Promise<{ "pokemon-id": string }>;
}) {
  const pokemonId = (await params)["pokemon-id"];
  const pokemon = await getPokemonById(parseInt(pokemonId));

  return (
    <main className="container mx-auto p-4">
      <Suspense fallback={<PokemonContainerLoadingSkeleton />}>
        <PokemonContainer pokemon={pokemon} />
      </Suspense>
    </main>
  );
}
