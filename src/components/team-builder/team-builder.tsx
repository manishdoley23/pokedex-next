"use client";

import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import PokedexContainer from "../pokedex/pokedex-container";
import { TeamView } from "./team-view";
import { TeamAnalysis } from "./team-analysis";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { PokemonApiResponse } from "@/lib/types/pokemon";
import { useInitializeTeamStore } from "@/lib/store/team-store/team-selectors";
import { useTeamStore } from "@/lib/store/team-store";
import { PokemonTeamCard } from "../cards/pokemon-team-card";

type TeamBuilderView = "list" | "analysis";

export default function TeamBuilder() {
  useInitializeTeamStore();

  const [activePokemon, setActivePokemon] = useState<PokemonApiResponse | null>(
    null
  );
  const [activeId, setActiveId] = useState<string | null>(null);
  const [view, setView] = useState<TeamBuilderView>("list");

  const addPokemonToTeam = useTeamStore((state) => state.addPokemonToTeam);
  const activeTeam = useTeamStore((state) => state.activeTeam);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);
    setActivePokemon(active.data.current?.pokemon || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && activeTeam && active.data.current?.pokemon) {
      const slotIndex = parseInt(over.id as string);
      if (!isNaN(slotIndex)) {
        addPokemonToTeam(activeTeam.id, active.data.current.pokemon, slotIndex);
      }
    }
    setActiveId(null);
    setActivePokemon(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
    setActivePokemon(null);
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="flex h-[90vh] overflow-hidden">
        {/* Left side: Team View */}
        <div className="w-1/3 p-4 border-r overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">Your Team</h2>
          <TeamView
            onSlotClick={() => setView("list")}
            onAnalyzeClick={() => setView("analysis")}
          />
        </div>

        {/* Right side: Pokemon Selector or Analysis */}
        <div className="w-2/3 p-4 h-full overflow-y-auto">
          {view !== "list" && (
            <Button
              variant="ghost"
              className="mb-4"
              onClick={() => setView("list")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Team
            </Button>
          )}

          {view === "list" ? (
            <PokedexContainer mode="team" />
          ) : (
            <TeamAnalysis />
          )}
        </div>
      </div>

      <DragOverlay>
        {activePokemon && activeId && (
          <div className="transform-none cursor-grabbing">
            <PokemonTeamCard
              pokemon={activePokemon}
              // className="shadow-xl opacity-85 pointer-events-none"
            />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
