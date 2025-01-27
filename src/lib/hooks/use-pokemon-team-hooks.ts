import { useState } from "react";
import { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { PokemonApiResponse } from "@/lib/types/pokemon";
import { useTeamStore } from "@/lib/store/team-store";
import { DEFAULT_TEAM_NAME } from "@/lib/utils/constants";

type TeamBuilderView = "list" | "analysis";

/**
 * Hook to manage team builder view state
 */
export function useTeamBuilder() {
  const [view, setView] = useState<TeamBuilderView>("list");

  const handleViewChange = (newView: TeamBuilderView) => {
    setView(newView);
  };

  const handleSlotClick = () => {
    setView("list");
  };

  const handleAnalyzeClick = () => {
    setView("analysis");
  };

  const handleBackToList = () => {
    setView("list");
  };

  return {
    view,
    handleViewChange,
    handleSlotClick,
    handleAnalyzeClick,
    handleBackToList,
  };
}

/**
 * Hook to manage team name editing and team operations
 */
export function useTeamEditor() {
  const [isEditing, setIsEditing] = useState(false);
  const team = useTeamStore((state) => state.activeTeam);
  const [newName, setNewName] = useState(team?.name || "");
  const { updateTeamName, createTeam, reset, removePokemonFromTeam } =
    useTeamStore();

  const handleNameSubmit = () => {
    if (team && newName.trim()) {
      updateTeamName(team.id, newName.trim());
      setIsEditing(false);
    }
  };

  const handleEditStart = () => {
    setNewName(team?.name || "");
    setIsEditing(true);
  };

  const handleRemovePokemon = (slot: number) => {
    if (team) {
      removePokemonFromTeam(team.id, slot);
    }
  };

  const handleCreateTeam = () => {
    createTeam(DEFAULT_TEAM_NAME);
  };

  return {
    isEditing,
    newName,
    setNewName,
    handleNameSubmit,
    handleEditStart,
    handleRemovePokemon,
    handleCreateTeam,
    reset,
  };
}

/**
 * Hook to manage team builder drag and drop state
 */
export function useTeamDragDrop() {
  const [activePokemon, setActivePokemon] = useState<PokemonApiResponse | null>(
    null
  );
  const [activeId, setActiveId] = useState<string | null>(null);
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

  return {
    activePokemon,
    activeId,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  };
}
