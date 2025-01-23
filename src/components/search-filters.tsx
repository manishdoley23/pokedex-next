"use client";

interface SearchAndFiltersProps {
  onSearch: (value: string) => void;
  onTypeFilter: (type: string) => void;
  selectedTypes: string[];
  isSearching: boolean;
}

export function SearchAndFilters({
  onSearch,
  onTypeFilter,
  selectedTypes,
  isSearching,
}: SearchAndFiltersProps) {
  return (
    <>
      {/* Search Bar */}
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Search Pokemon"
          onChange={(e) => onSearch(e.target.value)}
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
              onClick={() => onTypeFilter(type)}
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
    </>
  );
}
