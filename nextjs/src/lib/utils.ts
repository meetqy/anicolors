import { env } from "@/env";
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

export const getAssetUrl = (
  url: string,
  width?: number,
  height?: number,
  quality?: number,
) => {
  const assetUrl = env.NEXT_PUBLIC_ASSET_URL;

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
      return url.replace(
        assetUrl,
        assetUrl + "/cdn-cgi/image/" + option.join(","),
      );
    }

    return url;
  }

  return `${process.env.NEXT_PUBLIC_ASSET_URL}${url}`;
};

export const getOriginalUrl = (url: string) => {
  return url.startsWith("http")
    ? url
    : `${process.env.NEXT_PUBLIC_ASSET_URL}${url}`;
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

export const aspectRatios = [
  {
    label: "0.5225:1",
    value: "0.5225/1",
    description: "627x1200 LinkedIn Portrait",
  },
  {
    label: "0.525:1",
    value: "0.525/1",
    description: "630x1200 Facebook Portrait",
  },
  { label: "9:16", value: "9/16", description: "1080x1920 Stories, Idea Pin" },
  { label: "2:3", value: "2/3", description: "1000x1500 Pinterest Standard" },
  {
    label: "3:4",
    value: "3/4",
    description: "900x1200 小红书/X(Twitter) Portrait",
  },
  {
    label: "0.8:1",
    value: "0.8/1",
    description: "1080x1350 Instagram Portrait",
  },
  { label: "6:7", value: "6/7", description: "1080x1260 微信视频号 Portrait" },
  {
    label: "1:1",
    value: "1/1",
    description: "Square, common for many platforms",
  },
  { label: "1.08:1", value: "1.08/1", description: "980x900 微博 Normal" },
  { label: "5:4", value: "5/4", description: "1000x800 小红书 Background" },
  {
    label: "4:3",
    value: "4/3",
    description: "1200x900 小红书/X(Twitter) Landscape",
  },
  {
    label: "3:2",
    value: "3/2",
    description: "900x600 LinkedIn Lift Tab Photo",
  },
  { label: "1.75:1", value: "1.75/1", description: "980x560 微博 Story Cover" },
  {
    label: "16:9",
    value: "16/9",
    description: "1600x900 X(Twitter) In-Stream Photos",
  },
  {
    label: "1.78:1",
    value: "1.78/1",
    description: "502x282 LinkedIn Lift Tab Modules Image",
  },
  {
    label: "1.79:1",
    value: "1.79/1",
    description: "600x335 X(Twitter) Ad:Tweets",
  },
  {
    label: "9:5",
    value: "9/5",
    description: "900x500 微信公众号 Content Welcome Image",
  },
  {
    label: "1.905:1",
    value: "1.905/1",
    description: "1200x630 Facebook Landscape",
  },
  {
    label: "1.908:1",
    value: "1.908/1",
    description: "1080x566 Instagram Landscape",
  },
  {
    label: "1.91:1",
    value: "1.91/1",
    description: "800x418 X(Twitter) Ad:Web Card Image",
  },
  {
    label: "1.914:1",
    value: "1.914/1",
    description: "1200x627 LinkedIn Landscape",
  },
  { label: "2:1", value: "2/1", description: "1200x628 Facebook Cover Photo" },
  {
    label: "2.35:1",
    value: "2.35/1",
    description: "900x383 微信公众号 Home Cover",
  },
  {
    label: "3:1",
    value: "3/1",
    description: "1500x500 X(Twitter) Cover Photo",
  },
  {
    label: "6:1",
    value: "6/1",
    description: "1128x191 LinkedIn Company Cover Image",
  },
];
