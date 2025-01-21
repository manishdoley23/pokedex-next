import { getPokemonList, getPokemonDetails } from "@/lib/api/pokemon";

export async function getPaginatedPokemon(limit: number, offset: number) {
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
