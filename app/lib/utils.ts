import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { slug } from "github-slugger";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(str: string) {
  return slug(str);
}

export function dateSort(a: string, b: string) {
  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
}
