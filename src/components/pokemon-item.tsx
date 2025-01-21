import Image from "next/image";
import { PokemonApiResponse } from "@/lib/types/pokemon";

export default function PokemonItem({
  isLastPokemon,
  pokemon,
  lastPokemonRef,
}: {
  pokemon: PokemonApiResponse;
  isLastPokemon: boolean;
  lastPokemonRef: (node: HTMLDivElement | null) => void;
}) {
  return (
    <div
      key={pokemon.id}
      ref={isLastPokemon ? lastPokemonRef : null}
      className="border rounded-lg p-4 flex flex-col items-center hover:shadow-lg transition-shadow"
    >
      <div className="relative w-32 h-32">
        <Image
          src={pokemon.sprites.front_default ?? ""}
          alt={pokemon.name}
          fill
          className="object-contain"
        />
      </div>
      <h2 className="mt-2 text-xl capitalize">{pokemon.name}</h2>
      <div className="flex gap-2 mt-2">
        {pokemon.types.map((type) => (
          <span
            key={type.type.name}
            className="px-2 py-1 bg-gray-200 rounded text-sm text-black"
          >
            {type.type.name}
          </span>
        ))}
      </div>
    </div>
  );
}
