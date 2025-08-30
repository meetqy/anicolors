"use client";

import { useEffect, useState } from "react";
import type { ColorPoint } from "@/components/palette/picker-colors";
import { useQuery } from "@apollo/client";
import { getAssetUrl } from "@/lib/utils";
import "react-photo-album/columns.css";
import { GET_PALETTE, type Palette } from "@/query/palette";
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

export const Maker = ({ id }: { id: string }) => {
  const [points, setPoints] = useState<ColorPoint[]>([]);
  const { data, loading } = useQuery<{ palette: Palette }>(GET_PALETTE, {
    variables: { documentId: id, pagination: { pageSize: 100, page: 1 } },
  });

  const [image, setImage] = useState<string>();

  useEffect(() => {
    if (data?.palette.image.url) {
      setImage(getAssetUrl(data.palette.image.url, 960));
    }
  }, [data]);

  const initialPoints = data?.palette.points || [];

  return (
    <>
      {loading ? (
        <div className="bg-muted text-muted-foreground mx-auto flex aspect-video max-w-screen-lg items-center justify-center rounded-md border">
          Loading...
        </div>
      ) : (
        <>
          <PickerPart className="mb-6" colors={data?.palette.extend?.parts} />
          <Generator
            initialPoints={initialPoints.length < 5 ? initialPoints : []}
            initialImage={image}
            onColorsChangeEnter={setPoints}
            onImageChange={setImage}
          />
        </>
      )}

      {image && (
        <DomGallery
          image={image}
          points={points}
          id={id}
          gallery={data?.palette.gallery ?? []}
        />
      )}
    </>
  );
};
