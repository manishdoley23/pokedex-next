import { PokemonApiResponse } from "@/lib/types/pokemon";
import type { TeamState } from "./team-types";

const DEFAULT_TEAM_NAME = "My Team";

/**
 * Team management actions for pokemon-team-store
 */
export const createTeamActions = (
  set: (fn: (state: TeamState) => Partial<TeamState>) => void
) => ({
  /**
   * Initializes store with default team if empty
   */
  initializeStore: () =>
    set((state) => {
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
      if (state.teams.length > 0 && !state.activeTeam) {
        return {
          activeTeam: state.teams[0],
        };
      }
      return {};
    }),

  /**
   * Creates new team with given name
   */
  createTeam: (name: string = DEFAULT_TEAM_NAME) =>
    set((state) => {
      const newTeam = {
        id: crypto.randomUUID(),
        name,
        pokemon: Array(6).fill(null),
      };
      return {
        teams: [...state.teams, newTeam],
        activeTeam: newTeam,
      };
    }),

  /**
   * Deletes team by ID
   */
  deleteTeam: (id: string) =>
    set((state) => {
      const updatedTeams = state.teams.filter((team) => team.id !== id);
      return {
        teams: updatedTeams,
        activeTeam:
          state.activeTeam?.id === id
            ? updatedTeams[0] || null
            : state.activeTeam,
      };
    }),

  /**
   * Adds Pokemon to specific team slot
   */
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

  /**
   * Removes Pokemon from team slot
   */
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
        activeTeam:
          state.activeTeam?.id === teamId && updatedTeam
            ? updatedTeam
            : state.activeTeam,
      };
    }),

  /**
   * Sets active team by ID
   */
  setActiveTeam: (teamId: string) =>
    set((state) => ({
      activeTeam:
        state.teams.find((team) => team.id === teamId) || state.activeTeam,
    })),

  /**
   * Updates team name
   */
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
        activeTeam:
          state.activeTeam?.id === teamId && updatedTeam
            ? updatedTeam
            : state.activeTeam,
      };
    }),

  /**
   * Resets store to initial state
   */
  reset: () =>
    set(() => ({
      teams: [],
      activeTeam: null,
    })),
});
