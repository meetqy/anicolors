import { sortColors } from "@/lib/sort-colors";
import quantize, { type RgbPixel } from "quantize";

export type ColorData = Awaited<
  ReturnType<typeof getPaletteWithPercentsFromImage>
>;

export async function getPaletteWithPercentsFromImage(
  imgEl: HTMLImageElement,
  colorCount = 8,
  sampleStep = 4,
) {
  // imgEl: 已经加载完成的 <img>
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  canvas.width = imgEl.naturalWidth;
  canvas.height = imgEl.naturalHeight;
  ctx.drawImage(imgEl, 0, 0);

  const { data, width, height } = ctx.getImageData(
    0,
    0,
    canvas.width,
    canvas.height,
  );
  const pixels = [];
  // 采样步长（越大越快、精度略降）
  for (let y = 0; y < height; y += sampleStep) {
    for (let x = 0; x < width; x += sampleStep) {
      const i = (y * width + x) * 4;
      const r = data[i],
        g = data[i + 1],
        b = data[i + 2],
        a = data[i + 3] ?? 0;
      if (a < 125) continue; // 忽略透明像素
      pixels.push([r, g, b]);
    }
  }

  const cmap = quantize(pixels as RgbPixel[], colorCount + 1);
  if (!cmap) return [];

  const palette = cmap.palette(); // [[r,g,b], ...]
  const indexOf = new Map(palette.map((rgb, i) => [rgb.join(","), i]));
  const counts = new Array(palette.length).fill(0);

  // 使用 quantize 的最近映射来计数
  for (const p of pixels) {
    const mapped = cmap.map(p as RgbPixel); // 返回聚类中心的 [r,g,b]
    const idx = indexOf.get(mapped.join(","));
    if (typeof idx === "number") {
      counts[idx]++;
    }
  }

  const total = counts.reduce((a, b) => a + b, 0) || 1;

  const colors = palette.map((rgb, i) => ({
    rgb,
    hex:
      "#" +
      rgb
        .map((v) => v.toString(16).padStart(2, "0"))
        .join("")
        .toUpperCase(),
    percent: +((counts[i] / total) * 100).toFixed(2),
  }));

  // 将颜色数据转换为 sortColorsByLightness 期望的格式
  const colorsForSorting = colors.map((color) => color.hex);
  const sortedHexColors = sortColors(colorsForSorting);

  // 根据排序后的hex顺序重新排列colors数组
  return sortedHexColors.map(
    (hex) => colors.find((color) => color.hex === hex)!,
  );
}
