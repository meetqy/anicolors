import nearestColor from "nearest-color";
import { colorNameOrder, colorNames } from "./color-name";

const colorCategories = nearestColor.from(colorNames);

export const sortColors = (colors: string[]): string[] => {
  if (colors.length <= 1) return colors;
  const firstColor = colors[0];

  const colorData = colors.map((color) => {
    try {
      const nearestResult = colorCategories(color);

      return {
        original: color,
        category: nearestResult!.name,
        distance: nearestResult!.distance || 0,
      };
    } catch {
      return {
        original: color,
        category: "black",
        distance: Infinity,
      };
    }
  });

  // 找到第一个颜色的分类
  const firstColorCategory = colorData.find(
    (c) => c.original === firstColor,
  )?.category;

  const result = colorData.sort((a, b) => {
    // 第一个颜色永远排在第一位
    if (a.original === firstColor) return -1;
    if (b.original === firstColor) return 1;

    // 优先排序与第一个颜色相同分类的颜色
    const aIsSameCategory = a.category === firstColorCategory;
    const bIsSameCategory = b.category === firstColorCategory;

    if (aIsSameCategory && !bIsSameCategory) return -1;
    if (!aIsSameCategory && bIsSameCategory) return 1;

    // 如果都是相同分类，按距离排序
    if (aIsSameCategory && bIsSameCategory) {
      return a.distance - b.distance;
    }

    // 如果都不是相同分类，按原有分类顺序排序
    const categoryDiff =
      (colorNameOrder[a.category] || 999) - (colorNameOrder[b.category] || 999);
    if (categoryDiff !== 0) {
      return categoryDiff;
    }

    // 同一分类内按距离排序（距离小的在前）
    return a.distance - b.distance;
  });

  console.log("Sorted colors:", result);

  return result.map((color) => color.original);
};
