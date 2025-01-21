import type { Pokemon } from "@/types/pokemon";

export function transformPokemonResponse(data: any): Pokemon {
  return {
    id: data.id,
    name: data.name,
    sprites: {
      front_default: data.sprites.front_default,
    },
    types: data.types,
  };
}
