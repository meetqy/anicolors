import Color from "color";

// 颜色排序方法
export const sortColors = (colors: string[]): string[] => {
  return colors
    .map((color) => {
      try {
        const colorInstance = Color(color);
        const hsl = colorInstance.hsl().object();
        return {
          original: color,
          hue: hsl.h || 0, // 色相 (0-360)
          saturation: hsl.s || 0, // 饱和度 (0-100)
          lightness: hsl.l || 0, // 亮度 (0-100)
        };
      } catch {
        // 如果颜色格式无效，返回默认值
        return {
          original: color,
          hue: 0,
          saturation: 0,
          lightness: 0,
        };
      }
    })
    .sort((a, b) => {
      // 1. 首先按色相排序 (0-360度色环)
      const hueDiff = Math.abs(a.hue - b.hue);
      if (hueDiff > 15) {
        // 色相差异超过15度才考虑色相排序
        return a.hue - b.hue;
      }

      // 2. 色相相近时，按饱和度排序（高饱和度优先）
      const saturationDiff = Math.abs(a.saturation - b.saturation);
      if (saturationDiff > 10) {
        // 饱和度差异超过10%
        return b.saturation - a.saturation;
      }

      // 3. 最后按亮度排序（从暗到亮）
      return a.lightness - b.lightness;
    })
    .map((item) => item.original);
};

// 按亮度排序（从暗到亮）
export const sortColorsByLightness = (colors: string[]): string[] => {
  return colors
    .map((color) => {
      try {
        const colorInstance = Color(color);
        const lightness = colorInstance.lightness();
        return { original: color, lightness };
      } catch {
        return { original: color, lightness: 0 };
      }
    })
    .sort((a, b) => a.lightness - b.lightness)
    .map((item) => item.original);
};

// 按色相排序（色环顺序）
export const sortColorsByHue = (colors: string[]): string[] => {
  return colors
    .map((color) => {
      try {
        const colorInstance = Color(color);
        const hue = colorInstance.hue() || 0;
        return { original: color, hue };
      } catch {
        return { original: color, hue: 0 };
      }
    })
    .sort((a, b) => a.hue - b.hue)
    .map((item) => item.original);
};

// 按饱和度排序（从高到低）
export const sortColorsBySaturation = (colors: string[]): string[] => {
  return colors
    .map((color) => {
      try {
        const colorInstance = Color(color);
        const saturation = colorInstance.saturationl() || 0;
        return { original: color, saturation };
      } catch {
        return { original: color, saturation: 0 };
      }
    })
    .sort((a, b) => b.saturation - a.saturation)
    .map((item) => item.original);
};
