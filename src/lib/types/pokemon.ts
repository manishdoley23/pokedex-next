import { BaseSprites, FrontSetSprites, NamedAPIResource } from "./common";
import { PokemonType } from "./pokemon-types";
import { SpriteVersions } from "./sprites";

interface VersionDetail {
  rarity: number;
  version: NamedAPIResource;
}

interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: NamedAPIResource;
  version_group: NamedAPIResource;
}

interface PokemonAbility {
  is_hidden: boolean;
  slot: number;
  ability: NamedAPIResource;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
}

export interface PokemonListApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResource[];
}

export interface PokemonApiResponse {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: PokemonAbility[];
  forms: NamedAPIResource[];
  game_indices: Array<{
    game_index: number;
    version: NamedAPIResource;
  }>;
  held_items: Array<{
    item: NamedAPIResource;
    version_details: VersionDetail[];
  }>;
  location_area_encounters: string;
  moves: Array<{
    move: NamedAPIResource;
    version_group_details: VersionGroupDetail[];
  }>;
  species: NamedAPIResource;
  sprites: BaseSprites & {
    other: {
      dream_world: Pick<FrontSetSprites, "front_default" | "front_female">;
      home: FrontSetSprites;
      "official-artwork": Pick<
        FrontSetSprites,
        "front_default" | "front_shiny"
      >;
      showdown: BaseSprites;
    };
    versions: SpriteVersions;
  };
  cries: {
    latest: string;
    legacy: string;
  };
  stats: PokemonStat[];
  types: PokemonType[];
  past_types: Array<{
    generation: NamedAPIResource;
    types: PokemonType[];
  }>;
}
