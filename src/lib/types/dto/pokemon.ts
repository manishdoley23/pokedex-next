import { PokemonApiResponse } from "../pokemon";

export type PokemonListServiceDTO = {
  pokemons: PokemonApiResponse[];
  nextOffset: number;
  hasMore: boolean;
};
