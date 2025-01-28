import { Suspense } from "react";
import PokemonContainer from "@/components/pokemon/pokemon-container";
import { PokemonContainerLoadingSkeleton } from "@/components/pokemon/pokemon-container-loading-skeleton";
import { _fetch, BASE_URL } from "@/lib/api/config";
import { getPokemonById } from "@/lib/api/pokemon";
import { notFound } from "next/navigation";

// Revalidate cache every 60 seconds
export const revalidate = 60;

// Allow dynamic paths
export const dynamicParams = true;

// Generate static params at build time
export async function generateStaticParams() {
  try {
    const data = await _fetch(`${BASE_URL}/pokemon`);

    return data.results.map((pokemon: { url: string }) => ({
      "pokemon-id": pokemon.url.split("/").slice(-2)[0],
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function PokemonPage({
  params,
}: {
  params: Promise<{ "pokemon-id": string }>;
}) {
  try {
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
  } catch (error) {
    console.error("Error fetching Pokemon:", error);
    notFound();
  }
}
