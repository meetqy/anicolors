"use client";

import { Button } from "@/components/ui/button";
import { getAssetUrl } from "@/lib/utils";
import type { Palette, PaletteListItem } from "@/query/palette";
import { Separator } from "@/components/ui/separator";
import { TwitterIcon } from "lucide-react";
import Link from "next/link";
import { env } from "@/env";
import { MoreList } from "./more-list";
import { useEffect } from "react";
import { CommonBreadcrumb } from "@/components/common-breadcrumb";
import Color from "color";
import { Columns } from "@/components/columns";

export const FragmentPage = ({
  palette,
}: {
  palette: Palette & {
    mostLikes: PaletteListItem[];
    mostViews: PaletteListItem[];
    latests: PaletteListItem[];
  };
}) => {
  useEffect(() => {
    const header = document.querySelector("#header");
    header?.classList.remove("bg-background/90");
    header?.classList.add("bg-background");

    return () => {
      header?.classList.add("bg-background/90");
      header?.classList.remove("bg-background");
    };
  }, []);

  const title = `${palette.name} Color Palette`;

  return (
    <div className="min-h-[calc(100vh-4rem)] overflow-hidden pt-4 lg:pt-12">
      <>
        {/* 背景图片 - 降低透明度并添加模糊效果 */}
        <img
          src={getAssetUrl(palette.image.url, 960)}
          alt={`${palette.name} color palette`}
          className="fixed top-0 left-0 -z-10 size-full scale-105 object-cover blur-xl"
          style={{
            backgroundColor: palette.points[0]?.color,
          }}
        />
      </>

      <div className="relative z-10 container mx-auto space-y-4 pt-4 lg:space-y-12">
        <div className="bg-background/95 prose container rounded-md p-4 shadow-md backdrop-blur">
          <div className="max-w-full overflow-hidden">
            <div className="flex flex-col justify-between lg:flex-row">
              <div className="not-prose relative aspect-[4/3] w-full lg:w-3/5">
                <img
                  src={getAssetUrl(palette.cover.url, 960)}
                  alt={`${palette.name} color palette`}
                  className="size-full"
                />
              </div>

              <div className="flex-1 p-4">
                <CommonBreadcrumb
                  items={[
                    { label: "Home", href: "/" },
                    {
                      label: palette.category,
                      href: `/category/${palette.category}`,
                    },
                    { label: palette.name },
                  ]}
                />

                <h1 className="mt-8">{title}</h1>
                <div className="not-prose grid w-full grid-cols-4 gap-x-2 gap-y-4">
                  {palette.points.map((p, index) => (
                    <Link
                      href={`/color/${p.name}`}
                      key={index}
                      className="relative"
                    >
                      <div
                        className="aspect-video w-full"
                        style={{
                          backgroundColor: p.color,
                        }}
                      />
                      <div className="text-center font-mono uppercase">
                        {p.color}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="prose max-w-full">
            <h2>Colors in Palette </h2>
            <div className="not-prose grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-6">
              {palette.points.map((p, index) => {
                // 判断颜色亮度，决定文字颜色
                const isDark = Color(p.color).isDark();
                const textColor = isDark ? "text-white" : "text-black";

                return (
                  <div
                    key={index}
                    className="relative overflow-hidden rounded-xl"
                    style={{
                      backgroundColor: p.color,
                    }}
                  >
                    <div className="flex aspect-[4/5] w-full flex-col justify-between p-6">
                      {/* 顶部区域：颜色名称（主要） */}
                      <div className={`${textColor}`}>
                        <h3 className="text-2xl leading-7 font-black tracking-tight uppercase lg:text-3xl lg:leading-8">
                          <Link
                            href={`/color/${p.name}`}
                            className={`${textColor} transition-opacity hover:opacity-80`}
                          >
                            {p.name}
                          </Link>
                        </h3>
                      </div>

                      {/* 底部区域：HEX值和百分比 */}
                      <div className={`${textColor} space-y-2`}>
                        {/* HEX 值（次要但突出） */}
                        <div className="font-mono text-xl font-bold tracking-widest lg:text-2xl">
                          {p.color}
                        </div>

                        {/* 百分比（最小化） */}
                        <div className="flex items-center justify-between">
                          <div className="text-xs font-medium tracking-wider uppercase opacity-60">
                            Coverage
                          </div>
                          <div className="text-sm font-semibold opacity-70">
                            {p.percent === 0 ? "<0.01%" : `${p.percent}%`}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Separator className="my-4" />
          <div className="flex justify-end gap-4 px-4">
            <Button variant="default" asChild>
              <Link
                href={palette.cover.url}
                className="no-underline"
                download={`anicolors-${palette.name}`}
              >
                Download Color Palette
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link
                href={`/create?id=${palette.documentId}`}
                className="no-underline"
                aria-label="Create a custom color palette"
              >
                Customize the color extraction
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link
                href={`/tools/create-cinematic-color-palettes-with-colorpalette-cinema?id=${palette.documentId}`}
                className="no-underline"
                aria-label="Create a custom color palette"
              >
                Customize make color palette
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link
                target="_blank"
                className="no-underline"
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(palette.name + " Fragment Color Palette")}&url=${encodeURIComponent(`${env.NEXT_PUBLIC_SITE_URL}/palettes/${palette.documentId}`)}`}
              >
                <TwitterIcon /> Twitter
              </Link>
            </Button>
          </div>
        </div>

        <div className="bg-background/95 prose container mx-auto rounded-md border p-4 shadow-md backdrop-blur">
          <h2>Trending Anime Color Palettes</h2>
          <Columns as="h3" palettes={palette.mostLikes} />
        </div>

        <div className="bg-background/95 prose container mx-auto rounded-md border p-4 shadow-md backdrop-blur">
          <h2>Popular Anime Color Palettes</h2>
          <Columns as="h3" palettes={palette.mostViews} />
        </div>

        <div className="bg-background/95 prose container mx-auto rounded-md border p-4 shadow-md backdrop-blur">
          <h2>Latest Anime Color Palettes</h2>
          <Columns as="h3" palettes={palette.latests} />
        </div>

        <div className="bg-background/95 prose container mx-auto rounded-md border p-4 shadow-md backdrop-blur">
          <MoreList
            category={palette.category}
            colors={palette.points.map((item) => item.name!)}
          />
        </div>
      </div>
    </div>
  );
};
