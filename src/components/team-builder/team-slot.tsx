import { PlusCircle, X } from "lucide-react";
import { Button } from "../ui/button";
import { Droppable } from "../ui/droppable";
import { cn } from "@/lib/utils";
import { PokemonApiResponse } from "@/lib/types/pokemon";
import { PokemonBaseCard } from "../pokemon/cards/pokemon-base-card";

type TeamSlotProps = {
  index: number;
  pokemon: PokemonApiResponse | null;
  onRemove: (index: number) => void;
  onSlotClick: (index: number) => void;
};
export function TeamSlot({
  index,
  pokemon,
  onRemove,
  onSlotClick,
}: TeamSlotProps) {
  return (
    <Droppable id={index.toString()}>
      <div
        className={cn(
          "aspect-square rounded-lg border-2 transition-all duration-200 relative",
          pokemon ? "border-solid" : "border-dashed",
          "hover:border-primary"
        )}
      >
        {pokemon ? (
          <div className="h-full w-full group/item">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1 right-1 z-50 invisible group-hover/item:visible transition-all duration-200"
              onClick={(e) => {
                e.stopPropagation();
                onRemove(index);
              }}
            >
              <X className="w-4 h-4" />
            </Button>
            <div
              className="h-full w-full group-hover/item:opacity-50 group-hover/item:pointer-events-none"
              onClick={() => onRemove(index)}
            >
              <PokemonBaseCard
                pokemon={pokemon}
                className="h-full border-0 hover:scale-100 cursor-pointer"
              />
            </div>
          </div>
        ) : (
          <div
            className="flex items-center justify-center h-full cursor-pointer"
            onClick={() => onSlotClick(index)}
          >
            <PlusCircle className="w-8 h-8 text-gray-400" />
          </div>
        )}
      </div>
    </Droppable>
  );
}
