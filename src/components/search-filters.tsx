"use client";

import { debounce } from "lodash";
import {
  PokemonCommonAbilitiesEnum,
  PokemonStatsEnum,
  PokemonTypesEnum,
  VersionGenerationEnum,
} from "@/lib/utils/constants";
import { TypeBadge } from "./ui/badge";

interface SearchAndFiltersProps {
  onSearch: (value: string) => void;
  onTypeFilter: (type: string) => void;
  onGenerationFilter: (gen: string) => void;
  onStatRangeFilter: (stat: string, value: number) => void;
  onAbilityFilter: (ability: string) => void;
  selectedTypes: string[];
  selectedGenerations: string[];
  selectedAbilities: string[];
  statRanges: Record<string, number>;
}

export function SearchAndFilters({
  onSearch,
  onTypeFilter,
  onGenerationFilter,
  onStatRangeFilter,
  onAbilityFilter,
  selectedTypes,
  selectedGenerations,
  selectedAbilities,
  statRanges,
}: SearchAndFiltersProps) {
  const debouncedSearch = debounce((value: string) => {
    onSearch(value);
  }, 300);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const handleStatRangeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    stat: string
  ) => {
    onStatRangeFilter(stat, parseInt(e.target.value));
  };

  return (
    <>
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Search Pokemon"
          onChange={handleSearchInput}
          className="w-full px-4 py-2 rounded border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="mb-6 space-y-4">
        <div className="flex flex-col gap-6">
          <p className="font-bold text-xl">Filters</p>

          {/* Types Filter */}
          <div className="flex flex-col gap-2">
            <p className="font-semibold">Types:</p>
            <div className="flex flex-wrap gap-2">
              {Object.values(PokemonTypesEnum).map((type) => (
                <button
                  key={type}
                  onClick={() => onTypeFilter(type)}
                  className={`transition-all ${
                    selectedTypes.includes(type)
                      ? "opacity-100 scale-110"
                      : "opacity-50 hover:opacity-75 hover:scale-105"
                  }`}
                >
                  <TypeBadge type={type} />
                </button>
              ))}
            </div>
          </div>

          {/* Generation Filter */}
          <div className="flex flex-col gap-2">
            <p className="font-semibold">Generations:</p>
            <div className="flex flex-wrap gap-2">
              {Object.values(VersionGenerationEnum).map((gen) => (
                <button
                  key={gen}
                  onClick={() => onGenerationFilter(gen)}
                  className={`px-4 py-2 rounded text-black transition-colors
                    ${
                      selectedGenerations.includes(gen)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                >
                  {gen.replace("generation-", "").toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Stats Filter */}
          <div className="flex flex-col gap-2">
            <p className="font-semibold">Stats:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.values(PokemonStatsEnum).map((stat) => (
                <div key={stat} className="flex flex-col gap-1">
                  <label className="text-sm capitalize">
                    {stat.replace("-", " ")}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={statRanges[stat] || 0}
                    onChange={(e) => handleStatRangeChange(e, stat)}
                    className="w-full"
                  />
                  <span className="text-sm text-gray-600">
                    Min: {statRanges[stat] || 0}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Common Abilities Filter */}
          <div className="flex flex-col gap-2">
            <p className="font-semibold">Common Abilities:</p>
            <div className="flex flex-wrap gap-2">
              {Object.values(PokemonCommonAbilitiesEnum).map((ability) => (
                <button
                  key={ability}
                  onClick={() => onAbilityFilter(ability)}
                  className={`px-4 py-2 rounded text-black transition-colors
                    ${
                      selectedAbilities.includes(ability)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                >
                  {ability
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
