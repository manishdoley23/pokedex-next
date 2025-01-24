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

export enum PokemonAbilityEnum {
  Overgrow = "overgrow",
  Blaze = "blaze",
  Torrent = "torrent",
  Static = "static",
  KeenEye = "keen-eye",
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
