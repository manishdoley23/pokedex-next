import React from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Card } from "../ui/card";
import { useEvolutionChain } from "@/lib/hooks/use-pokemon-hooks";
import { EvolutionChainLink, EvolutionDetail } from "@/lib/types/evolution";

function PokemonCard({ name, imageUrl }: { name: string; imageUrl: string }) {
  return (
    <Card className="p-4 flex flex-col items-center justify-center w-32">
      <Image src={imageUrl} alt={name} className="w-20 h-20" />
      <p className="mt-2 text-sm font-medium capitalize">{name}</p>
    </Card>
  );
}

function EvolutionDetails({ details }: { details: EvolutionDetail }) {
  let triggerText = "";

  if (details.min_level) {
    triggerText = `Level ${details.min_level}`;
  } else if (details.item) {
    triggerText = `Use ${details.item}`;
  } else if (details.trigger?.name) {
    triggerText = details.trigger.name.replace("-", " ");
  }

  return (
    <div className="flex items-center mx-4">
      <ArrowRight className="w-6 h-6 text-gray-400" />
      <span className="text-xs text-gray-500 ml-2">{triggerText}</span>
    </div>
  );
}

function renderEvolutionChain(chain: EvolutionChainLink): React.ReactElement[] {
  const elements: React.ReactElement[] = [];
  let currentChain: EvolutionChainLink | null = chain;

  while (currentChain) {
    // Add current Pokemon
    elements.push(
      <PokemonCard
        key={currentChain.species.name}
        name={currentChain.species.name}
        imageUrl={currentChain.species.url}
      />
    );

    // If there's an evolution, add evolution details and continue the chain
    if (currentChain.evolves_to.length > 0) {
      elements.push(
        <EvolutionDetails
          key={`${currentChain.species.name}-details`}
          details={currentChain.evolves_to[0].evolution_details[0] || {}}
        />
      );
      currentChain = currentChain.evolves_to[0];
    } else {
      currentChain = null;
    }
  }

  return elements;
}

export function PokemonEvolutionCard({ pokemonId }: { pokemonId: number }) {
  const { data: evolution, isLoading } = useEvolutionChain(pokemonId);

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">Loading evolution chain...</div>
    );
  }

  if (!evolution?.chain) {
    return (
      <div className="flex justify-center p-4">No evolution data available</div>
    );
  }

  return (
    <div className="w-full p-4">
      <div className="flex items-center justify-center space-x-4">
        {renderEvolutionChain(evolution.chain)}
      </div>
    </div>
  );
}
