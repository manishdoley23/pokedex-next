import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, Users, Database } from "lucide-react";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 pb-20 gap-8 sm:gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-6 sm:gap-8 row-start-2 items-center w-full">
        <div className="text-center space-y-4 px-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Pokedex
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl">
            Build and analyze your perfect Pokemon team. Access comprehensive
            data for all Pokemon, compare stats, and discover winning
            combinations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-4xl px-2">
          <Link
            href="/pokedex"
            className="flex flex-col items-center p-4 sm:p-6 rounded-lg border bg-card hover:bg-accent transition-colors"
          >
            <Search className="w-8 h-8 sm:w-10 sm:h-10 mb-3 sm:mb-4" />
            <h2 className="text-lg sm:text-xl font-semibold mb-2">Pokedex</h2>
            <p className="text-xs sm:text-sm text-muted-foreground text-center">
              Browse and search through all Pokemon with detailed information
            </p>
          </Link>

          <Link
            href="/team-builder"
            className="flex flex-col items-center p-4 sm:p-6 rounded-lg border bg-card hover:bg-accent transition-colors"
          >
            <Users className="w-8 h-8 sm:w-10 sm:h-10 mb-3 sm:mb-4" />
            <h2 className="text-lg sm:text-xl font-semibold mb-2">
              Team Builder
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground text-center">
              Create and analyze your perfect team composition
            </p>
          </Link>

          <Link
            href="/compare-pokemon"
            className="flex flex-col items-center p-4 sm:p-6 rounded-lg border bg-card hover:bg-accent transition-colors"
          >
            <Database className="w-8 h-8 sm:w-10 sm:h-10 mb-3 sm:mb-4" />
            <h2 className="text-lg sm:text-xl font-semibold mb-2">Compare</h2>
            <p className="text-xs sm:text-sm text-muted-foreground text-center">
              Compare stats and abilities between different Pokemon
            </p>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center mt-4 sm:mt-8 w-full px-4 sm:px-0 sm:w-auto">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/team-builder">Start Building</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            <Link href="/pokedex">Explore Pokedex</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
