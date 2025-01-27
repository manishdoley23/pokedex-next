import { PokemonApiResponse } from "@/lib/types/pokemon";
import { PokemonMove, VersionGroupDetail } from "../types/pokemon";
import { TypeApiResponse } from "../types/types";

export interface EffectivenessMap {
  [key: string]: number;
}

/**
 * Calculates type effectiveness including weaknesses, resistances and immunities
 */
export function calculateTypeEffectiveness(types: TypeApiResponse[]) {
  const weaknesses: EffectivenessMap = {};
  const resistances: EffectivenessMap = {};
  const immunities: string[] = [];

  types.forEach((type) => {
    type.damage_relations.double_damage_from.forEach((relation) => {
      weaknesses[relation.name] = (weaknesses[relation.name] || 1) * 2;
    });

    type.damage_relations.half_damage_from.forEach((relation) => {
      resistances[relation.name] = (resistances[relation.name] || 1) * 0.5;
    });

    type.damage_relations.no_damage_from.forEach((relation) => {
      immunities.push(relation.name);
    });
  });

  Object.keys(weaknesses).forEach((type) => {
    if (resistances[type]) {
      const effectiveness = weaknesses[type] * resistances[type];
      if (effectiveness === 1) {
        delete weaknesses[type];
        delete resistances[type];
      } else if (effectiveness > 1) {
        weaknesses[type] = effectiveness;
        delete resistances[type];
      } else {
        resistances[type] = effectiveness;
        delete weaknesses[type];
      }
    }
  });

  immunities.forEach((type) => {
    delete weaknesses[type];
    delete resistances[type];
  });

  return { weaknesses, resistances, immunities };
}

/**
 * Groups moves by their learning method
 */
export function groupMovesByMethod(moves: PokemonMove[]) {
  return moves.reduce((acc, move) => {
    const detail = move.version_group_details[0];
    const method = detail.move_learn_method.name;
    if (!acc[method]) {
      acc[method] = [];
    }
    acc[method].push({ move: move.move.name, detail });
    return acc;
  }, {} as Record<string, Array<{ move: string; detail: VersionGroupDetail }>>);
}

/**
 * Sorts moves by level learned
 */
export function sortMovesByLevel(
  a: { detail: VersionGroupDetail },
  b: { detail: VersionGroupDetail }
) {
  return a.detail.level_learned_at - b.detail.level_learned_at;
}

/**
 * Filter pokemon by name search term
 */
export const filterPokemonBySearch = (
  pokemon: PokemonApiResponse,
  searchTerm: string
): boolean => {
  if (!searchTerm) return true;
  return pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
};

/**
 * Filter pokemon by selected types
 */
export const filterPokemonByType = (
  pokemon: PokemonApiResponse,
  selectedTypes: string[]
): boolean => {
  if (selectedTypes.length === 0) return true;
  return pokemon.types.some((t) => selectedTypes.includes(t.type.name));
};

/**
 * Filter pokemon by game generation
 */
export const filterPokemonByGeneration = (
  pokemon: PokemonApiResponse,
  selectedGenerations: string[]
): boolean => {
  if (selectedGenerations.length === 0) return true;
  return pokemon.past_types.some((pt) =>
    selectedGenerations.includes(pt.generation.name)
  );
};

/**
 * Filter pokemon by their abilities
 */
export const filterPokemonByAbility = (
  pokemon: PokemonApiResponse,
  selectedAbilities: string[]
): boolean => {
  if (selectedAbilities.length === 0) return true;
  return pokemon.abilities.some((a) =>
    selectedAbilities.includes(a.ability.name)
  );
};

/**
 * Filter pokemon by minimum stat requirements
 */
export const filterPokemonByStats = (
  pokemon: PokemonApiResponse,
  statRanges: Record<string, number>
): boolean => {
  return Object.entries(statRanges).every(
    ([stat, min]) =>
      (pokemon.stats.find((s) => s.stat.name === stat)?.base_stat || 0) >= min
  );
};

/**
 * Apply all filters to a pokemon
 */
export const filterPokemon = (
  pokemon: PokemonApiResponse,
  filters: {
    searchTerm: string;
    selectedTypes: string[];
    selectedGenerations: string[];
    selectedAbilities: string[];
    statRanges: Record<string, number>;
  }
): boolean => {
  const {
    searchTerm,
    selectedTypes,
    selectedGenerations,
    selectedAbilities,
    statRanges,
  } = filters;

  return (
    filterPokemonBySearch(pokemon, searchTerm) &&
    filterPokemonByType(pokemon, selectedTypes) &&
    filterPokemonByGeneration(pokemon, selectedGenerations) &&
    filterPokemonByAbility(pokemon, selectedAbilities) &&
    filterPokemonByStats(pokemon, statRanges)
  );
};

/**
 * Returns stat rating based on base value
 */
export function getStatRating(value: number): string {
  if (value >= 150) return "Outstanding";
  if (value >= 90) return "Good";
  if (value >= 60) return "Average";
  return "Below Average";
}
