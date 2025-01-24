import PokemonContainer from "@/components/pokemon/pokemon-container";
import { PokemonContainerLoadingSkeleton } from "@/components/pokemon/pokemon-container-loading-skeleton";
import { Suspense } from "react";

export default async function PokedexPokemonPage({
  params,
}: {
  params: { "pokemon-id": string };
}) {
  const pokemonId = params["pokemon-id"];

  return (
    <main className="container mx-auto p-4">
      <Suspense fallback={<PokemonContainerLoadingSkeleton />}>
        <PokemonContainer pokemonId={parseInt(pokemonId)} />
      </Suspense>
    </main>
  );
}
