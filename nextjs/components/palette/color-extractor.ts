import { getColorName } from "@/lib/nearest";
import Color from "color";
import { ColorPoint } from "@/components/palette/picker-colors";

// 计算两个颜色之间的距离
const colorDistance = (color1: number[], color2: number[]) => {
  const [r1, g1, b1] = color1;
  const [r2, g2, b2] = color2;
  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
};

export const extractMainColors = (
  canvas: HTMLCanvasElement,
  imageElement: HTMLImageElement,
  getNormalizedPosition: (displayX: number, displayY: number) => { x: number; y: number },
  count: number = 5
): ColorPoint[] => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return [];

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;

  // 收集所有像素颜色及其位置
  const colorMap = new Map<string, { count: number; positions: { x: number; y: number }[]; rgb: number[] }>();

  for (let y = 0; y < canvas.height; y += 8) {
    for (let x = 0; x < canvas.width; x += 8) {
      const i = (y * canvas.width + x) * 4;
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      const a = pixels[i + 3];

      if (a < 128) continue;

      // 排除黑色和白色附近的颜色
      const brightness = (r + g + b) / 3;
      if (brightness < 30 || brightness > 225) continue; // 排除过暗和过亮的颜色

      // 排除灰色调（RGB值差异太小的颜色）
      const maxRGB = Math.max(r, g, b);
      const minRGB = Math.min(r, g, b);
      if (maxRGB - minRGB < 20) continue; // 排除饱和度太低的颜色

      // 量化颜色
      const quantizedR = Math.round(r / 24) * 24;
      const quantizedG = Math.round(g / 24) * 24;
      const quantizedB = Math.round(b / 24) * 24;

      const colorKey = `${quantizedR},${quantizedG},${quantizedB}`;

      if (!colorMap.has(colorKey)) {
        colorMap.set(colorKey, { count: 0, positions: [], rgb: [quantizedR, quantizedG, quantizedB] });
      }

      const colorInfo = colorMap.get(colorKey)!;
      colorInfo.count++;
      colorInfo.positions.push({ x, y });
    }
  }

  // 先按频率筛选出候选颜色（至少出现一定次数）
  const candidateColors = Array.from(colorMap.entries())
    .filter(([_, info]) => info.count > 10)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, Math.min(20, colorMap.size));

  // 使用贪心算法选择差别最大的颜色
  const selectedColors: typeof candidateColors = [];

  if (candidateColors.length > 0) {
    // 先选择出现频率最高的颜色
    selectedColors.push(candidateColors[0]);

    // 依次选择与已选颜色差距最大的颜色
    while (selectedColors.length < count && selectedColors.length < candidateColors.length) {
      let maxMinDistance = 0;
      let bestColorIndex = -1;

      for (let i = 0; i < candidateColors.length; i++) {
        const candidate = candidateColors[i];

        // 跳过已选择的颜色
        if (selectedColors.some((selected) => selected[0] === candidate[0])) continue;

        // 计算与所有已选颜色的最小距离
        let minDistance = Infinity;
        for (const selected of selectedColors) {
          const distance = colorDistance(candidate[1].rgb, selected[1].rgb);
          minDistance = Math.min(minDistance, distance);
        }

        // 选择最小距离最大的颜色
        if (minDistance > maxMinDistance) {
          maxMinDistance = minDistance;
          bestColorIndex = i;
        }
      }

      if (bestColorIndex >= 0) {
        selectedColors.push(candidateColors[bestColorIndex]);
      } else {
        break;
      }
    }
  }

  return selectedColors.map((colorEntry, index) => {
    const [, colorInfo] = colorEntry;
    const [r, g, b] = colorInfo.rgb;

    // 选择该颜色的中心位置
    const positions = colorInfo.positions;
    const centerPos = positions[Math.floor(positions.length / 2)];

    // 转换为显示坐标系
    const rect = imageElement.getBoundingClientRect();
    const displayX = (centerPos.x / canvas.width) * rect.width;
    const displayY = (centerPos.y / canvas.height) * rect.height;

    // 转换为标准化坐标
    const normalizedPos = getNormalizedPosition(displayX, displayY);

    return {
      id: index + 1,
      x: normalizedPos.x,
      y: normalizedPos.y,
      color: `rgb(${r}, ${g}, ${b})`,
      name: getColorName(Color(`rgb(${r}, ${g}, ${b})`).hex())?.name || "unknown",
    };
  });
};
