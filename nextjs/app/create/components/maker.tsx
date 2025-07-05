"use client";

import { useEffect, useRef, useState } from "react";
import { Generator } from "@/components/palette/generator";
import type { ColorPoint } from "@/components/palette/picker-colors";
import { useQuery } from "@apollo/client";
import { getAssetUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SaveableCardRef } from "@/components/card/with-save";
import "react-photo-album/columns.css";
import { DomGallery, DomGalleryRef } from "./dom-gallery";
import { CardColor1 } from "@/components/card/color/1";
import Landing from "./landing";
import { GET_PALETTE, Palette } from "@/query/palette";

export const Maker = ({ id }: { id: string }) => {
  const [points, setPoints] = useState<ColorPoint[]>([]);
  const [image, setImage] = useState<string>();
  const { data } = useQuery<{ palette: Palette }>(GET_PALETTE, {
    variables: { documentId: id },
    skip: !id,
  });

  // 使用 Map 来管理多个 palette refs
  const myRefs = useRef<Map<string, SaveableCardRef | DomGalleryRef>>(new Map());

  useEffect(() => {
    if (data?.palette) {
      setPoints(data.palette.points);
      setImage(getAssetUrl(data.palette.image.url));
    }
  }, [data, setImage]);

  const saveAllPalettes = async () => {
    const topicName = id ? `${id}-` : "";

    // 遍历所有 refs 并保存
    myRefs.current.forEach((ref, key) => {
      ref.saveAsImage(`${topicName}${key}.png`);
    });
  };

  return (
    <>
      <Generator initialPoints={points} initImage={image} onColorsChangeEnter={setPoints} onImageChange={setImage} />

      {points.length && image ? (
        <article className="prose mx-auto mt-12 max-w-screen-xl px-4 xl:px-0">
          <Button size={"lg"} onClick={saveAllPalettes}>
            Download All Assets
          </Button>

          <h2>Colors</h2>
          <div className="not-prose grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {points.map((item, index) => (
              <CardColor1
                ref={(ref) => {
                  if (ref) myRefs.current.set(`color-${index}`, ref);
                }}
                className="w-full"
                key={index}
                point={item}
                index={index}
              />
            ))}
          </div>

          <h2>Color Palette Gallery</h2>
          <div className="not-prose">
            {image && points.length > 0 && (
              <DomGallery
                ref={(ref) => {
                  if (ref) {
                    myRefs.current.set("dom-gallery", ref);
                  }
                }}
                image={image}
                points={points}
                id={id}
              />
            )}
          </div>
        </article>
      ) : null}

      <Landing />
    </>
  );
};
