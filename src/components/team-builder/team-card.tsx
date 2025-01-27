import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Team, useTeamStore } from "@/lib/store/team-store";

export function TeamCard({ team }: { team: Team }) {
  const { setActiveTeam, deleteTeam } = useTeamStore();
  const activeTeam = useTeamStore((state) => state.activeTeam);

  const isActive = activeTeam?.id === team.id;

  return (
    <Card
      className={cn(
        "transition-all duration-200",
        isActive && "ring-2 ring-primary"
      )}
    >
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">{team.name}</CardTitle>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setActiveTeam(team.id)}
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => deleteTeam(team.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="grid grid-cols-6 gap-2">
          {team.pokemon.map((pokemon, index) => (
            <div
              key={index}
              className={cn(
                "aspect-square rounded-md border",
                pokemon ? "bg-card p-1" : "border-dashed"
              )}
            >
              {pokemon ? (
                pokemon.sprites.front_default && (
                  <Image
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className="w-full h-full object-contain"
                    width={100}
                    height={100}
                  />
                )
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-muted-foreground text-xs">Empty</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
