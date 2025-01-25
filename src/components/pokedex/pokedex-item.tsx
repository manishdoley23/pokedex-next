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
}: {
  pokemon: PokemonApiResponse;
  isLastPokemon?: boolean;
  lastPokemonRef?: (node: HTMLDivElement | null) => void;
  isSelected?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Draggable
      id={`pokedex-${pokemon.id}`} // Add context prefix
      pokemon={pokemon}
    >
      <div
        ref={isLastPokemon ? lastPokemonRef : null}
        onClick={onClick}
        className={cn(
          "bg-white border rounded-lg p-2 flex flex-col items-center hover:shadow-lg transition-all",
          "max-w-[200px] mx-auto z-50 relative",
          isSelected && "opacity-50 cursor-not-allowed",
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
      </div>
    </Draggable>
  );
}
