import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, Users, Database } from "lucide-react";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Pokedex</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Build and analyze your perfect Pokemon team. Access comprehensive
            data for all Pokemon, compare stats, and discover winning
            combinations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 w-full max-w-4xl">
          <Link
            href="/pokedex"
            className="flex flex-col items-center p-6 rounded-lg border bg-card hover:bg-accent transition-colors"
          >
            <Search className="w-10 h-10 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Pokedex</h2>
            <p className="text-sm text-muted-foreground text-center">
              Browse and search through all Pokemon with detailed information
            </p>
          </Link>

          <Link
            href="/team-builder"
            className="flex flex-col items-center p-6 rounded-lg border bg-card hover:bg-accent transition-colors"
          >
            <Users className="w-10 h-10 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Team Builder</h2>
            <p className="text-sm text-muted-foreground text-center">
              Create and analyze your perfect team composition
            </p>
          </Link>

          <Link
            href="/compare-pokemon"
            className="flex flex-col items-center p-6 rounded-lg border bg-card hover:bg-accent transition-colors"
          >
            <Database className="w-10 h-10 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Compare</h2>
            <p className="text-sm text-muted-foreground text-center">
              Compare stats and abilities between different Pokemon
            </p>
          </Link>
        </div>

        <div className="flex gap-4 items-center mt-8">
          <Button asChild size="lg">
            <Link href="/team-builder">Start Building</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/pokedex">Explore Pokedex</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
