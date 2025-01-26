import { useCompare } from "@/lib/hooks/use-pokemon-hooks";
import { PokemonApiResponse } from "@/lib/types/pokemon";
import { PokemonBaseCard } from "./pokemon-base-card";
import { cn } from "@/lib/utils";

export function PokemonCompareCard({
  pokemon,
  lastPokemonRef,
  isLastPokemon,
}: {
  pokemon: PokemonApiResponse;
  lastPokemonRef?: (node: HTMLDivElement | null) => void;
  isLastPokemon?: boolean;
}) {
  const { compareList, addToCompare, removeFromCompare, maxSelection } =
    useCompare();
  const isInCompare = compareList.some((p) => p.id === pokemon.id);

  const handleCompareToggle = () => {
    if (isInCompare) {
      removeFromCompare(pokemon.id);
    } else if (compareList.length < maxSelection) {
      addToCompare(pokemon);
    }
  };

  const compareOverlay = isInCompare ? (
    <div className="absolute inset-0 bg-blue-500/10 flex items-center justify-center rounded-lg">
      <span className="text-sm font-medium text-blue-700 bg-white px-2 py-1 rounded">
        Selected for Compare
      </span>
    </div>
  ) : null;

  return (
    <PokemonBaseCard
      pokemon={pokemon}
      onClick={handleCompareToggle}
      className={cn(
        isInCompare ? "border-blue-500 shadow-md" : "",
        compareList.length >= maxSelection && !isInCompare
          ? "opacity-50 cursor-not-allowed"
          : "cursor-pointer"
      )}
      overlay={compareOverlay}
      lastPokemonRef={lastPokemonRef}
      isLastPokemon={isLastPokemon}
    />
  );
}
