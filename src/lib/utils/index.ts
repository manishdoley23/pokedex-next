import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { PokemonTypesEnum, TYPE_COLORS } from "./constants";
import { Team } from "../store/team-store";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTypeColor(type: string): string {
  return TYPE_COLORS[type as PokemonTypesEnum] || "#777777";
}

const LIGHT_TYPES = [
  PokemonTypesEnum.Electric,
  PokemonTypesEnum.Fairy,
  PokemonTypesEnum.Ground,
  PokemonTypesEnum.Ice,
];
export function getTypeTextColor(type: string): string {
  return LIGHT_TYPES.includes(type as PokemonTypesEnum) ? "#000000" : "#FFFFFF";
}
export function getPokemonIdFromUrl(url: string): number {
  const matches = url.match(/\/(\d+)\//);
  return matches ? parseInt(matches[1]) : 1;
}
export function formatName(name: string): string {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
export const getSelectedPokemonIds = (team: Team | null) => {
  if (!team) return new Set<number>();
  return new Set(team.pokemon.filter((p) => p !== null).map((p) => p!.id));
};
