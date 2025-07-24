"use client";

import { useEffect, useMemo, useState } from "react";
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

  const image = useMemo(() => {
    if (data?.palette.image.url) {
      return getAssetUrl(data.palette.image.url, 960);
    }
    return undefined;
  }, [data]);

  useEffect(() => {
    if (data?.palette) {
      setPoints(data.palette.points);
    }
  }, [data]);

  const autoExtract = useMemo(() => {
    return !data?.palette && !loading;
  }, [loading, data]);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center aspect-video bg-muted text-muted-foreground max-w-screen-lg mx-auto border rounded-md">Loading...</div>
      ) : (
        <Generator initialPoints={points} initImage={image} autoExtract={autoExtract} />
      )}

      {image && <DomGallery image={image} points={points} id={id} gallery={data?.palette.gallery || []} />}
    </>
  );
};
