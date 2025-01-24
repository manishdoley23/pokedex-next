import { PokemonStat } from "@/lib/types/pokemon";

export function PokemonStats({ stats }: { stats: PokemonStat[] }) {
  return (
    <div className="space-y-4">
      {stats.map((stat) => (
        <div key={stat.stat.name}>
          <div className="flex justify-between mb-1">
            <span className="capitalize">
              {stat.stat.name.replace("-", " ")}
            </span>
            <span>{stat.base_stat}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${(stat.base_stat / 255) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
