import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getAssetUrl = (url: string) => {
  return `${process.env.NEXT_PUBLIC_ASSET_URL}${url}`;
};
