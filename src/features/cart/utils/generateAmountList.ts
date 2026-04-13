import { formatInteger } from "@/utils/format";

interface AmountOption {
  value: number;
  label: string;
}

export function generateAmountList(): AmountOption[] {
  const list: AmountOption[] = [];

  for (let i = 1; i <= 100; i++) list.push({ value: i, label: `${i} TL` });
  for (let i = 110; i <= 1000; i += 10) list.push({ value: i, label: `${formatInteger(i)} TL` });
  for (let i = 1050; i <= 20000; i += 50) list.push({ value: i, label: `${formatInteger(i)} TL` });

  return list;
}
