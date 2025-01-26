type SpriteSet<T extends string> = {
  [K in T]: string | null;
};

type BaseSpriteKeys =
  | "front_default"
  | "front_shiny"
  | "front_female"
  | "front_shiny_female"
  | "back_default"
  | "back_shiny"
  | "back_female"
  | "back_shiny_female";

type SpriteKeys =
  | "front_default"
  | "front_shiny"
  | "front_female"
  | "front_shiny_female"
  | "front_gray"
  | "back_default"
  | "back_gray"
  | "back_shiny"
  | "back_female"
  | "back_shiny_female";

export type FullSetSprites = Pick<
  GenerationSprites,
  | "back_default"
  | "back_female"
  | "back_shiny"
  | "back_shiny_female"
  | "front_default"
  | "front_female"
  | "front_shiny"
  | "front_shiny_female"
>;

export type FrontSetSprites = Pick<
  GenerationSprites,
  "front_default" | "front_female" | "front_shiny" | "front_shiny_female"
>;
export type BaseSprites = SpriteSet<BaseSpriteKeys>;
export type GenerationSprites = SpriteSet<SpriteKeys>;
export type NamedAPIResource = {
  name: string;
  url: string;
};
export type PokemonCardType = "team" | "compare" | "pokedex";
