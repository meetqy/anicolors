"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { hexToCategory } from "./utils";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Color = {
  name: string;
  hex: string;
};

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
