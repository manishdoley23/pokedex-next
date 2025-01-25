"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import {
  useEvolutionChain,
  useGetPokemonDetails,
} from "@/lib/hooks/use-pokemon-hooks";
import { EvolutionChainLink } from "@/lib/types/evolution";
import { Loader } from "../ui/loader";
import { getPokemonIdFromUrl } from "@/lib/utils";
import { Card } from "../ui/card";
import Image from "next/image";

export function PokemonEvolutionCard({
  evolutionChainId,
}: {
  evolutionChainId: number;
}) {
  const { data: evolution, isLoading } = useEvolutionChain(evolutionChainId);

  if (isLoading) {
    return <Loader />;
  }

  if (!evolution?.chain) {
    return (
      <div className="flex justify-center p-4">No evolution data available</div>
    );
  }

  return (
    <div className="w-full p-4">
      <div className="flex items-center justify-center">
        <EvolutionChain chain={evolution.chain} />
      </div>
    </div>
  );
}

function EvolutionChain({ chain }: { chain: EvolutionChainLink }) {
  if (!chain) return null;

  const hasBranching = chain.evolves_to.length > 1;
  return (
    <div className="flex flex-col items-center">
      <div
        className={`flex ${
          hasBranching ? "flex-col space-y-4" : "items-center"
        }`}
      >
        <EvolutionItem species={chain.species} />
        {chain.evolves_to.map((evolution) => (
          <div
            key={evolution.species.name}
            className={`flex ${
              hasBranching ? "items-center justify-center" : ""
            }`}
          >
            <div className="flex items-center">
              <ArrowRight className="mx-4" />
            </div>
            <EvolutionChain chain={evolution} />
          </div>
        ))}
      </div>
    </div>
  );
}

function EvolutionItem({
  species,
}: {
  species: { name: string; url: string };
}) {
  const pokemonId = getPokemonIdFromUrl(species.url);
  const { data: pokemon, isLoading } = useGetPokemonDetails(pokemonId);

  if (isLoading) {
    return (
      <Card className="p-4 flex flex-col items-center justify-center min-w-32 min-h-40">
        <Loader />
      </Card>
    );
  }

  const imageUrl = pokemon?.sprites.other["official-artwork"].front_default;

  return (
    <Card className="p-4 flex flex-col items-center justify-center min-w-32">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={species.name}
          width={120}
          height={120}
          className="object-contain"
          priority
        />
      )}
      <div className="mt-2 text-center">
        <p className="text-base font-medium capitalize">
          {species.name.replace("-", " ")}
        </p>
      </div>
    </Card>
  );
}
