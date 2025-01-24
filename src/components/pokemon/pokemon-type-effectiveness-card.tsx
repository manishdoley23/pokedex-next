export function PokemonTypeEffectiveness({ types }: { types: PokemonType[] }) {
  // Implement type effectiveness calculation
  const effectiveness = calculateTypeEffectiveness(types);

  return (
    <div className="grid grid-cols-2 gap-4">
      {Object.entries(effectiveness).map(([type, multiplier]) => (
        <div key={type} className="flex justify-between items-center">
          <span className="capitalize">{type}</span>
          <span className={getEffectivenessColor(multiplier)}>
            ×{multiplier}
          </span>
        </div>
      ))}
    </div>
  );
}
