"use client";

import { Button } from "@/components/ui/button";
import { getAssetUrl } from "@/lib/utils";
import type { Palette } from "@/query/palette";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { TwitterIcon } from "lucide-react";
import Link from "next/link";
import { env } from "@/env";
import { MoreList } from "./more-list";
import { useEffect } from "react";
import { CommonBreadcrumb } from "@/components/common-breadcrumb";
import Color from "color";

export const FragmentPage = ({ palette }: { palette: Palette }) => {
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
          alt={`${palette.name} background image`}
          className="fixed top-0 left-0 -z-10 size-full scale-105 object-cover blur-xl"
        />
      </>

      <div className="relative z-10 container mx-auto space-y-4 pt-4 lg:space-y-12">
        <div className="bg-background/95 prose flex max-w-full flex-col justify-between overflow-hidden rounded-md border shadow-md backdrop-blur lg:flex-row">
          <div className="not-prose relative aspect-[4/3] w-full lg:w-3/5">
            <Image
              src={getAssetUrl(palette.cover.url, 960)}
              alt={`${palette.name} color palette`}
              fill
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
                <div key={index} className="relative">
                  <div
                    className="aspect-video w-full"
                    style={{
                      backgroundColor: p.color,
                    }}
                  />
                  <div className="text-center font-mono uppercase">
                    {p.color}
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="flex gap-4">
              <Button variant="default" asChild>
                <Link
                  href={palette.cover.url}
                  className="no-underline"
                  download={`anicolors-${palette.name}`}
                >
                  Download Palette
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
        </div>

        <div className="bg-background/95 prose container mx-auto rounded-md p-4 shadow-md backdrop-blur">
          <h2>Color Palette</h2>
          <div className="not-prose grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {palette.points.map((p, index) => {
              const isDark = Color(p.color).isDark();

              return (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-md"
                  style={{
                    backgroundColor: p.color,
                  }}
                >
                  <div className="aspect-[3/2] w-full" />
                  <div
                    className="p-4"
                    style={{
                      backgroundColor: isDark
                        ? "rgba(255, 255, 255, 0.9)"
                        : "rgba(0, 0, 0, 0.9)",
                      color: isDark ? "#000" : "#fff",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-mono text-lg font-semibold tracking-wider">
                          {p.color}
                        </h3>
                        <p className="text-sm capitalize opacity-75">
                          {p.name}
                        </p>
                      </div>

                      {/* 占比显示 */}
                      <div className="text-right">
                        <div className="text-2xl font-bold">
                          {p.percent === 0 ? "<0.01%" : `${p.percent}%`}
                        </div>
                        <div className="text-xs opacity-60">percent</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-background/95 prose container mx-auto rounded-md p-4 shadow-md backdrop-blur">
          <MoreList
            category={palette.category}
            colors={palette.points.map((item) => item.name!)}
          />
        </div>
      </div>
    </div>
  );
};
