import { getPokemonList, getPokemonDetails } from "@/lib/api/pokemon";
import { PokemonListServiceDTO } from "@/lib/types/dto/pokemon";

export async function getPaginatedPokemonWithDetails(
  limit: number,
  offset: number
): Promise<PokemonListServiceDTO> {
  const listData = await getPokemonList(limit, offset);

  const details = await Promise.all(
    listData.results.map((pokemon) => getPokemonDetails(pokemon.url))
  );

  return {
    pokemons: details,
    nextOffset: offset + limit,
    hasMore: listData.next !== null,
  };
}
