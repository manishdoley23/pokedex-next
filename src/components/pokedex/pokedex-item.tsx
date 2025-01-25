import Image from "next/image";
import { PokemonApiResponse } from "@/lib/types/pokemon";
import { Draggable } from "../ui/draggable";
import { cn } from "@/lib/utils";
import { TypeBadge } from "../ui/badge";

export default function PokedexItem({
  isLastPokemon,
  pokemon,
  lastPokemonRef,
  isSelected = false,
  className = "",
  onClick,
  isCompareView = false, // Add new prop to identify comparison view
}: {
  pokemon: PokemonApiResponse;
  isLastPokemon?: boolean;
  lastPokemonRef?: (node: HTMLDivElement | null) => void;
  isSelected?: boolean;
  className?: string;
  onClick?: () => void;
  isCompareView?: boolean;
}) {
  const content = (
    <div
      ref={isLastPokemon ? lastPokemonRef : null}
      onClick={onClick}
      className={cn(
        "bg-white border rounded-lg p-2 flex flex-col items-center transition-all",
        "max-w-[200px] mx-auto relative",
        isCompareView
          ? "hover:shadow-lg"
          : "cursor-grab active:cursor-grabbing",
        isSelected && "opacity-50 cursor-not-allowed pointer-events-none",
        !isSelected && "hover:scale-105",
        className
      )}
    >
      {pokemon.sprites.front_default && (
        <div className="relative w-20 h-20">
          <Image
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain"
          />
        </div>
      )}
      <h2 className="mt-1 text-base capitalize truncate w-full text-center">
        {pokemon.name}
      </h2>
      <div className="flex gap-1 mt-1 flex-wrap justify-center">
        {pokemon.types.map((type) => (
          <TypeBadge type={type.type.name} key={type.type.name} />
        ))}
      </div>
      {isCompareView && isSelected && (
        <div className="absolute inset-0 bg-gray-900/10 flex items-center justify-center rounded-lg">
          <span className="text-sm font-medium text-gray-900">
            Selected for comparison
          </span>
        </div>
      )}
    </div>
  );

  // Only wrap with Draggable if not in compare view
  return isCompareView ? (
    content
  ) : (
    <Draggable id={`pokedex-${pokemon.id}`} pokemon={pokemon}>
      {content}
    </Draggable>
  );
}
