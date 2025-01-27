"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="px-2 lg:px-10 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-14 items-center">
        <div className="flex flex-1 items-center justify-between">
          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] sm:w-[300px]">
                <SheetHeader>
                  <SheetTitle>Navigation</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-4 mt-4">
                  {routes.map((route) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "block px-2 py-1 text-lg",
                        pathname === route.href
                          ? "font-medium text-foreground"
                          : "text-foreground/60"
                      )}
                    >
                      {route.label}
                    </Link>
                  ))}
                  <div className="pt-4 border-t">
                    {session ? (
                      <div className="space-y-4">
                        <p className="px-2 text-sm text-foreground/60">
                          {session.user?.name}
                        </p>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => signOut()}
                        >
                          Sign Out
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => signIn()}
                      >
                        Sign In
                      </Button>
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 text-sm">
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

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:block">
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

          {/* Mobile Logo/Title - Centered */}
          <div className="md:hidden absolute left-1/2 transform -translate-x-1/2">
            <span className="font-bold">Pokedex</span>
          </div>
        </div>
      </nav>
    </header>
  );
}
