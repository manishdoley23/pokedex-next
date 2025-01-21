import { VersionGeneration, VersionGenerationGroup } from "../utils/constants";
import { FrontSetSprites, FullSetSprites, GenerationSprites } from "./common";

type GenISprites = Pick<
  GenerationSprites,
  "back_default" | "back_gray" | "front_default" | "front_gray"
>;

type GenIISprites = Pick<
  GenerationSprites,
  "back_default" | "back_shiny" | "front_default" | "front_shiny"
>;

type IconSprites = Pick<GenerationSprites, "front_default" | "front_female">;

export interface SpriteVersions {
  [VersionGeneration.I]: {
    [VersionGenerationGroup.RedBlue]: GenISprites;
    [VersionGenerationGroup.Yellow]: GenISprites;
  };

  [VersionGeneration.II]: {
    [VersionGenerationGroup.Crystal]: GenIISprites;
    [VersionGenerationGroup.Gold]: GenIISprites;
    [VersionGenerationGroup.Silver]: GenIISprites;
  };

  [VersionGeneration.III]: {
    [VersionGenerationGroup.Emerald]: Pick<
      GenerationSprites,
      "front_default" | "front_shiny"
    >;
    [VersionGenerationGroup.FireredLeafgreen]: GenIISprites;
    [VersionGenerationGroup.RubySapphire]: GenIISprites;
  };

  [VersionGeneration.IV]: {
    [VersionGenerationGroup.DiamondPearl]: FullSetSprites;
    [VersionGenerationGroup.HeartgoldSoulsilver]: FullSetSprites;
    [VersionGenerationGroup.Platinum]: FullSetSprites;
  };

  [VersionGeneration.V]: {
    [VersionGenerationGroup.BlackWhite]: {
      [VersionGenerationGroup.Animated]: FullSetSprites;
    } & FullSetSprites;
  };

  [VersionGeneration.VI]: {
    [VersionGenerationGroup.OmegarubyAlphasapphire]: FrontSetSprites;
    [VersionGenerationGroup.XY]: FrontSetSprites;
  };

  [VersionGeneration.VII]: {
    [VersionGenerationGroup.Icons]: IconSprites;
    [VersionGenerationGroup.UltraSunUltraMoon]: FrontSetSprites;
  };

  [VersionGeneration.VIII]: {
    [VersionGenerationGroup.Icons]: IconSprites;
  };
}
