"use client";

import { useState } from "react";
import { HydrationBoundary, DehydratedState } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import PokemonGridSkeleton from "./pokemon-grid-skeleton";
import { SearchAndFilters } from "../search-filters";

// Dynamically import PokemonGrid with no SSR
const PokemonGrid = dynamic(() => import("./pokemon-grid"), {
  ssr: false,
  loading: () => <PokemonGridSkeleton />,
});

interface PokemonContainerProps {
  dehydratedState: DehydratedState;
}

export default function PokemonContainer({
  dehydratedState,
}: PokemonContainerProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (value: string) => {
    setIsSearching(true);
    setSearchTerm(value);
  };

  const handleTypeFilter = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="container mx-auto p-4">
        <SearchAndFilters
          onSearch={handleSearch}
          onTypeFilter={handleTypeFilter}
          selectedTypes={selectedTypes}
          isSearching={isSearching}
        />

        <PokemonGrid
          searchTerm={searchTerm}
          selectedTypes={selectedTypes}
          setIsSearching={setIsSearching}
        />
      </div>
    </HydrationBoundary>
  );
}
