import { TypeBadge } from "../ui/badge";
import PokedexItem from "../pokedex/pokedex-item";
import { Team, useTeamStore } from "@/lib/store/team-store";

interface TypeEffectiveness {
  [key: string]: number;
}

function analyzeTeam(team: Team) {
  const typeChart: {
    [key: string]: { weakTo: string[]; resistantTo: string[] };
  } = {
    normal: { weakTo: ["fighting"], resistantTo: [] },
    fire: {
      weakTo: ["water", "ground", "rock"],
      resistantTo: ["fire", "grass", "ice", "bug", "steel"],
    },
    water: {
      weakTo: ["electric", "grass"],
      resistantTo: ["fire", "water", "ice", "steel"],
    },
    // TODO: Add other types
  };

  const teamTypes = new Set<string>();
  const effectiveness: TypeEffectiveness = {};

  // Initialize effectiveness for all types
  Object.keys(typeChart).forEach((type) => {
    effectiveness[type] = 1;
  });

  // Analyze each Pokemon
  team.pokemon.forEach((pokemon) => {
    if (!pokemon) return;

    // Add to team type coverage
    pokemon.types.forEach((t) => teamTypes.add(t.type.name));

    // Calculate effectiveness
    pokemon.types.forEach((t) => {
      const type = t.type.name;
      if (typeChart[type]) {
        typeChart[type].weakTo.forEach((weakType) => {
          effectiveness[weakType] = (effectiveness[weakType] || 1) * 2;
        });
        typeChart[type].resistantTo.forEach((resistType) => {
          effectiveness[resistType] = (effectiveness[resistType] || 1) * 0.5;
        });
      }
    });
  });

  // Find weaknesses (types that deal >1x damage)
  const weaknesses = Object.entries(effectiveness)
    .filter(([, value]) => value > 1)
    .map(([type]) => type);

  return {
    coverage: Array.from(teamTypes),
    weaknesses,
  };
}

export function TeamAnalysis() {
  const team = useTeamStore((state) => state.activeTeam);

  if (!team) return <div>No teams created</div>;

  const analysis = analyzeTeam(team);

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-black">Team Analysis</h3>

      {/* Type Coverage */}
      <div>
        <h4 className="text-lg font-medium mb-2">Type Coverage</h4>
        <div className="flex flex-wrap gap-2">
          {analysis.coverage.map((type) => (
            <TypeBadge key={type} type={type} />
          ))}
        </div>
      </div>

      {/* Weaknesses */}
      <div>
        <h4 className="text-lg font-medium mb-2">Team Weaknesses</h4>
        <div className="flex flex-wrap gap-2">
          {analysis.weaknesses.map((type) => (
            <TypeBadge key={type} type={type} />
          ))}
        </div>
      </div>

      {/* Pokemon List */}
      <div>
        <h4 className="text-lg font-medium mb-2">Team Members</h4>
        <div className="grid grid-cols-3 gap-4">
          {team.pokemon.map((pokemon, index) =>
            pokemon ? (
              <div key={index} className="p-4 border rounded-lg">
                <PokedexItem pokemon={pokemon} />
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}
