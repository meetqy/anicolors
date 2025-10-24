"use client";

import { useEffect, useState } from "react";
import type { ColorPoint } from "@/components/palette/picker-colors";
import { getAssetUrl } from "@/lib/utils";
import "react-photo-album/columns.css";
import { type Palette } from "@/query/palette";
import dynamic from "next/dynamic";

const DomGallery = dynamic(
  () => import("./dom-gallery").then((mod) => mod.DomGallery),
  { ssr: false },
);

const Generator = dynamic(
  () => import("@/components/palette/generator").then((mod) => mod.Generator),
  { ssr: false },
);

const PickerPart = dynamic(
  () =>
    import("@/components/palette/picker-part").then((mod) => mod.PickerPart),
  { ssr: false },
);

export const Maker = ({ palette }: { palette: Palette }) => {
  const [points, setPoints] = useState<ColorPoint[]>([]);

  const [image, setImage] = useState<string>();

  useEffect(() => {
    if (palette.image.url) {
      setImage(getAssetUrl(palette.image.url, 960));
    }
  }, [palette]);

  const initialPoints = palette.points || [];

  return (
    <>
      <PickerPart className="mb-6" colors={palette.extend?.parts} />
      <Generator
        initialPoints={initialPoints.length < 5 ? initialPoints : []}
        initialImage={image}
        onColorsChangeEnter={setPoints}
        onImageChange={setImage}
      />

      {image && (
        <DomGallery
          image={image}
          points={points}
          id={palette.documentId}
          gallery={palette.gallery ?? []}
        />
      )}
    </>
  );
};
