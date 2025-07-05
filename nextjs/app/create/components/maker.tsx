"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Generator } from "@/components/palette/generator";
import type { ColorPoint } from "@/components/palette/picker-colors";
import { useQuery } from "@apollo/client";
import { GET_TOPIC, Topic } from "@/query/topic";
import { getAssetUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SaveableCardRef } from "@/components/card/with-save";
import "react-photo-album/columns.css";
import { DomGallery } from "./dom-gallery";
import { CardColor1 } from "@/components/card/color/1";

export const Maker = ({ topicId }: { topicId: string }) => {
  const [points, setPoints] = useState<ColorPoint[]>([]);
  const { data } = useQuery<{ topic: Topic }>(GET_TOPIC, {
    variables: { documentId: topicId },
    skip: !topicId,
  });

  // 使用 Map 来管理多个 palette refs
  const myRefs = useRef<Map<string, SaveableCardRef>>(new Map());

  useEffect(() => {
    if (data?.topic && data.topic.palettes[0]) {
      setPoints(data.topic.palettes[0].points);
    }
  }, [data]);

  const image = data?.topic?.image && getAssetUrl(data.topic.image.url);

  const saveAllPalettes = async () => {
    const topicName = topicId ? `${topicId}-` : "";

    // 遍历所有 refs 并保存
    myRefs.current.forEach((ref, key) => {
      ref?.saveAsImage(`${topicName}${key}.png`);
    });
  };

  return (
    <>
      <Generator initialPoints={points} initImage={image} onColorsChangeEnter={setPoints} />

      <article className="prose mx-auto mt-12 max-w-screen-xl px-4 xl:px-0">
        <Button size={"lg"} onClick={saveAllPalettes}>
          Download All Assets
        </Button>

        <h2>Colors</h2>
        <div className="not-prose grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {points.map((item, index) => (
            <CardColor1 className="w-full" key={index} point={item} index={index} />
          ))}
        </div>

        <h2>Color Palette Gallery</h2>
        <div className="not-prose">{image && points.length > 0 && <DomGallery image={image} points={points} />}</div>
      </article>
    </>
  );
};
