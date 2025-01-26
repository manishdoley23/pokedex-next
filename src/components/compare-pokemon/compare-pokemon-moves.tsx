import { PokemonApiResponse } from "@/lib/types/pokemon";

export function ComparePokemonMoves({
  pokemon,
}: {
  pokemon: PokemonApiResponse[];
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {pokemon.map((p) => (
        <div key={p.id} className="border rounded p-4">
          <h5 className="font-medium capitalize mb-2">{p.name}&apos;s Moves</h5>
          <div className="max-h-60 overflow-y-auto">
            {p.moves.map((move) => (
              <div key={move.move.name} className="text-sm py-1 capitalize">
                {move.move.name.replace("-", " ")}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
