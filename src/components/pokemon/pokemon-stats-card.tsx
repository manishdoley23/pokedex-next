import React from "react";
import { PokemonStat } from "@/lib/types/pokemon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  MAX_STAT_VALUE,
  PokemonStatsEnum,
  STAT_DISPLAY_NAMES,
} from "@/lib/utils/constants";

export function PokemonStats({ stats }: { stats: PokemonStat[] }) {
  const totalStats = stats.reduce((sum, stat) => sum + stat.base_stat, 0);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex justify-between items-center">
          Base Stats
          <span className="text-sm text-muted-foreground">
            Total: {totalStats}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stats.map((stat) => (
            <StatRow key={stat.stat.name} stat={stat} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function StatRow({ stat }: { stat: PokemonStat }) {
  const percentage = (stat.base_stat / MAX_STAT_VALUE) * 100;
  const displayName =
    STAT_DISPLAY_NAMES[stat.stat.name as PokemonStatsEnum] || stat.stat.name;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="w-full">
          <div className="space-y-2 w-full">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{displayName}</span>
              <span className="tabular-nums">{stat.base_stat}</span>
            </div>
            <Progress value={percentage} className={`h-2 `} />
          </div>
        </TooltipTrigger>
        <TooltipContent side="right">
          <div className="text-sm">
            <p>
              Base {displayName}: {stat.base_stat}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {stat.base_stat >= 150 && "Outstanding"}
              {stat.base_stat >= 90 && stat.base_stat < 150 && "Good"}
              {stat.base_stat >= 60 && stat.base_stat < 90 && "Average"}
              {stat.base_stat < 60 && "Below Average"}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
