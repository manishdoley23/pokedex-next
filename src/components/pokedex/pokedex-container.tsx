"use client";

import { useState, useCallback } from "react";
import { SearchAndFilters } from "../search-filters";
import { PokemonApiResponse } from "@/lib/types/pokemon";
import PokedexGrid from "./pokedex-grid";
import { PokemonCardType } from "@/lib/types/common";

export default function PokedexContainer({
  mode = "pokedex",
}: {
  mode: PokemonCardType;
  onPokemonSelect?: (pokemon: PokemonApiResponse) => void;
}) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedGenerations, setSelectedGenerations] = useState<string[]>([]);
  const [selectedAbilities, setSelectedAbilities] = useState<string[]>([]);
  const [statRanges, setStatRanges] = useState<Record<string, number>>({});
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const handleTypeFilter = useCallback((type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  }, []);

  const handleGenerationFilter = useCallback((gen: string) => {
    setSelectedGenerations((prev) =>
      prev.includes(gen) ? prev.filter((g) => g !== gen) : [...prev, gen]
    );
  }, []);

  const handleStatRangeFilter = useCallback((stat: string, value: number) => {
    setStatRanges((prev) => ({
      ...prev,
      [stat]: value,
    }));
  }, []);

  const handleAbilityFilter = useCallback((ability: string) => {
    setSelectedAbilities((prev) =>
      prev.includes(ability)
        ? prev.filter((a) => a !== ability)
        : [...prev, ability]
    );
  }, []);

  return (
    <div className="container mx-auto p-4">
      <SearchAndFilters
        onSearch={handleSearch}
        onTypeFilter={handleTypeFilter}
        onGenerationFilter={handleGenerationFilter}
        onStatRangeFilter={handleStatRangeFilter}
        onAbilityFilter={handleAbilityFilter}
        selectedTypes={selectedTypes}
        selectedGenerations={selectedGenerations}
        selectedAbilities={selectedAbilities}
        statRanges={statRanges}
      />
      <PokedexGrid
        mode={mode}
        searchTerm={searchTerm}
        selectedTypes={selectedTypes}
        selectedGenerations={selectedGenerations}
        selectedAbilities={selectedAbilities}
        statRanges={statRanges}
      />
    </div>
  );
}
