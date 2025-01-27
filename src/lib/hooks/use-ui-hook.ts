import { useCallback, useEffect, useRef } from "react";

/**
 * Hook to focus on search input when '/' key is pressed
 */
export function useFocusOnSlash() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        e.target instanceof HTMLElement &&
        !["INPUT", "TEXTAREA"].includes(e.target.tagName)
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return inputRef;
}

/**
 * Hook to handle infinite scrolling through pokemon list
 * Returns ref to be attached to last pokemon element
 */
export const useIntersectionObserver = (options: {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  shouldStopFetching: boolean;
  fetchNextPage: () => void;
}) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { hasNextPage, isFetchingNextPage, shouldStopFetching, fetchNextPage } =
    options;

  const lastPokemonRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          hasNextPage &&
          !isFetchingNextPage &&
          !shouldStopFetching
        ) {
          fetchNextPage();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage, shouldStopFetching]
  );

  return { lastPokemonRef, observerRef };
};
