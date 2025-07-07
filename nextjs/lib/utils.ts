import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getAssetUrl = (url: string) => {
  if (url.startsWith("http")) {
    return url;
  }

  return `${process.env.NEXT_PUBLIC_ASSET_URL}${url}`;
};
