"use client";

import { DndContext, DragOverlay } from "@dnd-kit/core";
import PokedexContainer from "../pokedex/pokedex-container";
import { TeamAnalysis } from "./team-analysis";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { useInitializeTeamStore } from "@/lib/store/team-store/team-selectors";
import { PokemonTeamCard } from "../pokemon/cards/pokemon-team-card";
import {
  useTeamBuilder,
  useTeamDragDrop,
} from "@/lib/hooks/use-pokemon-team-hooks";
import { TeamViewUser } from "./team-view-user";

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
      <div className="flex h-[90vh] w-full overflow-hidden flex-col lg:flex-row">
        {/* Left side: Team View */}
        <div className="w-full border-b-2 border-black lg:border-b-0 lg:w-1/3 p-4 border-r overflow-y-auto">
          <TeamViewUser
            onSlotClick={handleSlotClick}
            onAnalyzeClick={handleAnalyzeClick}
          />
        </div>

        {/* Right side: Pokemon Selector or Analysis */}
        <div className="w-full lg:w-2/3 p-4 h-full overflow-y-auto">
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
