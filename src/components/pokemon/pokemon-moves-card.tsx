export function PokemonMoves({ moves }: { moves: PokemonMove[] }) {
  return (
    <div className="space-y-2">
      {moves.map((move) => (
        <div
          key={move.move.name}
          className="flex justify-between items-center p-2 hover:bg-gray-50"
        >
          <span className="capitalize">{move.move.name.replace("-", " ")}</span>
          <span className="text-sm text-gray-500">
            Level {move.version_group_details[0].level_learned_at}
          </span>
        </div>
      ))}
    </div>
  );
}
