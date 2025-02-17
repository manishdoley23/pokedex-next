import { NamedAPIResource } from "./common";

interface TypeRelations {
  double_damage_from: { name: string; url: string }[];
  double_damage_to: { name: string; url: string }[];
  half_damage_from: { name: string; url: string }[];
  half_damage_to: { name: string; url: string }[];
  no_damage_from: { name: string; url: string }[];
  no_damage_to: { name: string; url: string }[];
}

export interface PokemonType {
  slot: number;
  type: NamedAPIResource;
}

export interface TypeApiResponse {
  id: number;
  name: string;
  damage_relations: TypeRelations;
}
