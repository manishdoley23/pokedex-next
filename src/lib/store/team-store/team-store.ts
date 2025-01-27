import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { TeamState, TeamStore } from "./team-types";
import { createTeamActions } from "./team-actions";

export const initialState: TeamState = {
  activeTeam: null,
  teams: [],
} as const;

/**
 * Pokemon team store
 */
export const useTeamStore = create<TeamStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        ...createTeamActions(set),
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
