"use client";

import { useState } from "react";

import { PokemonApiResponse } from "@/lib/types/pokemon";
import {
  Legend,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import { TypeBadge } from "../ui/badge";
import PokedexContainer from "../pokedex/pokedex-container";

export default function ComparePokemon() {
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonApiResponse[]>(
    []
  );

  const handlePokemonSelect = (pokemon: PokemonApiResponse) => {
    // Check if this Pokemon is already selected
    if (selectedPokemon.some((p) => p.id === pokemon.id)) {
      return; // Don't allow selecting the same Pokemon twice
    }

    if (selectedPokemon.length < 2) {
      setSelectedPokemon([...selectedPokemon, pokemon]);
    }
  };

  const handlePokemonRemove = (pokemonId: number) => {
    // Only remove the specific Pokemon, keeping the comparison view intact
    setSelectedPokemon(selectedPokemon.filter((p) => p.id !== pokemonId));
  };

  const ComparisonView = () => {
    // Always render the comparison view, even with empty slots
    const pokemon1 = selectedPokemon[0];
    const pokemon2 = selectedPokemon[1];

    // Prepare stats data for the radar chart only when both Pokemon are selected
    const statsData =
      pokemon1 && pokemon2
        ? pokemon1.stats.map((stat, index) => ({
            stat: stat.stat.name,
            [pokemon1.name]: stat.base_stat,
            [pokemon2.name]: pokemon2.stats[index].base_stat,
          }))
        : [];

    return (
      <div className="mt-8 p-4 bg-white rounded-lg shadow">
        <div className="grid grid-cols-2 gap-4">
          {/* Pokemon Headers */}
          {[pokemon1, pokemon2].map((pokemon, index) => (
            <div key={index} className="text-center border rounded-lg p-4">
              {pokemon ? (
                <>
                  <h3 className="text-xl font-bold capitalize">
                    {pokemon.name}
                  </h3>
                  <div className="flex gap-2 justify-center mt-2">
                    {pokemon.types.map((type) => (
                      <TypeBadge key={type.type.name} type={type.type.name} />
                    ))}
                  </div>
                  <button
                    onClick={() => handlePokemonRemove(pokemon.id)}
                    className="mt-2 text-sm text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </>
              ) : (
                <div className="h-24 flex items-center justify-center text-gray-500">
                  Select Pokemon {index + 1}
                </div>
              )}
            </div>
          ))}

          {/* Stats Comparison */}
          <div className="col-span-2 mt-4">
            <h4 className="text-lg font-semibold mb-4">
              Base Stats Comparison
            </h4>
            <div className="h-96">
              {pokemon1 && pokemon2 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={statsData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="stat" />
                    <PolarRadiusAxis />
                    <Radar
                      name={pokemon1.name}
                      dataKey={pokemon1.name}
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.5}
                    />
                    <Radar
                      name={pokemon2.name}
                      dataKey={pokemon2.name}
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      fillOpacity={0.5}
                    />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  Select two Pokemon to compare stats
                </div>
              )}
            </div>
          </div>

          {/* Move Comparison */}
          <div className="col-span-2 mt-4">
            <h4 className="text-lg font-semibold mb-4">Move Pool Analysis</h4>
            <div className="grid grid-cols-2 gap-4">
              {[pokemon1, pokemon2].map((pokemon, index) => (
                <div key={index} className="border rounded p-4">
                  {pokemon ? (
                    <>
                      <h5 className="font-medium capitalize mb-2">
                        {pokemon.name}&apos;s Moves
                      </h5>
                      <div className="max-h-60 overflow-y-auto">
                        {pokemon.moves.map((move) => (
                          <div
                            key={move.move.name}
                            className="text-sm py-1 capitalize"
                          >
                            {move.move.name.replace("-", " ")}
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="h-32 flex items-center justify-center text-gray-500">
                      Select Pokemon {index + 1} to view moves
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h1 className="text-4xl text-center font-bold mb-8">Compare Pokemon</h1>

      {/* Selection Status */}
      <div className="text-center mb-4">
        {selectedPokemon.length === 0 ? (
          <p className="text-gray-600">
            Select two different Pokemon to compare
          </p>
        ) : selectedPokemon.length === 1 ? (
          <p className="text-gray-600">
            Select one more Pokemon to compare (cannot select the same Pokemon)
          </p>
        ) : null}
      </div>

      {/* Currently Selected Pokemon (when only one is selected) */}
      {selectedPokemon.length === 1 && (
        <div className="text-center mb-4 p-2 bg-blue-50 rounded">
          <p className="font-medium capitalize">
            Currently selected: {selectedPokemon[0].name}
          </p>
          <button
            onClick={() => setSelectedPokemon([])}
            className="mt-2 text-sm text-red-500 hover:text-red-700"
          >
            Clear Selection
          </button>
        </div>
      )}

      {/* Comparison View */}
      <ComparisonView />

      {/* Pokedex Grid for Selection */}
      <div className="mt-8">
        <PokedexContainer onPokemonSelect={handlePokemonSelect} />
      </div>
    </div>
  );
}
