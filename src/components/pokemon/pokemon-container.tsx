"use client";

import { PokemonStats } from "./pokemon-stats-card";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Image from "next/image";
import { PokemonContainerLoadingSkeleton } from "./pokemon-container-loading-skeleton";
import { usePokemonDetail } from "@/lib/hooks/use-pokemon-hooks";
import { PokemonEvolutionCard } from "./pokemon-evolution-card";
import { PokemonTypeEffectiveness } from "./pokemon-type-effectiveness-card";
import { PokemonMoves } from "./pokemon-moves-card";
import { cn, getTypeColor, getTypeTextColor } from "@/lib/utils";

export default function PokemonContainer({ pokemonId }: { pokemonId: number }) {
  const { data: pokemon, isLoading, error } = usePokemonDetail(pokemonId);

  if (isLoading) {
    return <PokemonContainerLoadingSkeleton />;
  }

  if (error || !pokemon) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load Pokemon details. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  console.log("pokemon", pokemon);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-6">
        <div>
          <Image
            src={pokemon.sprites.other["official-artwork"].front_default ?? ""}
            alt={pokemon.name}
            width={200}
            height={200}
            className="rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold capitalize">{pokemon.name}</h1>
          <div className="flex gap-2 mt-2">
            {pokemon.types.map((type) => (
              <span
                key={type.type.name}
                className="px-3 py-1 rounded capitalize text-sm font-medium"
                style={{
                  backgroundColor: getTypeColor(type.type.name),
                  color: getTypeTextColor(type.type.name),
                }}
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Grid layout for details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Stats */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Base Stats</h2>
          <PokemonStats stats={pokemon.stats} />
        </div>

        {/* Type Effectiveness */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Type Effectiveness</h2>
          {/* <PokemonTypeEffectiveness types={pokemon.types} /> */}
        </div>

        {/* Evolution Chain */}
        {/* <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Evolution Chain</h2>
          <PokemonEvolutionCard pokemonId={pokemon.id} />
        </div> */}

        {/* Moves */}
        {/* <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Moves</h2>
          <PokemonMoves moves={pokemon.moves} />
        </div> */}
      </div>
    </div>
  );
}
