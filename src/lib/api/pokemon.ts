import { EvolutionChainApiResponse } from "../types/evolution";
import { PokemonApiResponse, PokemonListApiResponse } from "../types/pokemon";
import { TypeApiResponse } from "../types/types";
import { BASE_URL, _fetch } from "./config";

/**
 * Fetches Pokemon details by URL
 */
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

/**
 * Fetches paginated Pokemon list
 */
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

/**
 * Fetches Pokemon details by ID
 */
export async function getPokemonById(id: number): Promise<PokemonApiResponse> {
  try {
    return await _fetch(`${BASE_URL}pokemon/${id}`);
  } catch (error) {
    console.error("Error fetching Pokemon details:", error);
    throw error;
  }
}

/**
 * Fetches evolution chain by ID
 */
export async function getEvolutionChain(
  evolutionChainId: number
): Promise<EvolutionChainApiResponse> {
  try {
    return await _fetch(`${BASE_URL}evolution-chain/${evolutionChainId}`);
  } catch (error) {
    console.error("Error fetching evolution chain:", error);
    throw error;
  }
}

/**
 * Fetches type data by ID
 */
export async function getTypesDataFromId(
  typeId: number
): Promise<TypeApiResponse> {
  try {
    return await _fetch(`${BASE_URL}type/${typeId}`);
  } catch (error) {
    console.error("Error fetching type data:", error);
    throw error;
  }
}

/**
 * Gets evolution chain ID from species ID
 */
export async function getEvolutionChainIdFromSpecies(
  speciesId: number
): Promise<number> {
  try {
    const speciesData = await _fetch(`${BASE_URL}pokemon-species/${speciesId}`);
    const evolutionChainId = speciesData.evolution_chain.url
      .split("/")
      .slice(-2, -1)[0];
    return parseInt(evolutionChainId);
  } catch (error) {
    console.error("Error fetching species data:", error);
    throw error;
  }
}
