/**
 * Transform string to Date full year
 */
export function getFullYear(value: string): string {
  const date: Date = new Date(value);
  const fullYear: number = date.getFullYear();
  return fullYear > 0 ? fullYear.toString() : "";
}
