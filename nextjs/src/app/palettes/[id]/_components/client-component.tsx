"use client";
import { getAssetUrl } from "@/lib/utils";
import type { Palette } from "@/query/palette";
import dynamic from "next/dynamic";

const PickerPart = dynamic(
  () =>
    import("@/components/palette/picker-part").then((mod) => mod.PickerPart),
  { ssr: false },
);

const Generator = dynamic(
  () => import("@/components/palette/generator").then((mod) => mod.Generator),
  { ssr: false },
);

const PaletteActions = dynamic(
  () => import("./actions").then((mod) => mod.PaletteActions),
  { ssr: false },
);

export const ClientComponent = ({ palette }: { palette: Palette }) => {
  const { points } = palette;
  const image = getAssetUrl(palette.image.url, 960);

  return (
    <>
      <PickerPart className="mb-6" colors={palette.extend?.parts} />
      <Generator initialPoints={points} initialImage={image} />
      <PaletteActions palette={palette} />
    </>
  );
};
