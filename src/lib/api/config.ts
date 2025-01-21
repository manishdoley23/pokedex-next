export const BASE_URL = "https://pokeapi.co/api/v2/";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export async function _fetch(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new ApiError(response.status, `API Error: ${response.status}`);
  }
  return response.json();
}
