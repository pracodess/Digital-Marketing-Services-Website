/**
 * Formats a numeric amount in Indian numbering system (e.g., 17999 -> "Rs. 17,999").
 */
export function formatINR(amount: number): string {
  const rounded = Math.round(amount);
  const formatted = new Intl.NumberFormat('en-IN').format(rounded);
  return `Rs. ${formatted}`;
}
