import {
  VersionGenerationEnum,
  VersionGenerationGroupEnum,
} from "../utils/constants";
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
  [VersionGenerationEnum.I]: {
    [VersionGenerationGroupEnum.RedBlue]: GenISprites;
    [VersionGenerationGroupEnum.Yellow]: GenISprites;
  };

  [VersionGenerationEnum.II]: {
    [VersionGenerationGroupEnum.Crystal]: GenIISprites;
    [VersionGenerationGroupEnum.Gold]: GenIISprites;
    [VersionGenerationGroupEnum.Silver]: GenIISprites;
  };

  [VersionGenerationEnum.III]: {
    [VersionGenerationGroupEnum.Emerald]: Pick<
      GenerationSprites,
      "front_default" | "front_shiny"
    >;
    [VersionGenerationGroupEnum.FireredLeafgreen]: GenIISprites;
    [VersionGenerationGroupEnum.RubySapphire]: GenIISprites;
  };

  [VersionGenerationEnum.IV]: {
    [VersionGenerationGroupEnum.DiamondPearl]: FullSetSprites;
    [VersionGenerationGroupEnum.HeartgoldSoulsilver]: FullSetSprites;
    [VersionGenerationGroupEnum.Platinum]: FullSetSprites;
  };

  [VersionGenerationEnum.V]: {
    [VersionGenerationGroupEnum.BlackWhite]: {
      [VersionGenerationGroupEnum.Animated]: FullSetSprites;
    } & FullSetSprites;
  };

  [VersionGenerationEnum.VI]: {
    [VersionGenerationGroupEnum.OmegarubyAlphasapphire]: FrontSetSprites;
    [VersionGenerationGroupEnum.XY]: FrontSetSprites;
  };

  [VersionGenerationEnum.VII]: {
    [VersionGenerationGroupEnum.Icons]: IconSprites;
    [VersionGenerationGroupEnum.UltraSunUltraMoon]: FrontSetSprites;
  };

  [VersionGenerationEnum.VIII]: {
    [VersionGenerationGroupEnum.Icons]: IconSprites;
  };
}
