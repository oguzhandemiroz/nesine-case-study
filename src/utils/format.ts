const currencyFmt = new Intl.NumberFormat("tr-TR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const integerFmt = new Intl.NumberFormat("tr-TR");

export function formatCurrency(value: number): string {
  return `${currencyFmt.format(value)} TL`;
}

export function formatInteger(value: number): string {
  return integerFmt.format(value);
}
