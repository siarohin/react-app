/**
 * The function returns key name of string enum
 */
export function getEnumKey(stringEnum: any, value: string): string {
  const actionEntries: [string, unknown] | undefined = Object.entries(stringEnum).find(([, v]) => v === value);

  if (!actionEntries) {
    throw new Error();
  }

  const [actionType] = actionEntries;
  return actionType;
}
