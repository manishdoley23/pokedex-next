import { Session } from "next-auth";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { TeamState, TeamStore } from "./team-types";
import { createTeamActions } from "./team-actions";

export const initialState: TeamState = {
  activeTeam: null,
  teams: [],
  userTeams: {},
  currentUserId: null,
} as const;

export const useTeamStore = create<TeamStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        ...createTeamActions(set),
        setUser: (session: Session | null) =>
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
      }),
      {
        name: "pokemon-team-store",
      }
    ),
    {
      enabled: process.env.NODE_ENV === "development",
    }
  )
);
