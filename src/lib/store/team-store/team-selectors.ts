import { useEffect } from "react";
import { useTeamStore } from "./team-store";

/**
 * Hook to initialize team store
 */
export function useInitializeTeamStore() {
  const initializeStore = useTeamStore((state) => state.initializeStore);

  useEffect(() => {
    initializeStore();
  }, [initializeStore]);
}
