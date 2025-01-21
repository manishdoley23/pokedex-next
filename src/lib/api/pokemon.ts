import { BASE_URL, fetchWithError } from "./config";

export async function getPokemonList({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}): Promise<unknown> {
  try {
    return await fetchWithError(
      `${BASE_URL}pokemon/?limit=${limit}&offset=${offset}`
    );
  } catch (error) {
    console.error("Error fetching Pokemon:", error);
    throw error;
  }
}

export async function getPokemonDetails({ url }: { url: string }) {
  try {
    return await fetchWithError(url);
  } catch (error) {
    console.error("Error fetching Pokemon details:", error);
    throw error;
  }
}
