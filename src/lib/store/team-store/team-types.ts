import { Session } from "next-auth";
import { PokemonApiResponse } from "@/lib/types/pokemon";

export interface Team {
  id: string;
  name: string;
  pokemon: (PokemonApiResponse | null)[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamState {
  teams: Team[];
  activeTeam: Team | null;
  userTeams: Record<string, Team[]>;
  currentUserId: string | null;
}

export interface TeamActions {
  initializeStore: () => void;
  createTeam: (name: string) => void;
  deleteTeam: (id: string) => void;
  addPokemonToTeam: (
    teamId: string,
    pokemon: PokemonApiResponse,
    slot: number
  ) => void;
  removePokemonFromTeam: (teamId: string, slot: number) => void;
  setActiveTeam: (teamId: string) => void;
  updateTeamName: (teamId: string, name: string) => void;
  setUser: (session: Session | null) => void;
  syncTeams: () => void;
  reset: () => void;
}

export type TeamStore = TeamState & TeamActions;
