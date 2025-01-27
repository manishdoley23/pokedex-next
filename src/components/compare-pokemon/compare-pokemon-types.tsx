import { PokemonApiResponse } from "@/lib/types/pokemon";
import { calculateTypeEffectiveness } from "@/lib/utils/pokemon-utils";
import { TypeBadge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useGetPokemonTypeDetails } from "@/lib/hooks/use-pokemon-hooks";
import { Loader } from "../ui/loader";
import { TypeApiResponse } from "@/lib/types/types";

export function ComparePokemonTypes({
  pokemon,
}: {
  pokemon: PokemonApiResponse[];
}) {
  const allPokemonTypes = pokemon.reduce((types, p) => {
    return [...types, ...p.types];
  }, [] as PokemonApiResponse["types"]);

  const typeDetails = useGetPokemonTypeDetails(allPokemonTypes);

  const isLoading = typeDetails.some((detail) => detail.isLoading);
  if (isLoading)
    return (
      <div className="w-full flex justify-center">
        <Loader />
      </div>
    );

  const typeDataMap = typeDetails.reduce((map, detail) => {
    if (detail.data) {
      map[detail.data.name] = detail.data;
    }
    return map;
  }, {} as Record<string, TypeApiResponse>);

  const pokemonEffectiveness = pokemon.map((p) => {
    const pokemonTypeData = p.types
      .map((t) => typeDataMap[t.type.name])
      .filter(Boolean);
    const { weaknesses, resistances, immunities } =
      calculateTypeEffectiveness(pokemonTypeData);

    return {
      name: p.name,
      types: p.types.map((t) => t.type.name),
      weaknesses: Object.entries(weaknesses).map(([type, value]) => ({
        type,
        multiplier: value,
      })),
      resistances: Object.entries(resistances).map(([type, value]) => ({
        type,
        multiplier: value,
      })),
      immunities,
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Type Effectiveness Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6">
          {/* Pokemon Type Tables */}
          {pokemonEffectiveness.map((p, idx) => (
            <div key={idx} className="space-y-4">
              <h3 className="text-lg font-semibold capitalize">{p.name}</h3>

              {/* Pokemon's Types */}
              <div className="flex gap-2 mb-4">
                {p.types.map((type) => (
                  <TypeBadge key={type} type={type} />
                ))}
              </div>

              {/* Type Effectiveness Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* Weaknesses */}
                {p.weaknesses.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Weaknesses</h4>
                    <div className="flex flex-wrap gap-2">
                      {p.weaknesses.map(({ type, multiplier }) => (
                        <div key={type} className="flex items-center gap-1">
                          <TypeBadge type={type} />
                          <span className="text-xs font-medium">
                            {multiplier}x
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Resistances */}
                {p.resistances.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Resistances</h4>
                    <div className="flex flex-wrap gap-2">
                      {p.resistances.map(({ type, multiplier }) => (
                        <div key={type} className="flex items-center gap-1">
                          <TypeBadge type={type} />
                          <span className="text-xs font-medium">
                            {multiplier}x
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Immunities */}
                {p.immunities.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Immunities</h4>
                    <div className="flex flex-wrap gap-2">
                      {p.immunities.map((type) => (
                        <div key={type} className="flex items-center gap-1">
                          <TypeBadge type={type} />
                          <span className="text-xs font-medium">0x</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
