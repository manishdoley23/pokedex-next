import { PokemonApiResponse } from "@/lib/types/pokemon";
import type { TeamState } from "./team-types";

const DEFAULT_TEAM_NAME = "My Team";

export const createTeamActions = (
  set: (fn: (state: TeamState) => Partial<TeamState>) => void
) => ({
  initializeStore: () =>
    set((state) => {
      // If there are no teams, create and activate a default team
      if (state.teams.length === 0) {
        const newTeam = {
          id: crypto.randomUUID(),
          name: DEFAULT_TEAM_NAME,
          pokemon: Array(6).fill(null),
        };
        return {
          teams: [newTeam],
          activeTeam: newTeam,
        };
      }
      // If there are teams but no active team, activate the first one
      if (state.teams.length > 0 && !state.activeTeam) {
        return {
          activeTeam: state.teams[0],
        };
      }
      return {};
    }),

  createTeam: (name: string = DEFAULT_TEAM_NAME) =>
    set((state) => {
      const newTeam = {
        id: crypto.randomUUID(),
        name,
        pokemon: Array(6).fill(null),
      };
      return {
        teams: [...state.teams, newTeam],
        // Automatically activate newly created team
        activeTeam: newTeam,
      };
    }),

  deleteTeam: (id: string) =>
    set((state) => {
      const updatedTeams = state.teams.filter((team) => team.id !== id);
      return {
        teams: updatedTeams,
        // If we're deleting the active team, set to the first available team or null
        activeTeam:
          state.activeTeam?.id === id
            ? updatedTeams[0] || null
            : state.activeTeam,
      };
    }),

  addPokemonToTeam: (
    teamId: string,
    pokemon: PokemonApiResponse,
    slot: number
  ) =>
    set((state) => {
      const updatedTeams = state.teams.map((team) =>
        team.id === teamId
          ? {
              ...team,
              pokemon: Object.assign([...team.pokemon], { [slot]: pokemon }),
            }
          : team
      );

      const updatedTeam = updatedTeams.find((team) => team.id === teamId);

      return {
        teams: updatedTeams,
        activeTeam:
          state.activeTeam?.id === teamId && updatedTeam
            ? updatedTeam
            : state.activeTeam,
      };
    }),

  removePokemonFromTeam: (teamId: string, slot: number) =>
    set((state) => {
      const updatedTeams = state.teams.map((team) =>
        team.id === teamId
          ? {
              ...team,
              pokemon: Object.assign([...team.pokemon], { [slot]: null }),
            }
          : team
      );

      const updatedTeam = updatedTeams.find((team) => team.id === teamId);

      return {
        teams: updatedTeams,
        // Update activeTeam if it's the team we're modifying
        activeTeam:
          state.activeTeam?.id === teamId && updatedTeam
            ? updatedTeam
            : state.activeTeam,
      };
    }),

  setActiveTeam: (teamId: string) =>
    set((state) => ({
      activeTeam:
        state.teams.find((team) => team.id === teamId) || state.activeTeam,
    })),

  updateTeamName: (teamId: string, name: string) =>
    set((state) => {
      const updatedTeams = state.teams.map((team) =>
        team.id === teamId
          ? {
              ...team,
              name,
            }
          : team
      );

      const updatedTeam = updatedTeams.find((team) => team.id === teamId);

      return {
        teams: updatedTeams,
        // Update activeTeam if it's the team we're modifying
        activeTeam:
          state.activeTeam?.id === teamId && updatedTeam
            ? updatedTeam
            : state.activeTeam,
      };
    }),

  reset: () =>
    set(() => ({
      teams: [],
      activeTeam: null,
    })),
});
