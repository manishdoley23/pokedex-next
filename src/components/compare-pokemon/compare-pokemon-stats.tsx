import { PokemonApiResponse } from "@/lib/types/pokemon";
import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

export function ComparePokemonStats({
  pokemon,
}: {
  pokemon: PokemonApiResponse[];
}) {
  if (pokemon.length < 2) return null;

  const statsData = pokemon[0].stats.map((stat, index) => {
    const statData: Record<string, string | number> = { stat: stat.stat.name };
    pokemon.forEach((p) => {
      statData[p.name] = p.stats[index].base_stat;
    });
    return statData;
  });

  const colors = [
    { stroke: "#8884d8", fill: "#8884d8" },
    { stroke: "#82ca9d", fill: "#82ca9d" },
    { stroke: "#ffc658", fill: "#ffc658" },
    { stroke: "#ff7300", fill: "#ff7300" },
    { stroke: "#0088fe", fill: "#0088fe" },
    { stroke: "#00c49f", fill: "#00c49f" },
  ];

  return (
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={statsData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="stat" />
          <PolarRadiusAxis />
          {pokemon.map((p, index) => (
            <Radar
              key={p.id}
              name={p.name}
              dataKey={p.name}
              stroke={colors[index].stroke}
              fill={colors[index].fill}
              fillOpacity={0.5}
            />
          ))}
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
