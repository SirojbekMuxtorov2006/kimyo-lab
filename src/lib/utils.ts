import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names while resolving Tailwind conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number with locale-aware spacing (e.g. 79 000). */
export function formatNumber(value: number, locale: string) {
  return new Intl.NumberFormat(locale).format(value);
}

/** Convert a string to a URL-safe slug. */
export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\u0400-\u04ff]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Clamp a number between a minimum and a maximum. */
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
