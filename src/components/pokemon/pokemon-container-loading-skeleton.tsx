export function PokemonContainerLoadingSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="flex items-center gap-6">
        <div className="w-48 h-48 bg-gray-200 rounded-lg" />
        <div className="space-y-4">
          <div className="h-8 w-48 bg-gray-200 rounded" />
          <div className="flex gap-2">
            <div className="h-6 w-20 bg-gray-200 rounded" />
            <div className="h-6 w-20 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-lg p-6 shadow-sm">
            <div className="h-6 w-32 bg-gray-200 rounded mb-4" />
            <div className="space-y-2">
              {[1, 2, 3].map((j) => (
                <div key={j} className="h-4 bg-gray-200 rounded" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
