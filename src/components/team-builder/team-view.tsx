import { PlusCircle, X, Edit2, RotateCcw, Plus } from "lucide-react";
import PokedexItem from "../pokedex/pokedex-item";
import { Droppable } from "../ui/droppable";
import { cn } from "@/lib/utils";
import { PokemonApiResponse } from "@/lib/types/pokemon";
import { Button } from "../ui/button";
import { useState } from "react";
import { Input } from "../ui/input";
import TeamCard from "./team-card";
import { useTeamStore } from "@/lib/store/team-store";

export function TeamView({
  onSlotClick,
  onAnalyzeClick,
}: {
  onSlotClick: (slot: number) => void;
  onAnalyzeClick: () => void;
}) {
  const team = useTeamStore((state) => state.activeTeam);
  const { teams, removePokemonFromTeam, updateTeamName, createTeam, reset } =
    useTeamStore();
  console.log("teams: ", teams);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(team?.name || "");
  const slots = Array(6).fill(null);

  const handleRemovePokemon = (slot: number) => {
    if (team) {
      removePokemonFromTeam(team.id, slot);
    }
  };

  const handleNameSubmit = () => {
    if (team && newName.trim()) {
      updateTeamName(team.id, newName.trim());
      setIsEditing(false);
    }
  };

  return (
    <div className="space-y-4">
      {teams.map((team) => (
        <TeamCard key={team.id} team={team} />
      ))}
      {/* Team Name and Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {isEditing ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleNameSubmit();
              }}
              className="flex gap-2"
            >
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="h-8"
                autoFocus
              />
              <Button type="submit" size="sm">
                Save
              </Button>
            </form>
          ) : (
            <>
              <h2 className="text-xl font-semibold">{team?.name}</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setNewName(team?.name || "");
                  setIsEditing(true);
                }}
              >
                <Edit2 className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => reset()}>
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset
          </Button>
          <Button
            variant="outline"
            size="sm"
            // TODO: Hanlde new team name input
            onClick={() => createTeam("New Team")}
          >
            <Plus className="w-4 h-4 mr-1" />
            New Team
          </Button>
          <Button variant="default" size="sm" onClick={onAnalyzeClick}>
            Analyze Team
          </Button>
        </div>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-2 gap-4 relative z-0">
        {slots.map((_, index) => {
          const pokemon = team?.pokemon[index] as PokemonApiResponse | null;
          console.log("pokemon: ", pokemon);
          return (
            <Droppable key={index} id={index.toString()}>
              <div
                className={cn(
                  "aspect-square rounded-lg border-2 transition-all duration-200 relative",
                  pokemon ? "border-solid" : "border-dashed",
                  "hover:border-primary"
                )}
              >
                {pokemon ? (
                  <div className="h-full w-full group/item">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-1 right-1 z-50 invisible group-hover/item:visible transition-all duration-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemovePokemon(index);
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                    <div
                      className="h-full w-full group-hover/item:opacity-50 group-hover/item:pointer-events-none"
                      onClick={() => handleRemovePokemon(index)}
                    >
                      <PokedexItem
                        pokemon={pokemon}
                        className="h-full border-0 hover:scale-100 cursor-pointer"
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    className="flex items-center justify-center h-full cursor-pointer"
                    onClick={() => onSlotClick(index)}
                  >
                    <PlusCircle className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>
            </Droppable>
          );
        })}
      </div>
    </div>
  );
}
