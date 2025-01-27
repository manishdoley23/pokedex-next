export enum VersionGenerationEnum {
  I = "generation-i",
  II = "generation-ii",
  III = "generation-iii",
  IV = "generation-iv",
  V = "generation-v",
  VI = "generation-vi",
  VII = "generation-vii",
  VIII = "generation-viii",
}

export enum PokemonStatsEnum {
  Hp = "hp",
  Attack = "attack",
  Defense = "defense",
  SpecialAttack = "special-attack",
  SpecialDefence = "special-defense",
  Speed = "speed",
}

export enum PokemonCommonAbilitiesEnum {
  Static = "static",
  KeenEye = "keen-eye",
  Sturdy = "sturdy",
  RockHead = "rock-head",
  Intimidate = "intimidate",
  ShedSkin = "shed-skin",
  Chlorophyll = "chlorophyll",
  SwiftSwim = "swift-swim",
  Levitate = "levitate",
}

export enum PokemonTypesEnum {
  Normal = "normal",
  Fire = "fire",
  Water = "water",
  Electric = "electric",
  Grass = "grass",
  Ice = "ice",
  Fighting = "fighting",
  Poison = "poison",
  Ground = "ground",
  Flying = "flying",
  Psychic = "psychic",
  Bug = "bug",
  Rock = "rock",
  Ghost = "ghost",
  Dragon = "dragon",
  Dark = "dark",
  Steel = "steel",
  Fairy = "fairy",
}

export enum VersionGenerationGroupEnum {
  RedBlue = "red-blue",
  Yellow = "yellow",
  Crystal = "crystal",
  Gold = "gold",
  Silver = "silver",
  Emerald = "emerald",
  FireredLeafgreen = "firered-leafgreen",
  RubySapphire = "ruby-sapphire",
  DiamondPearl = "diamond-pearl",
  HeartgoldSoulsilver = "heartgold-soulsilver",
  Platinum = "platinum",
  BlackWhite = "black-white",
  Animated = "animated",
  OmegarubyAlphasapphire = "omegaruby-alphasapphire",
  XY = "x-y",
  Icons = "icons",
  UltraSunUltraMoon = "ultra-sun-ultra-moon",
}

export const INITIAL_FETCH_LIMIT = 50;
export const MAX_STAT_VALUE = 255;
export const TYPE_COLORS: Record<PokemonTypesEnum, string> = {
  [PokemonTypesEnum.Normal]: "#A8A878",
  [PokemonTypesEnum.Fire]: "#F08030",
  [PokemonTypesEnum.Water]: "#6890F0",
  [PokemonTypesEnum.Electric]: "#F8D030",
  [PokemonTypesEnum.Grass]: "#78C850",
  [PokemonTypesEnum.Ice]: "#98D8D8",
  [PokemonTypesEnum.Fighting]: "#C03028",
  [PokemonTypesEnum.Poison]: "#A040A0",
  [PokemonTypesEnum.Ground]: "#E0C068",
  [PokemonTypesEnum.Flying]: "#A890F0",
  [PokemonTypesEnum.Psychic]: "#F85888",
  [PokemonTypesEnum.Bug]: "#A8B820",
  [PokemonTypesEnum.Rock]: "#B8A038",
  [PokemonTypesEnum.Ghost]: "#705898",
  [PokemonTypesEnum.Dragon]: "#7038F8",
  [PokemonTypesEnum.Dark]: "#705848",
  [PokemonTypesEnum.Steel]: "#B8B8D0",
  [PokemonTypesEnum.Fairy]: "#EE99AC",
};
export const STAT_DISPLAY_NAMES: Record<PokemonStatsEnum, string> = {
  [PokemonStatsEnum.Hp]: "HP",
  [PokemonStatsEnum.Attack]: "Attack",
  [PokemonStatsEnum.Defense]: "Defense",
  [PokemonStatsEnum.SpecialAttack]: "Sp. Attack",
  [PokemonStatsEnum.SpecialDefence]: "Sp. Defense",
  [PokemonStatsEnum.Speed]: "Speed",
};
export const DEFAULT_TEAM_NAME = "New Team";
export const TypeChart: {
  [key: string]: {
    weakTo: string[];
    resistantTo: string[];
    immuneTo?: string[];
  };
} = {
  normal: {
    weakTo: ["fighting"],
    resistantTo: [],
    immuneTo: ["ghost"],
  },
  fire: {
    weakTo: ["water", "ground", "rock"],
    resistantTo: ["fire", "grass", "ice", "bug", "steel", "fairy"],
  },
  water: {
    weakTo: ["electric", "grass"],
    resistantTo: ["fire", "water", "ice", "steel"],
  },
  electric: {
    weakTo: ["ground"],
    resistantTo: ["electric", "flying", "steel"],
  },
  grass: {
    weakTo: ["fire", "ice", "poison", "flying", "bug"],
    resistantTo: ["water", "electric", "grass", "ground"],
  },
  ice: {
    weakTo: ["fire", "fighting", "rock", "steel"],
    resistantTo: ["ice"],
  },
  fighting: {
    weakTo: ["flying", "psychic", "fairy"],
    resistantTo: ["bug", "rock", "dark"],
  },
  poison: {
    weakTo: ["ground", "psychic"],
    resistantTo: ["grass", "fighting", "poison", "bug", "fairy"],
  },
  ground: {
    weakTo: ["water", "grass", "ice"],
    resistantTo: ["poison", "rock"],
    immuneTo: ["electric"],
  },
  flying: {
    weakTo: ["electric", "ice", "rock"],
    resistantTo: ["grass", "fighting", "bug"],
    immuneTo: ["ground"],
  },
  psychic: {
    weakTo: ["bug", "ghost", "dark"],
    resistantTo: ["fighting", "psychic"],
  },
  bug: {
    weakTo: ["fire", "flying", "rock"],
    resistantTo: ["grass", "fighting", "ground"],
  },
  rock: {
    weakTo: ["water", "grass", "fighting", "ground", "steel"],
    resistantTo: ["normal", "fire", "poison", "flying"],
  },
  ghost: {
    weakTo: ["ghost", "dark"],
    resistantTo: ["poison", "bug"],
    immuneTo: ["normal", "fighting"],
  },
  dragon: {
    weakTo: ["ice", "dragon", "fairy"],
    resistantTo: ["fire", "water", "electric", "grass"],
  },
  dark: {
    weakTo: ["fighting", "bug", "fairy"],
    resistantTo: ["ghost", "dark"],
    immuneTo: ["psychic"],
  },
  steel: {
    weakTo: ["fire", "fighting", "ground"],
    resistantTo: [
      "normal",
      "grass",
      "ice",
      "flying",
      "psychic",
      "bug",
      "rock",
      "dragon",
      "steel",
      "fairy",
    ],
    immuneTo: ["poison"],
  },
  fairy: {
    weakTo: ["poison", "steel"],
    resistantTo: ["fighting", "bug", "dark"],
    immuneTo: ["dragon"],
  },
};
