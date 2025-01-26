"use client";

import { useCompare } from "@/lib/hooks/use-pokemon-hooks";
import { ComparePokemonStats } from "./compare-pokemon-stats";
import { ComparePokemonMoves } from "./compare-pokemon-moves";
import { TypeBadge } from "../ui/badge";

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
    <div className="mt-8 p-4 bg-white rounded-lg shadow">
      <div className="space-y-6">
        {/* Pokemon Headers */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {compareList.map((pokemon) => (
            <div key={pokemon.id} className="text-center border rounded-lg p-4">
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

        {/* Stats Comparison */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Base Stats Comparison</h4>
          <ComparePokemonStats pokemon={compareList} />
        </div>

        {/* Move Comparison */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Move Pool Analysis</h4>
          <ComparePokemonMoves pokemon={compareList} />
        </div>
      </div>
    </div>
  );
}
