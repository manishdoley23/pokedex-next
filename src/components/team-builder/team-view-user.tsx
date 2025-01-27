"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useTeamStore } from "@/lib/store/team-store";
import { Button } from "@/components/ui/button";
import { TeamView } from "./team-view";
import Link from "next/link";
import { Plus } from "lucide-react";

interface TeamViewUserProps {
  onSlotClick: (slot: number) => void;
  onAnalyzeClick: () => void;
}

export function TeamViewUser({
  onSlotClick,
  onAnalyzeClick,
}: TeamViewUserProps) {
  const { data: session } = useSession();
  const { setUser, syncTeams, createTeam } = useTeamStore();
  const teams = useTeamStore((state) => state.teams);

  useEffect(() => {
    setUser(session);
  }, [session, setUser]);

  useEffect(() => {
    syncTeams();
  }, [teams, syncTeams]);

  const handleCreateTeam = () => {
    createTeam("New Team");
  };

  if (!session) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold mb-4">
          Sign in to manage your teams
        </h2>
        <p className="text-muted-foreground mb-6">
          Create an account to save and manage your Pokemon teams across
          devices.
        </p>
        <Button asChild>
          <Link href="/api/auth/signin">Sign In</Link>
        </Button>
      </div>
    );
  }

  if (teams.length === 0) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold mb-4">Create Your First Team</h2>
        <p className="text-muted-foreground mb-6">
          Start your Pokemon journey by creating your first team!
        </p>
        <Button onClick={handleCreateTeam} size="lg">
          <Plus className="w-5 h-5 mr-2" />
          Create New Team
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Your Teams</h2>
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            Signed in as {session.user?.email}
          </div>
        </div>
      </div>
      <TeamView onSlotClick={onSlotClick} onAnalyzeClick={onAnalyzeClick} />
    </div>
  );
}
