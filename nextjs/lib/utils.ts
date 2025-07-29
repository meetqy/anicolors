import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const partsConstant = [
  // 人体特征
  "eye", // 瞳孔颜色（Iris）
  "hair", // 头发颜色（Hair）
  "skin", // 肤色（Skin Tone）

  // 衣物分类
  "clothes", // 整体服装颜色（如制服或连体衣）
  "shirt", // 上衣颜色（Shirt / Top）
  "pants", // 裤子颜色（Pants / Bottom）
  "shoes", // 鞋子颜色（Shoes）
  "coat", // 外套颜色（Coat / Jacket）
  "dress", // 连衣裙颜色（Dress）
  "socks", // 袜子颜色（Socks）

  // 配件装饰（可选）
  "hat", // 帽子颜色（Hat）
  "accessory", // 饰品颜色（项链、耳环等）
  "weapon", // 武器颜色（如剑、枪等）
] as const;

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

export const getOriginalUrl = (url: string) => {
  return url.startsWith("http") ? url : `${process.env.NEXT_PUBLIC_ASSET_URL}${url}`;
};

export const capitalize = (str: string): string => {
  return str
    .split(/(\s+)/) // Split by spaces but keep the spaces
    .map((part) => {
      if (/\s/.test(part)) return part; // Keep spaces as-is
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    })
    .join("");
};
