/* eslint-disable @typescript-eslint/no-explicit-any */
import Color, { type ColorConstructor } from "color";
import nearestColor from "nearest-color";
import { HAIR_COLORS, type HairColor } from "./constant";

interface HairColorMatch {
  name: string;
  score: number; // 匹配度分数，0-1之间
  hex: string;
}

type ClassifiedHairColors = Record<
  string,
  {
    name: string;
    colors: string[];
    count: number;
  }
>;

// 为每个头发颜色创建多个代表性颜色点
function createHairColorPalette(): Record<string, string> {
  const palette: Record<string, string> = {};

  HAIR_COLORS.forEach((hairColor) => {
    const key = hairColor.name
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/\//g, "_");

    try {
      // 使用HSL范围创建代表性颜色
      const [minHue, maxHue] = hairColor.hsl_hue_range;
      const [minSat, maxSat] = hairColor.hsl_saturation_range;
      const [minLight, maxLight] = hairColor.hsl_lightness_range;

      // 处理特殊情况：无色相的颜色（如灰色、白色）
      if ((minHue === 0 && maxHue === 360) || (minSat === 0 && maxSat <= 10)) {
        // 纯灰色调，只变化亮度
        palette[`${key}_min`] = Color.hsl(0, 0, minLight).hex();
        palette[`${key}_max`] = Color.hsl(0, 0, maxLight).hex();
        palette[`${key}_mid`] = Color.hsl(
          0,
          0,
          (minLight + maxLight) / 2,
        ).hex();
      } else {
        // 有色相的颜色
        const midHue = minHue === maxHue ? minHue : (minHue + maxHue) / 2;
        const midSat = (minSat + maxSat) / 2;
        const midLight = (minLight + maxLight) / 2;

        // 添加范围的极值和中间值
        palette[`${key}_min`] = Color.hsl(minHue, minSat, minLight).hex();
        palette[`${key}_max`] = Color.hsl(maxHue, maxSat, maxLight).hex();
        palette[`${key}_mid`] = Color.hsl(midHue, midSat, midLight).hex();

        // 添加更多变体以提高匹配精度
        palette[`${key}_dark`] = Color.hsl(midHue, midSat, minLight).hex();
        palette[`${key}_light`] = Color.hsl(midHue, midSat, maxLight).hex();
        palette[`${key}_saturated`] = Color.hsl(midHue, maxSat, midLight).hex();
        palette[`${key}_desaturated`] = Color.hsl(
          midHue,
          minSat,
          midLight,
        ).hex();
      }
    } catch (error) {
      console.warn(`Error creating palette for ${hairColor.name}:`, error);
      // 使用hex_range作为备选
      palette[`${key}_min`] = hairColor.hex_range[0];
      palette[`${key}_max`] = hairColor.hex_range[1];
    }
  });

  return palette;
}

// 创建 nearest-color 实例
const hairColorPalette = createHairColorPalette();
const findNearestHairColor = nearestColor.from(hairColorPalette);

// 检查颜色是否在HSL范围内
function isColorInHSLRange(
  targetColor: ColorConstructor,
  hairColor: HairColor,
): boolean {
  const { h = 0, s = 0, l = 0 } = targetColor.hsl().object();

  // 检查色相（处理环形特性）
  let hueInRange = false;
  const [minHue, maxHue] = hairColor.hsl_hue_range;

  if (minHue === 0 && maxHue === 360) {
    // 全色相范围
    hueInRange = true;
  } else if (minHue <= maxHue) {
    hueInRange = h >= minHue && h <= maxHue;
  } else {
    // 跨越0度的情况
    hueInRange = h >= minHue || h <= maxHue;
  }

  // 检查饱和度和亮度
  const [minSat, maxSat] = hairColor.hsl_saturation_range;
  const [minLight, maxLight] = hairColor.hsl_lightness_range;

  const satInRange = s >= minSat && s <= maxSat;
  const lightInRange = l >= minLight && l <= maxLight;

  return hueInRange && satInRange && lightInRange;
}

// 计算HSL距离分数
function calculateHSLDistance(
  targetColor: ColorConstructor,
  hairColor: HairColor,
): number {
  const { h = 0, s = 0, l = 0 } = targetColor.hsl().object();

  // 计算色相距离（考虑环形特性）
  const [minHue, maxHue] = hairColor.hsl_hue_range;
  let hueDist = 0;

  if (!(minHue === 0 && maxHue === 360)) {
    const hueCenter = minHue === maxHue ? minHue : (minHue + maxHue) / 2;
    hueDist = Math.min(Math.abs(h - hueCenter), 360 - Math.abs(h - hueCenter));
  }

  // 计算饱和度距离
  const [minSat, maxSat] = hairColor.hsl_saturation_range;
  const satCenter = (minSat + maxSat) / 2;
  const satDist = Math.abs(s - satCenter);

  // 计算亮度距离
  const [minLight, maxLight] = hairColor.hsl_lightness_range;
  const lightCenter = (minLight + maxLight) / 2;
  const lightDist = Math.abs(l - lightCenter);

  // 加权计算总距离
  const totalDist =
    (hueDist / 180) * 0.4 + (satDist / 100) * 0.3 + (lightDist / 100) * 0.3;

  return Math.max(0, 1 - totalDist);
}

// 从 nearest-color 结果推断头发颜色
function extractHairColor(nearestColorName: string): HairColor | null {
  // 移除后缀获取原始键
  const key = nearestColorName.replace(
    /_(?:min|max|mid|dark|light|saturated|desaturated)$/,
    "",
  );
  const normalizedKey = key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    HAIR_COLORS.find(
      (color) =>
        color.name.toLowerCase().replace(/\s+/g, "_").replace(/\//g, "_") ===
          key || color.name === normalizedKey,
    ) || null
  );
}

// 计算匹配度分数
function calculateMatchScore(targetHex: string, nearestResult: any): number {
  try {
    const targetColor = Color(targetHex);
    const hairColor = extractHairColor(nearestResult.name);

    if (!hairColor) return 0;

    // 首先检查是否在HSL范围内
    const inRange = isColorInHSLRange(
      targetColor as unknown as ColorConstructor,
      hairColor,
    );
    if (inRange) {
      return 1; // 完全匹配
    }

    // 如果不在范围内，计算HSL距离分数
    const hslScore = calculateHSLDistance(
      targetColor as unknown as ColorConstructor,
      hairColor,
    );

    // 计算LAB距离作为辅助分数
    const nearestColor = Color(nearestResult.value);
    const targetLab = targetColor.lab().array();
    const nearestLab = nearestColor.lab().array();

    const deltaE = Math.sqrt(
      Math.pow(targetLab[0]! - nearestLab[0]!, 2) +
        Math.pow(targetLab[1]! - nearestLab[1]!, 2) +
        Math.pow(targetLab[2]! - nearestLab[2]!, 2),
    );

    const labScore = Math.max(0, 1 - deltaE / 100);

    // 组合HSL和LAB分数
    return hslScore * 0.7 + labScore * 0.3;
  } catch (error) {
    console.error(`Error calculating match score for ${targetHex}:`, error);
    return 0;
  }
}

// 为单个颜色找到最佳匹配的头发颜色
function classifySingleColor(hex: string): HairColorMatch | null {
  try {
    const nearestResult = findNearestHairColor(hex);
    const hairColor = extractHairColor(nearestResult!.name);

    if (!hairColor) return null;

    const score = calculateMatchScore(hex, nearestResult);

    // 只返回分数大于阈值的匹配
    if (score < 0.2) return null;

    return {
      name: hairColor.name,
      score,
      hex,
    };
  } catch (error) {
    console.warn(`Invalid hex color: ${hex}, error: ${error as Error}`);
    return null;
  }
}

// 主要的分类方法
export function classifyHairColors(hexColors: string[]): ClassifiedHairColors {
  const result: ClassifiedHairColors = {};

  // 对每个颜色进行分类
  for (const hex of hexColors) {
    const match = classifySingleColor(hex);
    if (match) {
      if (!result[match.name]) {
        result[match.name] = {
          name: match.name,
          colors: [],
          count: 0,
        };
      }

      result[match.name]!.colors.push(hex);
      result[match.name]!.count++;
    }
  }

  return result;
}

// 获取最常见的头发颜色
export function getMostCommonHairColor(
  hexColors: string[],
): HairColorMatch | null {
  const classified = classifyHairColors(hexColors);

  let mostCommon: { name: string; count: number } | null = null;

  for (const [name, data] of Object.entries(classified)) {
    if (data.count > 0 && (!mostCommon || data.count > mostCommon.count)) {
      mostCommon = { name, count: data.count };
    }
  }

  if (!mostCommon) return null;

  return {
    name: mostCommon.name,
    score: 1,
    hex: classified[mostCommon.name]?.colors[0] || "",
  };
}

// 获取单个颜色的最佳匹配（主要接口）
export function getHairColorName(hex: string): string | null {
  const match = classifySingleColor(hex);
  return match?.name || null;
}

// 批量获取颜色名称
export function getHairColorNames(
  hexColors: string[],
): Array<{ hex: string; name: string | null; score: number }> {
  return hexColors.map((hex) => {
    const match = classifySingleColor(hex);
    return {
      hex,
      name: match?.name || null,
      score: match?.score || 0,
    };
  });
}

export type { HairColorMatch, ClassifiedHairColors };
