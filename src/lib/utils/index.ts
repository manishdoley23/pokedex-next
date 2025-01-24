import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { PokemonTypesEnum, TYPE_COLORS } from "./constants";

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
