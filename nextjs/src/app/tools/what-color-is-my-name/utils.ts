// 生成字符串的哈希值 - 改进版
export function hashString(str: string): number {
  let hash = 5381; // 使用更好的初始值

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) + hash + char; // hash * 33 + char
  }

  // 为了增加单字符的随机性，添加字符串长度的影响
  hash = hash + str.length * 1000;

  // 如果字符串很短，添加一些额外的随机性
  if (str.length <= 2) {
    hash = hash * 31 + str.charCodeAt(0) * 17;
    if (str.length === 2) {
      hash = hash * 37 + str.charCodeAt(1) * 19;
    }
  }

  return Math.abs(hash);
}

// 将哈希值转换为颜色 - 改进版
export function hashToColor(hash: number): {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
} {
  // 使用更大的数值范围来避免重复
  const hue = (hash * 137.508) % 360; // 使用黄金角度
  const saturation = 60 + ((hash * 97) % 35); // 60-95%
  const lightness = 40 + ((hash * 71) % 25); // 40-65%

  const s = saturation / 100;
  const l = lightness / 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0,
    g = 0,
    b = 0;

  if (0 <= hue && hue < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= hue && hue < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= hue && hue < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= hue && hue < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= hue && hue < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= hue && hue < 360) {
    r = c;
    g = 0;
    b = x;
  }

  const red = Math.round((r + m) * 255);
  const green = Math.round((g + m) * 255);
  const blue = Math.round((b + m) * 255);

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
