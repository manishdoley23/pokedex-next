"use client";

import { usePokedexFilters } from "@/lib/hooks/use-pokemon-filter-hooks";
import { SearchAndFilters } from "../ui/search-filters";
import PokedexGrid from "./pokedex-grid";
import { PokemonCardType } from "@/lib/types/common";

export default function PokedexContainer({
  mode = "pokedex",
}: {
  mode: PokemonCardType;
}) {
  const {
    selectedTypes,
    selectedGenerations,
    selectedAbilities,
    statRanges,
    searchTerm,
    handleSearch,
    handleTypeFilter,
    handleGenerationFilter,
    handleStatRangeFilter,
    handleAbilityFilter,
  } = usePokedexFilters();

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
