/**
 * Transform camelCase to snake_case
 */
export function transformCamelToSnakeCase(word: string): string {
  return word.replace(/[A-Z]/g, (letter: string) => `_${letter.toLowerCase()}`);
}
