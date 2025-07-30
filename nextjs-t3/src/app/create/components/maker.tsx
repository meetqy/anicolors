"use client";

import { useEffect, useState } from "react";
import { Generator } from "@/components/palette/generator";
import type { ColorPoint } from "@/components/palette/picker-colors";
import { useQuery } from "@apollo/client";
import { getAssetUrl } from "@/lib/utils";
import "react-photo-album/columns.css";
import { DomGallery } from "./dom-gallery";
import { GET_PALETTE, type Palette, type PartColors } from "@/query/palette";
import { PickerPart } from "@/components/palette/picker-part";

export const Maker = ({ id }: { id: string }) => {
  const [points, setPoints] = useState<ColorPoint[]>([]);
  const { data, loading } = useQuery<{ palette: Palette }>(GET_PALETTE, {
    variables: { documentId: id },
  });

  const [image, setImage] = useState<string>();

  useEffect(() => {
    if (data?.palette.image.url) {
      setImage(getAssetUrl(data.palette.image.url, 960));
    }
  }, [data]);

  return (
    <>
      {loading ? (
        <div className="bg-muted text-muted-foreground mx-auto flex aspect-video max-w-screen-lg items-center justify-center rounded-md border">
          Loading...
        </div>
      ) : (
        <>
          <PickerPart
            className="mb-6"
            colors={data?.palette.extend?.parts}
          />
          <Generator
            initialPoints={data?.palette.points || []}
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
          gallery={data?.palette.gallery || []}
        />
      )}
    </>
  );
};
