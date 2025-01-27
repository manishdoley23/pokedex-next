import { TypeBadge } from "../ui/badge";
import { useTeamStore } from "@/lib/store/team-store";
import { PokemonBaseCard } from "../pokemon/cards/pokemon-base-card";
import { analyzeTeam } from "@/lib/utils/pokemon-team-utils";

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
                <PokemonBaseCard pokemon={pokemon} />
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}
