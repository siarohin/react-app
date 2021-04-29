/**
 * Returns formatted yyyy-mmm-dd Date
 * TODO: Need to be replaced with moment later
 */
export function getFormattedDate(date: Date): string {
  const dd: string = ("0" + date.getDate()).slice(-2);
  const mmm: string = ("0" + (date.getMonth() + 1)).slice(-2);
  const yyyy: string = date.getFullYear().toString();
  return `${yyyy}-${mmm}-${dd}`;
}
