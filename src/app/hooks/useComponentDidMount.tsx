import { useEffect } from "react";

import { isServer } from "../core";

/**
 * The wrapper for ComponentDidMount hook that is used for dispatching an initial state
 * Returns react useEffect for SPA or callback for SSR
 */
export function useComponentDidMount<T>(callback: () => T): T | void {
  if (isServer) {
    return callback();
  }

  useEffect(() => {
    callback();
  }, []);
}
