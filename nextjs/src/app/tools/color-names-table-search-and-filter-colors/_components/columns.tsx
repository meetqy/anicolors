"use client";

import { type ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Color = {
  name: string;
  hex: string;
};

const colorCategories = [
  { name: "Red", r: [150, 255], g: [0, 100], b: [0, 100] },
  { name: "Orange", r: [200, 255], g: [80, 150], b: [0, 100] },
  { name: "Yellow", r: [200, 255], g: [200, 255], b: [0, 150] },
  { name: "Green", r: [0, 150], g: [100, 255], b: [0, 150] },
  { name: "Blue", r: [0, 100], g: [0, 150], b: [150, 255] },
  { name: "Purple", r: [100, 200], g: [0, 120], b: [100, 255] },
  { name: "Pink", r: [200, 255], g: [100, 200], b: [150, 255] },
  { name: "Brown", r: [100, 180], g: [50, 120], b: [0, 80] },
  { name: "Gray", r: [80, 200], g: [80, 200], b: [80, 200] },
  { name: "Black", r: [0, 50], g: [0, 50], b: [0, 50] },
  { name: "White", r: [200, 255], g: [200, 255], b: [200, 255] },
  { name: "Cyan", r: [0, 100], g: [150, 255], b: [150, 255] },
  { name: "Teal", r: [0, 80], g: [100, 180], b: [100, 180] },
  { name: "Magenta", r: [150, 255], g: [0, 120], b: [150, 255] },
  { name: "Fuchsia", r: [200, 255], g: [0, 150], b: [200, 255] },
  { name: "Indigo", r: [50, 120], g: [0, 50], b: [100, 255] },
  { name: "Violet", r: [150, 200], g: [50, 100], b: [200, 255] },
  { name: "Beige", r: [220, 255], g: [200, 230], b: [150, 200] },
  { name: "Tan", r: [210, 245], g: [180, 220], b: [140, 180] },
  { name: "Cream", r: [240, 255], g: [230, 255], b: [200, 220] },
  { name: "Olive", r: [100, 160], g: [120, 180], b: [0, 80] },
  { name: "Maroon", r: [120, 180], g: [0, 50], b: [0, 50] },
  { name: "Navy", r: [0, 50], g: [0, 50], b: [100, 160] },
  { name: "Peach", r: [250, 255], g: [180, 220], b: [150, 200] },
  { name: "Mint", r: [180, 220], g: [255, 255], b: [180, 220] },
  { name: "Lavender", r: [200, 230], g: [180, 210], b: [250, 255] },
  { name: "Coral", r: [240, 255], g: [120, 180], b: [120, 180] },
  { name: "Gold", r: [200, 255], g: [170, 220], b: [0, 80] },
  { name: "Silver", r: [200, 255], g: [200, 255], b: [200, 255] },
];

function hexToCategory(hex: string): string {
  const rgb = hex.match(/\w\w/g)?.map((x) => parseInt(x, 16));
  if (!rgb || rgb.length !== 3) return "Other";
  const [r = 0, g = 0, b = 0] = rgb;

  for (const cat of colorCategories) {
    if (
      r >= cat.r[0]! &&
      r <= cat.r[1]! &&
      g >= cat.g[0]! &&
      g <= cat.g[1]! &&
      b >= cat.b[0]! &&
      b <= cat.b[1]!
    ) {
      return cat.name;
    }
  }
  return "Other";
}

export const columns: ColumnDef<Color>[] = [
  {
    id: "preview",
    accessorKey: "hex",
    header: "Preview",
    cell: (info) => (
      <div
        className="size-10 rounded-md"
        style={{ backgroundColor: String(info.getValue()) }}
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Color Name",
    cell: (info) => (
      <span className="capitalize">{String(info.getValue())}</span>
    ),
  },
  {
    id: "hex",
    accessorKey: "hex",
    header: "Hex",
    cell: (info) => (
      <span className="font-mono uppercase">{String(info.getValue())}</span>
    ),
  },
  {
    id: "category",
    accessorKey: "hex",
    header: "Category",
    cell: (info) => {
      return (
        <span className="capitalize">
          {hexToCategory(String(info.getValue()))}
        </span>
      );
    },
  },
];
