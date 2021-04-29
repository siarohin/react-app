import { RouterPath } from "../core";

/**
 * Returns source path (`/search/` or `/search/Search%20Query`)
 */
export function getPath(value: string): string {
  return value?.length ? encodeURI(`${RouterPath.Search}/Search ${value}`) : RouterPath.Search;
}
