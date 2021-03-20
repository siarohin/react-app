import { useEffect } from "react";

/**
 * ComponentDidMount hook
 */
export function useComponentDidMount<T>(callback: () => T): void {
  useEffect(() => {
    callback();
  }, []);
}
