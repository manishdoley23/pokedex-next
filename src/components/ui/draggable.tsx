import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { PokemonApiResponse } from "@/lib/types/pokemon";
import { cn } from "@/lib/utils";

export function Draggable({
  id,
  pokemon,
  children,
}: {
  id: string;
  pokemon: PokemonApiResponse;
  children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    data: {
      pokemon,
    },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn(
        "cursor-grab active:cursor-grabbing relative touch-none",
        isDragging && "opacity-30"
      )}
    >
      {children}
    </div>
  );
}
