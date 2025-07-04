"use client";

import Color from "color";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Generator } from "@/components/palette/generator";
import type { ColorPoint } from "@/components/palette/picker-colors";
import { getColorName } from "@/lib/nearest";
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
            src: "", // ColumnsPhotoAlbum 需要 src，但我们会用自定义渲染
            width: 3,
            height: 4,
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
            src: "",
            width: 16,
            height: 9,
            component: (
              <CardPalette2
                className="w-full"
                ref={(ref) => {
                  if (ref) myRefs.current.set("palette2", ref);
                }}
                points={points}
                image={image}
              />
            ),
          },
          ...points.map((e) => ({
            src: "",
            width: 4,
            height: 5,
            component: (
              <CardColorGradientLighten
                className="w-full"
                ref={(ref) => {
                  if (ref) myRefs.current.set(`gradient-lighten-${e.id}`, ref);
                }}
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
        <h2>Colors</h2>
        <div className="not-prose grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {points.map((item, index) => {
            const color = Color(item.color);
            const rgb = color.rgb().string();
            const cmyk = color.cmyk().string();
            const hex = color.hex();
            const colorName = getColorName(hex)?.name || "Unknown";

            return (
              <div key={index} className="bg-card overflow-hidden rounded-lg border">
                {/* Color preview bar */}
                <div className="relative flex h-24 w-full items-center justify-between px-6" style={{ backgroundColor: item.color }}>
                  <h3
                    className="text-lg font-medium"
                    style={{
                      color: color.isDark() ? "white" : "black",
                    }}
                  >
                    {colorName}
                  </h3>
                  <span
                    className="text-sm opacity-75"
                    style={{
                      color: color.isDark() ? "white" : "black",
                    }}
                  >
                    #{index + 1}
                  </span>
                </div>

                {/* Color values */}
                <div className="space-y-3 p-4">
                  <button
                    onClick={() => copyToClipboard(hex)}
                    className="bg-muted border-muted hover:border-primary flex w-full cursor-pointer items-center justify-between rounded-md border p-3 transition-colors"
                  >
                    <div className="text-left">
                      <div className="text-muted-foreground text-xs font-medium tracking-wider uppercase">HEX</div>
                      <div className="font-mono text-sm font-medium">{hex}</div>
                    </div>
                  </button>

                  <button
                    onClick={() => copyToClipboard(rgb)}
                    className="bg-muted border-muted hover:border-primary flex w-full cursor-pointer items-center justify-between rounded-md border p-3 transition-colors"
                  >
                    <div className="text-left">
                      <div className="text-muted-foreground text-xs font-medium tracking-wider uppercase">RGB</div>
                      <div className="font-mono text-sm font-medium">{rgb}</div>
                    </div>
                  </button>

                  <button
                    onClick={() => copyToClipboard(cmyk)}
                    className="bg-muted border-muted hover:border-primary flex w-full cursor-pointer items-center justify-between rounded-md border p-3 transition-colors"
                  >
                    <div className="text-left">
                      <div className="text-muted-foreground text-xs font-medium tracking-wider uppercase">CMYK</div>
                      <div className="truncate font-mono text-sm font-medium">{cmyk}</div>
                    </div>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <h2>Color Palette Gallery</h2>
        <div className="not-prose">
          <ColumnsPhotoAlbum
            photos={photos}
            render={{
              photo: (props, context) => context.photo.component,
            }}
          />
        </div>
      </article>
    </>
  );
};
