"use client";

import { DndContext, DragOverlay } from "@dnd-kit/core";
import PokedexContainer from "../pokedex/pokedex-container";
import { TeamView } from "./team-view";
import { TeamAnalysis } from "./team-analysis";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { useInitializeTeamStore } from "@/lib/store/team-store/team-selectors";
import { PokemonTeamCard } from "../pokemon/cards/pokemon-team-card";
import {
  useTeamBuilder,
  useTeamDragDrop,
} from "@/lib/hooks/use-pokemon-team-hooks";

export default function TeamBuilder() {
  useInitializeTeamStore();

  const {
    activePokemon,
    activeId,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  } = useTeamDragDrop();

  const { view, handleSlotClick, handleAnalyzeClick, handleBackToList } =
    useTeamBuilder();

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
            onSlotClick={handleSlotClick}
            onAnalyzeClick={handleAnalyzeClick}
          />
        </div>

        {/* Right side: Pokemon Selector or Analysis */}
        <div className="w-2/3 p-4 h-full overflow-y-auto">
          {view !== "list" && (
            <Button variant="ghost" className="mb-4" onClick={handleBackToList}>
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
            <PokemonTeamCard pokemon={activePokemon} />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
