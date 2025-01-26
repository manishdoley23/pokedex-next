import { PokemonApiResponse } from "@/lib/types/pokemon";
import { useRouter } from "next/navigation";
import { PokemonBaseCard } from "./pokemon-base-card";

export function PokemonPokedexCard({
  pokemon,
  lastPokemonRef,
  isLastPokemon,
}: {
  pokemon: PokemonApiResponse;
  lastPokemonRef?: (node: HTMLDivElement | null) => void;
  isLastPokemon?: boolean;
}) {
  const router = useRouter();

  return (
    <PokemonBaseCard
      pokemon={pokemon}
      onClick={() => router.push(`/pokedex/${pokemon.id}`)}
      className="cursor-pointer hover:shadow-md"
      lastPokemonRef={lastPokemonRef}
      isLastPokemon={isLastPokemon}
    />
  );
}
