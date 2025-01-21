"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useRef, useCallback, useState, useMemo } from "react";
import { debounce } from "lodash";
import PokemonItem from "./PokemonItem";
import { Pokemon } from "../types/pokemon";

const LIMIT = 5;
const DEBOUNCE_DELAY = 300; // milliseconds

async function fetchPokemonPage({
  pageParam = 0,
  searchTerm = "",
  selectedTypes = [],
}) {
  try {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=${LIMIT}&offset=${pageParam}`
    );

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const listData = await res.json();

    const details = await Promise.all(
      listData.results.map(async (pokemon) => {
        const detailRes = await fetch(pokemon.url);
        if (!detailRes.ok) {
          throw new Error(`Failed to fetch details for ${pokemon.name}`);
        }
        return detailRes.json();
      })
    );

    return {
      pokemons: details,
      nextOffset: pageParam + LIMIT,
      hasMore: listData.next !== null,
    };
  } catch (error) {
    console.error("Error fetching Pokemon:", error);
    throw error;
  }
}

export default function PokemonGrid() {
  const observerRef = useRef(null);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Create debounced search function
  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearchTerm(value);
        setIsSearching(false);
      }, DEBOUNCE_DELAY),
    []
  );

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["pokemonList", searchTerm, selectedTypes],
    queryFn: () =>
      fetchPokemonPage({
        pageParam: 0,
        searchTerm,
        selectedTypes,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextOffset : undefined,
  });

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const lastPokemonRef = useCallback(
    (node) => {
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  const filteredPokemon = useMemo(
    () =>
      data?.pages.flatMap((page) =>
        page.pokemons.filter((pokemon) => {
          const matchesSearch =
            searchTerm === "" ||
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());

          const matchesType =
            selectedTypes.length === 0 ||
            pokemon.types.some((type) =>
              selectedTypes.includes(type.type.name)
            );

          return matchesSearch && matchesType;
        })
      ) ?? [],
    [data?.pages, searchTerm, selectedTypes]
  );

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSearching(true);
    debouncedSearch(e.target.value);
  };

  const handleTypeFilter = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  if (status === "pending") {
    return <div className="text-center p-4">Loading Pokemon data...</div>;
  }

  if (status === "error") {
    return (
      <div className="text-center p-4 text-red-500">
        <p>Error loading Pokemon data: {(error as Error)?.message}</p>
        <button
          onClick={() => refetch()}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 text-black">
      {/* Search Bar */}
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Search Pokemon"
          onChange={handleSearchInput}
          className="w-full px-4 py-2 rounded border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {isSearching && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent"></div>
          </div>
        )}
      </div>

      {/* Filter Controls */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-wrap gap-2">
          {["grass", "fire", "water", "electric", "psychic"].map((type) => (
            <button
              key={type}
              onClick={() => handleTypeFilter(type)}
              className={`px-4 py-2 rounded text-black transition-colors
                ${
                  selectedTypes.includes(type)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Pokemon Grid */}
      {filteredPokemon.length === 0 ? (
        <div className="text-center py-8">
          No Pokemon found matching your criteria
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPokemon.map((pokemon, index) => {
            const isLastPokemon = index === filteredPokemon.length - 1;

            return <PokemonItem key={pokemon} pokemon={pokemon} />;
          })}
        </div>
      )}

      {isFetchingNextPage && (
        <div className="text-center mt-4">Loading more Pokemon...</div>
      )}
    </div>
  );
}
