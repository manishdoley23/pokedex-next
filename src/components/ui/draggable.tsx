import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { PokemonApiResponse } from "@/lib/types/pokemon";
import { cn } from "@/lib/utils";

interface DraggableProps {
  id: string;
  pokemon: PokemonApiResponse;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export function Draggable({
  id,
  pokemon,
  children,
  disabled = false,
  className,
}: DraggableProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    data: { pokemon },
    disabled,
  });

  return (
    <div
      ref={setNodeRef}
      {...(!disabled ? { ...listeners, ...attributes } : {})}
      className={cn(
        "relative touch-none",
        !disabled && "cursor-grab active:cursor-grabbing",
        isDragging && "opacity-30",
        disabled && "cursor-default opacity-50",
        className
      )}
    >
      {children}
    </div>
  );
}
