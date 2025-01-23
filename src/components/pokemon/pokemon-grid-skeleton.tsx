import { Skeleton } from "@/components/ui/skeleton";

const LIMIT = 30;

export default function PokemonGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: LIMIT }).map((_, index) => (
        <div key={index} className="p-4 border rounded-lg">
          <Skeleton className="h-48 w-full rounded-lg mb-4" />
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}
