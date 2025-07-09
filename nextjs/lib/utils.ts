import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getAssetUrl = (url: string, width?: number, height?: number, quality?: number) => {
  const assetUrl = process.env.NEXT_PUBLIC_ASSET_URL || "";

  if (url.startsWith(assetUrl)) {
    // cdn-cgi/image/w=640,q=75
    const option = ["format=webp"];

    if (width) {
      option.push(`w=${width}`);
    }

    if (height) {
      option.push(`h=${height}`);
    }

    if (quality) {
      option.push(`q=${quality}`);
    }

    if (option.length > 0) {
      return url.replace(assetUrl, assetUrl + "/cdn-cgi/image/" + option.join(","));
    }

    return url;
  }

  return `${process.env.NEXT_PUBLIC_ASSET_URL}${url}`;
};
