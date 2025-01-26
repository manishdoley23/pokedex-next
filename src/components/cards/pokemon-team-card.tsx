import { Draggable } from "@/components/ui/draggable";
import { PokemonApiResponse } from "@/lib/types/pokemon";
import { PokemonBaseCard } from "./pokemon-base-card";
import { cn } from "@/lib/utils";

export function PokemonTeamCard({
  pokemon,
  lastPokemonRef,
  isLastPokemon,
  isSelected,
}: {
  pokemon: PokemonApiResponse;
  lastPokemonRef?: (node: HTMLDivElement | null) => void;
  isLastPokemon?: boolean;
  isSelected?: boolean;
}) {
  const content = (
    <PokemonBaseCard
      pokemon={pokemon}
      className={cn(
        "cursor-grab active:cursor-grabbing",
        isSelected && "border-green-500 shadow-md opacity-50"
      )}
      overlay={
        isSelected && (
          <div className="absolute inset-0 bg-green-500/10 flex items-center justify-center rounded-lg">
            <span className="text-sm font-medium text-green-700 bg-white px-2 py-1 rounded">
              In Team
            </span>
          </div>
        )
      }
      lastPokemonRef={lastPokemonRef}
      isLastPokemon={isLastPokemon}
    />
  );

  return isSelected ? (
    content
  ) : (
    <Draggable id={`pokedex-${pokemon.id}`} pokemon={pokemon}>
      {content}
    </Draggable>
  );
}
