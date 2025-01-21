// src/lib/types/pokemon.d.ts

// Generic for any named API resource
interface NamedAPIResource {
  name: string;
  url: string;
}

// Generic for version-specific details
interface VersionDetail<T> {
  version: NamedAPIResource;
  [key: string]: T | NamedAPIResource;
}

// Generic sprite interface
type SpriteSet<T extends string> = {
  [K in T]: string | null;
};

// Base sprite keys
type SpriteKeys =
  | "front_default"
  | "front_shiny"
  | "front_female"
  | "front_shiny_female"
  | "back_default"
  | "back_shiny"
  | "back_female"
  | "back_shiny_female";

type GenerationISpriteKeys =
  | "front_default"
  | "front_shiny"
  | "front_gray"
  | "front_transparent"
  | "back_default"
  | "back_shiny"
  | "back_gray"
  | "back_transparent";

// Sprite types using generics
type BaseSprites = SpriteSet<BasicSpriteKeys>;
type GenerationISprites = SpriteSet<GenerationISpriteKeys>;

// Version interfaces using generics
interface VersionGroupDetail extends VersionDetail<number> {
  level_learned_at: number;
  move_learn_method: NamedAPIResource;
  version_group: NamedAPIResource;
}

interface PokemonAbility {
  is_hidden: boolean;
  slot: number;
  ability: NamedAPIResource;
}

interface PokemonType {
  slot: number;
  type: NamedAPIResource;
}

interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
}

// Generation interface using generics
interface GenerationSprites<T extends Record<string, string | null>> {
  versions: {
    [version: string]: T;
  };
}

type VersionGenerationOne = Pick<
  GenerationISprites,
  "back_default" | "back_gray" | "front_default" | "front_gray"
>;
type VersionGenerationTwo = Pick<
  GenerationISprites,
  "back_default" | "back_shiny" | "front_default" | "front_shiny"
>;

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
    version_details: VersionDetail<number>[];
  }>;
  location_area_encounters: string;
  moves: Array<{
    move: NamedAPIResource;
    version_group_details: VersionGroupDetail[];
  }>;
  species: NamedAPIResource;
  sprites: BaseSprites & {
    other: {
      dream_world: SpriteSet<"front_default" | "front_female">;
      home: SpriteSet<BasicSpriteKeys>;
      "official-artwork": SpriteSet<"front_default" | "front_shiny">;
      showdown: SpriteSet<BasicSpriteKeys>;
    };
    versions: {
      "generation-i": {
        "red-blue": VersionGenerationOne;
        yellow: VersionGenerationOne;
      };
      "generation-ii": {
        crystal: VersionGenerationTwo;
        gold: VersionGenerationTwo;
        silver: VersionGenerationTwo;
      };
      "generation-iii": GenerationSprites<Record<string, string | null>>;
      // ... other generations following the same pattern
    };
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
