import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full px-2 lg:px-10">
      <div className="container mx-auto flex items-center justify-between py-6">
        <Link href="/">
          <div className="text-lg font-bold lg:text-2xl">Pokedex</div>
        </Link>
        <div className="flex gap-3 lg:gap-6">
          <Link href="/" className="text-xs lg:text-lg font-semibold">
            Home
          </Link>
          <Link href="/pokedex" className="text-xs lg:text-lg font-semibold">
            Pokedex
          </Link>
          <Link
            href="/team-builder"
            className="text-xs lg:text-lg font-semibold"
          >
            Team Builder
          </Link>
          <Link
            href="/compare-pokemon"
            className="text-xs lg:text-lg font-semibold"
          >
            Compare Pokemon
          </Link>
        </div>
      </div>
    </nav>
  );
}
