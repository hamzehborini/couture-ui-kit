export function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-JO", {
    style: "currency",
    currency: "JOD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
