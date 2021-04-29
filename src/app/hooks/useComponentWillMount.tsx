import { useMemo } from "react";

export function useComponentWillMount<T>(callback: () => T): T | void {
  useMemo(callback, []);
}
