import { PokemonApiResponse } from "@/lib/types/pokemon";
import type { Team, TeamState } from "./team-types";
import { DEFAULT_TEAM_NAME } from "@/lib/utils/constants";

const createNewTeam = (name: string, userId: string): Team => ({
  id: crypto.randomUUID(),
  name,
  pokemon: Array(6).fill(null),
  userId,
  createdAt: new Date(),
  updatedAt: new Date(),
});

export const createTeamActions = (
  set: (fn: (state: TeamState) => Partial<TeamState>) => void
) => ({
  initializeStore: () =>
    set((state) => {
      if (!state.currentUserId) return {};

      if (state.teams.length === 0) {
        const newTeam = createNewTeam(DEFAULT_TEAM_NAME, state.currentUserId);
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

  createTeam: (name: string = DEFAULT_TEAM_NAME) =>
    set((state) => {
      if (!state.currentUserId) return {};

      const newTeam = createNewTeam(name, state.currentUserId);

      return {
        teams: [...state.teams, newTeam],
        activeTeam: newTeam,
      };
    }),

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
              updatedAt: new Date(),
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
              updatedAt: new Date(),
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
              updatedAt: new Date(),
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

  setUser: (session: { user?: { email?: string | null } } | null) =>
    set((state) => ({
      currentUserId: session?.user?.email || null,
      teams: session?.user?.email
        ? state.userTeams[session.user.email] || []
        : [],
      activeTeam: null,
    })),

  syncTeams: () =>
    set((state) => {
      if (!state.currentUserId) return {};

      return {
        userTeams: {
          ...state.userTeams,
          [state.currentUserId]: state.teams,
        },
      };
    }),

  reset: () =>
    set(() => ({
      teams: [],
      activeTeam: null,
      userTeams: {},
      currentUserId: null,
    })),
});
