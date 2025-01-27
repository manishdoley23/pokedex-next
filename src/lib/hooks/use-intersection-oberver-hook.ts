import { useCallback, useRef } from "react";

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
