"use client";

import { useEffect, useState } from "react";
import { Generator } from "@/components/palette/generator";
import type { ColorPoint } from "@/components/palette/picker-colors";
import { useQuery } from "@apollo/client";
import { getAssetUrl } from "@/lib/utils";
import "react-photo-album/columns.css";
import { DomGallery } from "./dom-gallery";
import { GET_PALETTE, Palette } from "@/query/palette";

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
        <div className="flex items-center justify-center aspect-video bg-muted text-muted-foreground max-w-screen-lg mx-auto border rounded-md">Loading...</div>
      ) : (
        <Generator initialPoints={data?.palette.points || []} initialImage={image} onColorsChangeEnter={setPoints} onImageChange={setImage} />
      )}

      {image && <DomGallery image={image} points={points} id={id} gallery={data?.palette.gallery || []} />}
    </>
  );
};
