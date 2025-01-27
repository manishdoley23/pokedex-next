"use client";

import { useCompare } from "@/lib/hooks/use-pokemon-hooks";
import { ComparePokemonStats } from "./compare-pokemon-stats";
import { ComparePokemonMoves } from "./compare-pokemon-moves";
import { ComparePokemonTypes } from "./compare-pokemon-types";
import { TypeBadge } from "../ui/badge";
import Image from "next/image";

export function ComparePokemonView() {
  const { compareList, removeFromCompare } = useCompare();

  if (compareList.length === 0) {
    return (
      <div className="mt-8 p-4 bg-white rounded-lg shadow text-center">
        <p className="text-xl font-bold">No Pokemon to compare</p>
        <p className="text-gray-500">Click on a pokemon to start comparing</p>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-8">
      {/* Pokemon Headers */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {compareList.map((pokemon) => (
          <div
            key={pokemon.id}
            className="text-center border rounded-lg p-4 bg-white shadow"
          >
            {pokemon.sprites.other["official-artwork"].front_default && (
              <div className="w-32 h-32 mx-auto mb-4">
                <Image
                  src={pokemon.sprites.other["official-artwork"].front_default}
                  alt={pokemon.name}
                  className="object-contain"
                  width={100}
                  height={100}
                />
              </div>
            )}
            <h3 className="text-xl font-bold capitalize">{pokemon.name}</h3>
            <div className="flex gap-2 justify-center mt-2">
              {pokemon.types.map((type) => (
                <TypeBadge key={type.type.name} type={type.type.name} />
              ))}
            </div>
            <button
              onClick={() => removeFromCompare(pokemon.id)}
              className="mt-2 text-sm text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Type Effectiveness */}
      <div>
        <ComparePokemonTypes pokemon={compareList} />
      </div>

      {/* Stats Comparison */}
      <div className="bg-white rounded-lg shadow p-6">
        <h4 className="text-lg font-semibold mb-4">Base Stats Comparison</h4>
        <ComparePokemonStats pokemon={compareList} />
      </div>

      {/* Move Comparison */}
      <div className="bg-white rounded-lg shadow p-6">
        <h4 className="text-lg font-semibold mb-4">Move Pool Analysis</h4>
        <ComparePokemonMoves pokemon={compareList} />
      </div>
    </div>
  );
}
