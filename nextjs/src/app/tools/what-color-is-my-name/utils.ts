import { getHexByName } from "@/lib/nearest";

// 生成字符串的哈希值 - 使用多个哈希函数
export function hashString(str: string): number {
  // 使用多个不同的哈希函数来增加随机性
  let hash1 = 5381;
  let hash2 = 7919;
  let hash3 = 9973;

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    const pos = i + 1;

    // 第一个哈希函数 (djb2)
    hash1 = (hash1 << 5) + hash1 + char;

    // 第二个哈希函数 (sdbm)
    hash2 = char + (hash2 << 6) + (hash2 << 16) - hash2;

    // 第三个哈希函数 (考虑位置)
    hash3 = hash3 * 31 + char * pos;
  }

  // 合并三个哈希值
  const combined = Math.abs(hash1) ^ Math.abs(hash2) ^ Math.abs(hash3);

  // 为短字符串添加额外的区分度
  const length = str.length;
  const lengthBonus =
    length < 3 ? length * 50000 + str.charCodeAt(0) * 1000 : 0;

  return Math.abs(combined + lengthBonus);
}

// 将 hex 字符串转换为 RGB 和 HSL
function hexToRgbHsl(hex: string): {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
} {
  // 移除 # 符号
  const cleanHex = hex.replace("#", "");

  // 转换为 RGB
  const r = parseInt(cleanHex.substr(0, 2), 16);
  const g = parseInt(cleanHex.substr(2, 2), 16);
  const b = parseInt(cleanHex.substr(4, 2), 16);

  // RGB 转 HSL
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);

  const l = (max + min) / 2;
  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case rNorm:
        h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
        break;
      case gNorm:
        h = (bNorm - rNorm) / d + 2;
        break;
      case bNorm:
        h = (rNorm - gNorm) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    hex,
    rgb: { r, g, b },
    hsl: {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    },
  };
}

// 将哈希值转换为颜色 - 使用更好的分布
function hashToColor(hash: number): {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
} {
  // 使用不同的种子来生成色相、饱和度、亮度
  const hue = (hash * 0.618033988749895) % 360; // 黄金比例
  const saturation = 65 + ((hash >> 8) % 30); // 65-95%
  const lightness = 45 + ((hash >> 16) % 20); // 45-65%

  // HSL 转 RGB
  const h = hue / 360;
  const s = saturation / 100;
  const l = lightness / 100;

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  let r, g, b;

  if (s === 0) {
    r = g = b = l; // 无色
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  const red = Math.round(r * 255);
  const green = Math.round(g * 255);
  const blue = Math.round(b * 255);

  const hex = `#${red.toString(16).padStart(2, "0")}${green.toString(16).padStart(2, "0")}${blue.toString(16).padStart(2, "0")}`;

  return {
    hex,
    rgb: { r: red, g: green, b: blue },
    hsl: {
      h: Math.round(hue),
      s: Math.round(saturation),
      l: Math.round(lightness),
    },
  };
}

// 主函数：根据输入字符串生成颜色
export function getColorFromString(str: string): {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
  isColorName: boolean;
} {
  // 首先尝试作为颜色名称查找
  const colorHex = getHexByName(str);

  if (colorHex) {
    // 如果找到了对应的颜色名称，直接返回该颜色
    return {
      ...hexToRgbHsl(colorHex),
      isColorName: true,
    };
  }

  // 如果不是颜色名称，则使用哈希算法生成颜色
  const hash = hashString(str);
  return {
    ...hashToColor(hash),
    isColorName: false,
  };
}
