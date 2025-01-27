import { Team } from "@/lib/store/team-store";
import { TypeChart } from "@/lib/utils/constants";

export interface TypeEffectiveness {
  [key: string]: number;
}

/**
 * Analyzes a team's type coverage and weaknesses
 */
export function analyzeTeam(team: Team) {
  const teamTypes = new Set<string>();
  const effectiveness: TypeEffectiveness = {};

  Object.keys(TypeChart).forEach((type) => {
    effectiveness[type] = 1;
  });

  team.pokemon.forEach((pokemon) => {
    if (!pokemon) return;

    pokemon.types.forEach((t) => teamTypes.add(t.type.name));

    pokemon.types.forEach((t) => {
      const type = t.type.name;
      if (TypeChart[type]) {
        TypeChart[type].weakTo.forEach((weakType) => {
          effectiveness[weakType] = (effectiveness[weakType] || 1) * 2;
        });
        TypeChart[type].resistantTo.forEach((resistType) => {
          effectiveness[resistType] = (effectiveness[resistType] || 1) * 0.5;
        });
      }
    });
  });

  const weaknesses = Object.entries(effectiveness)
    .filter(([, value]) => value > 1)
    .map(([type]) => type);

  return {
    coverage: Array.from(teamTypes),
    weaknesses,
    effectiveness,
  };
}
