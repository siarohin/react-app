/**
 * Transform snake_case to camelCase
 */
export function transformSnakeToCamelCase(word: string): string {
  const chars: Array<string> = word.split("_");
  const result: Array<string> = chars.map((word, index) =>
    index > 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word
  );
  return result.join("");
}
