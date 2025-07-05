"use client";

import { useEffect, useRef, useState } from "react";
import { Generator } from "@/components/palette/generator";
import type { ColorPoint } from "@/components/palette/picker-colors";
import { useQuery } from "@apollo/client";
import { getAssetUrl } from "@/lib/utils";
import "react-photo-album/columns.css";
import { DomGallery } from "./dom-gallery";
import Landing from "./landing";
import { GET_PALETTE, Palette } from "@/query/palette";

export const Maker = ({ id }: { id: string }) => {
  const [points, setPoints] = useState<ColorPoint[]>([]);
  const [image, setImage] = useState<string>();
  const { data } = useQuery<{ palette: Palette }>(GET_PALETTE, {
    variables: { documentId: id },
    skip: !id,
  });

  useEffect(() => {
    if (data?.palette) {
      setPoints(data.palette.points);
      setImage(getAssetUrl(data.palette.image.url));
    }
  }, [data, setImage]);

  return (
    <>
      <Generator initialPoints={points} initImage={image} onColorsChangeEnter={setPoints} onImageChange={setImage} />

      {image && <DomGallery image={image} points={points} id={id} />}

      <Landing />
    </>
  );
};
