import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPriceBIF(price: number) {
  return new Intl.NumberFormat('fr-BI', {
    style: 'currency',
    currency: 'BIF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}
