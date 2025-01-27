import Image from "next/image";

import { PokemonStats } from "./pokemon-stats-card";
import { PokemonEvolutionCard } from "./pokemon-evolution-card";
import { PokemonTypeEffectiveness } from "./pokemon-type-effectiveness-card";
import { PokemonMovesAbilities } from "./pokemon-moves-abilities-card";
import { getPokemonIdFromUrl } from "@/lib/utils";
import { PokemonApiResponse } from "@/lib/types/pokemon";
import { NamedAPIResource } from "@/lib/types/common";
import {
  getEvolutionChainIdFromSpecies,
  getTypesDataFromId,
} from "@/lib/api/pokemon";
import { TypeBadge } from "../ui/badge";

async function getTypesData(types: { slot: number; type: NamedAPIResource }[]) {
  const typesArray = types.map(async (type) => {
    const typeId = type.type.url.split("/").slice(-2, -1)[0];
    return getTypesDataFromId(parseInt(typeId));
  });
  return await Promise.all(typesArray);
}

// TODO: Transform the pokemon object into a minimized type
export default async function PokemonContainer({
  pokemon,
}: {
  pokemon: PokemonApiResponse;
}) {
  const speciesId = getPokemonIdFromUrl(pokemon.species.url);
  const [types, evolutionChainId] = await Promise.all([
    getTypesData(pokemon.types),
    getEvolutionChainIdFromSpecies(speciesId),
  ]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-6">
        {pokemon.sprites.other["official-artwork"].front_default && (
          <div>
            <Image
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
              width={200}
              height={200}
              className="rounded-lg"
            />
          </div>
        )}
        <div>
          <h1 className="text-4xl font-bold capitalize">{pokemon.name}</h1>
          <div className="flex gap-2 mt-2">
            {pokemon.types.map((type) => (
              <TypeBadge type={type.type.name} key={type.type.name} />
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
          <PokemonTypeEffectiveness types={types} />
        </div>

        {/* Evolution Chain */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Evolution Chain</h2>
          <PokemonEvolutionCard evolutionChainId={evolutionChainId} />
        </div>

        {/* Moves & Abilites */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Moves</h2>
          <PokemonMovesAbilities
            moves={pokemon.moves}
            abilities={pokemon.abilities}
          />
        </div>
      </div>
    </div>
  );
}
