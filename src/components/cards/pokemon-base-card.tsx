import { PokemonApiResponse } from "@/lib/types/pokemon";
import Image from "next/image";
import { TypeBadge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface BasePokemonCardProps {
  pokemon: PokemonApiResponse;
  onClick?: () => void;
  className?: string;
  overlay?: React.ReactNode;
  lastPokemonRef?: (node: HTMLDivElement | null) => void;
  isLastPokemon?: boolean;
}

export function PokemonBaseCard({
  pokemon,
  onClick,
  className,
  overlay,
  lastPokemonRef,
  isLastPokemon,
}: BasePokemonCardProps) {
  return (
    <div
      ref={isLastPokemon ? lastPokemonRef : null}
      onClick={onClick}
      className={cn(
        "bg-white border rounded-lg p-2 flex flex-col items-center transition-all",
        "max-w-[200px] mx-auto relative",
        "hover:scale-105",
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
      {overlay}
    </div>
  );
}
