import { useTeamStore } from "@/lib/store/team-store";
import { TeamCard } from "./team-card";
import { Button } from "../ui/button";
import { Edit2, Plus, RotateCcw } from "lucide-react";
import { useTeamEditor } from "@/lib/hooks/use-pokemon-team-hooks";
import { Input } from "../ui/input";
import { TeamSlot } from "./team-slot";

type TeamViewProps = {
  onSlotClick: (slot: number) => void;
  onAnalyzeClick: () => void;
};
export function TeamView({ onSlotClick, onAnalyzeClick }: TeamViewProps) {
  const team = useTeamStore((state) => state.activeTeam);
  const teams = useTeamStore((state) => state.teams);

  const {
    isEditing,
    newName,
    setNewName,
    handleNameSubmit,
    handleEditStart,
    handleRemovePokemon,
    handleCreateTeam,
    reset,
  } = useTeamEditor();

  const slots = Array(6).fill(null);

  return (
    <div className="space-y-4">
      {/* Team List */}
      {teams.map((team) => (
        <TeamCard key={team.id} team={team} />
      ))}

      {/* Team Name and Controls */}
      <div className="flex items-center justify-between mb-4">
        <TeamNameEditor
          isEditing={isEditing}
          teamName={team?.name || ""}
          newName={newName}
          onNameChange={setNewName}
          onSubmit={handleNameSubmit}
          onEditStart={handleEditStart}
        />

        <TeamControls
          onReset={reset}
          onCreateTeam={handleCreateTeam}
          onAnalyze={onAnalyzeClick}
        />
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-2 gap-4 relative z-0">
        {slots.map((_, index) => (
          <TeamSlot
            key={index}
            index={index}
            pokemon={team?.pokemon[index] || null}
            onRemove={handleRemovePokemon}
            onSlotClick={onSlotClick}
          />
        ))}
      </div>
    </div>
  );
}
type TeamNameEditorProps = {
  isEditing: boolean;
  teamName: string;
  newName: string;
  onNameChange: (value: string) => void;
  onSubmit: () => void;
  onEditStart: () => void;
};
function TeamNameEditor({
  isEditing,
  teamName,
  newName,
  onNameChange,
  onSubmit,
  onEditStart,
}: TeamNameEditorProps) {
  return (
    <div className="flex items-center gap-2">
      {isEditing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="flex gap-2"
        >
          <Input
            value={newName}
            onChange={(e) => onNameChange(e.target.value)}
            className="h-8"
            autoFocus
          />
          <Button type="submit" size="sm">
            Save
          </Button>
        </form>
      ) : (
        <>
          <h2 className="text-lg font-semibold whitespace-nowrap">
            {teamName}
          </h2>
          <Button variant="ghost" size="sm" onClick={onEditStart}>
            <Edit2 className="w-4 h-4" />
          </Button>
        </>
      )}
    </div>
  );
}

type TeamControlsProps = {
  onReset: () => void;
  onCreateTeam: () => void;
  onAnalyze: () => void;
};
function TeamControls({ onReset, onCreateTeam, onAnalyze }: TeamControlsProps) {
  return (
    <div className="flex flex-wrap gap-2 px-2">
      <Button variant="outline" size="sm" onClick={onReset}>
        <RotateCcw className="w-4 h-4 mr-1" />
        Reset
      </Button>
      <Button variant="outline" size="sm" onClick={onCreateTeam}>
        <Plus className="w-4 h-4 mr-1" />
        New Team
      </Button>
      <Button variant="default" size="sm" onClick={onAnalyze}>
        Analyze Team
      </Button>
    </div>
  );
}
