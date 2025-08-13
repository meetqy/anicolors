import nearestColor from "nearest-color";
import { colornames } from "color-name-list";

// nearestColor expects an object {name => hex}
const colors = colornames.reduce(
  (o, { name, hex }) => Object.assign(o, { [name]: hex }),
  {},
);

const nearest = nearestColor.from(colors);

export const getColorName = (color: string) => nearest(color);

// 根据颜色名称获取 hex 值
export const getHexByName = (colorName: string): string | null => {
  // 将输入转换为小写进行匹配
  const normalizedName = colorName.toLowerCase().trim();

  // 精确匹配
  const exactMatch = colornames.find(
    (color) => color.name.toLowerCase() === normalizedName,
  );

  if (exactMatch) {
    return exactMatch.hex;
  }

  // 模糊匹配（包含关系）
  const fuzzyMatch = colornames.find(
    (color) =>
      color.name.toLowerCase().includes(normalizedName) ||
      normalizedName.includes(color.name.toLowerCase()),
  );

  if (fuzzyMatch) {
    return fuzzyMatch.hex;
  }

  // 如果都找不到，返回 null
  return null;
};

// 获取所有包含某个关键词的颜色
export const getColorsByKeyword = (keyword: string) => {
  const normalizedKeyword = keyword.toLowerCase().trim();

  return colornames.filter((color) =>
    color.name.toLowerCase().includes(normalizedKeyword),
  );
};
