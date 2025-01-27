"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./button";

const routes = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/pokedex",
    label: "Pokedex",
  },
  {
    href: "/team-builder",
    label: "Team Builder",
  },
  {
    href: "/compare-pokemon",
    label: "Compare",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <header className="px-2 lg:px-10 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-14 items-center">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-6 text-sm">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === route.href
                    ? "text-foreground"
                    : "text-foreground/60"
                )}
              >
                {route.label}
              </Link>
            ))}
          </div>
          <div>
            {session ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-foreground/60">
                  {session.user?.name}
                </span>
                <Button variant="outline" size="sm" onClick={() => signOut()}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button variant="outline" size="sm" onClick={() => signIn()}>
                Sign In
              </Button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
