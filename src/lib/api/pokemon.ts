import { PokemonApiResponse, PokemonListApiResponse } from "../types/pokemon";
import { BASE_URL, _fetch } from "./config";

export async function getPokemonDetails(
  url: string
): Promise<PokemonApiResponse> {
  try {
    return await _fetch(url);
  } catch (error) {
    console.error("Error fetching Pokemon details:", error);
    throw error;
  }
}

export async function getPokemonList(
  limit: number,
  offset: number
): Promise<PokemonListApiResponse> {
  try {
    return await _fetch(`${BASE_URL}pokemon/?limit=${limit}&offset=${offset}`);
  } catch (error) {
    console.error("Error fetching Pokemon:", error);
    throw error;
  }
}

export async function getPokemonById(id: number): Promise<PokemonApiResponse> {
  try {
    return await _fetch(`${BASE_URL}pokemon/${id}`);
  } catch (error) {
    console.error("Error fetching Pokemon details:", error);
    throw error;
  }
}

export async function getEvolutionChain(
  id: number
): Promise<PokemonEvolutionChainApiResponse> {
  try {
    return await _fetch(`${BASE_URL}evolution-chain/${id}`);
  } catch (error) {
    console.error("Error fetching evolution chain:", error);
    throw error;
  }
}
