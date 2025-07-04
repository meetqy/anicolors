"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Generator } from "@/components/palette/generator";
import type { ColorPoint } from "@/components/palette/picker-colors";
import { useQuery } from "@apollo/client";
import { GET_TOPIC, Topic } from "@/query/topic";
import { getAssetUrl } from "@/lib/utils";
import { CardPalette1 } from "@/components/card/palette/1";
import { Button } from "@/components/ui/button";
import { SaveableCardRef } from "@/components/card/with-save";
import { CardPalette2 } from "@/components/card/palette/2";
import { CardColorGradientLighten } from "@/components/card/color/gradient";
import { ColumnsPhotoAlbum } from "react-photo-album";
import "react-photo-album/columns.css";

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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const image = data?.topic?.image && getAssetUrl(data.topic.image.url);

  const saveAllPalettes = async () => {
    const topicName = topicId ? `${topicId}-` : "";

    // 遍历所有 refs 并保存
    myRefs.current.forEach((ref, key) => {
      ref?.saveAsImage(`${topicName}${key}.png`);
    });
  };

  // 创建 photo album 数据
  const photos =
    image && points.length > 0
      ? [
          {
            src: "1",
            width: 3, // CardPalette1 实际宽度
            height: 4, // CardPalette1 实际高度 (3:4 比例)
            component: (
              <CardPalette1
                className="w-full"
                ref={(ref) => {
                  if (ref) myRefs.current.set("palette1", ref);
                }}
                points={points}
                image={image}
              />
            ),
          },
          {
            src: "2",
            width: 16, // CardPalette2 实际宽度
            height: 9, // CardPalette2 实际高度 (16:9 比例)
            component: (
              <CardPalette2
                ref={(ref) => {
                  if (ref) myRefs.current.set("palette2", ref);
                }}
                className="w-full"
                points={points}
                image={image}
              />
            ),
          },
          ...points.map((e) => ({
            src: `3-${e.id}`,
            width: 360, // CardColorGradientLighten 实际宽度
            height: 540, // CardColorGradientLighten 实际高度
            component: (
              <CardColorGradientLighten
                ref={(ref) => {
                  if (ref) myRefs.current.set(`gradient-lighten-${e.id}`, ref);
                }}
                className="w-full"
                point={e}
                key={e.id}
              />
            ),
          })),
        ]
      : [];

  return (
    <>
      <Generator initialPoints={points} initImage={image} onColorsChangeEnter={setPoints} />

      <article className="prose mx-auto mt-12 max-w-screen-xl px-4 xl:px-0">
        <Button size={"lg"} onClick={saveAllPalettes}>
          Download All Assets
        </Button>
        <h2>Color Palette Gallery</h2>
        <div className="not-prose">
          <ColumnsPhotoAlbum
            photos={photos}
            render={{
              image: (props, context) => {
                // 获取 ColumnsPhotoAlbum 计算的显示宽度
                const displayWidth = props.style?.width ? parseFloat(props.style.width as string) : context.photo.width;
                // 计算缩放比例：显示宽度 / 原始宽度
                const scale = displayWidth / context.photo.width;

                return (
                  <div
                    style={{
                      transform: `scale(${scale})`,
                      transformOrigin: "top left",
                      width: context.photo.width,
                      height: context.photo.height,
                    }}
                  >
                    {context.photo.component}
                  </div>
                );
              },
            }}
          />
        </div>
      </article>
    </>
  );
};
