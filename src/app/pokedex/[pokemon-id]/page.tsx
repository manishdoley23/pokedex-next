import { Suspense } from "react";
import PokemonContainer from "@/components/pokemon/pokemon-container";
import { PokemonContainerLoadingSkeleton } from "@/components/pokemon/pokemon-container-loading-skeleton";
import { getPokemonById } from "@/lib/api/pokemon";
import { notFound } from "next/navigation";

export default async function PokemonPage({
  params,
}: {
  params: Promise<{ "pokemon-id": string }>;
}) {
  const pokemonId = await params;
  const pokemon = await getPokemonById(parseInt(pokemonId["pokemon-id"]));

  if (!pokemon) {
    notFound();
  }

  return (
    <main className="container mx-auto p-4">
      <Suspense fallback={<PokemonContainerLoadingSkeleton />}>
        <PokemonContainer pokemon={pokemon} />
      </Suspense>
    </main>
  );
}
