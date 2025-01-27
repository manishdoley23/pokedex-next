import {
  PokemonAbility,
  PokemonMove,
  VersionGroupDetail,
} from "@/lib/types/pokemon";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatName } from "@/lib/utils";
import { groupMovesByMethod } from "@/lib/utils/pokemon-utils";

export function PokemonMovesAbilities({
  moves,
  abilities,
}: {
  moves: PokemonMove[];
  abilities?: PokemonAbility[];
}) {
  const groupedMoves = groupMovesByMethod(moves);
  const methodTypes = Object.keys(groupedMoves);

  return (
    <div className="space-y-6">
      {/* Abilities Section */}
      {abilities && abilities.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Abilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap">
              {abilities.map((ability) => (
                <AbilityTag
                  key={ability.ability.name}
                  ability={ability.ability.name}
                  isHidden={ability.is_hidden}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Moves Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Moves</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={methodTypes[0]}>
            <TabsList className="mb-4">
              {methodTypes.map((method) => (
                <TabsTrigger key={method} value={method}>
                  {formatName(method)}
                </TabsTrigger>
              ))}
            </TabsList>

            {methodTypes.map((method) => (
              <TabsContent key={method} value={method}>
                <div className="flex flex-wrap">
                  {groupedMoves[method]
                    .sort(
                      (a, b) =>
                        a.detail.level_learned_at - b.detail.level_learned_at
                    )
                    .map(({ move, detail }) => (
                      <MoveTag key={move} move={move} detail={detail} />
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

const AbilityTag = ({
  ability,
  isHidden,
}: {
  ability: string;
  isHidden: boolean;
}) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <Badge
          variant={isHidden ? "secondary" : "default"}
          className="mr-2 mb-2"
        >
          {formatName(ability)}
        </Badge>
      </TooltipTrigger>
      <TooltipContent>
        <p>{isHidden ? "Hidden Ability" : "Regular Ability"}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const MoveTag = ({
  move,
  detail,
}: {
  move: string;
  detail: VersionGroupDetail;
}) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <Badge variant="outline" className="mr-2 mb-2">
          {formatName(move)}
        </Badge>
      </TooltipTrigger>
      <TooltipContent>
        <div className="text-sm">
          <p>Learn method: {formatName(detail.move_learn_method.name)}</p>
          {detail.level_learned_at > 0 && (
            <p>Level: {detail.level_learned_at}</p>
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);
