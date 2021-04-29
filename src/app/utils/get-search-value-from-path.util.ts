/**
 * Returns normalized search value
 */
export const getSearchValueFromPath = (value: string): string => value?.replace("Search", "")?.trim() || "";
