"use client";
import { Button } from "@/components/ui/button";
import { getAssetUrl } from "@/lib/utils";
import { type Palette } from "@/query/palette";
import { Download } from "lucide-react";
import Link from "next/link";
import { ColumnsPhotoAlbum } from "react-photo-album";
import "react-photo-album/columns.css";

export const Gallery = ({ palette }: { palette: Palette }) => {
  return (
    <div className="not-prose">
      <ColumnsPhotoAlbum
        columns={(containerWidth) => {
          if (containerWidth < 768) return 2;
          if (containerWidth < 1024) return 3;
          return 4;
        }}
        componentsProps={() => ({
          image: {
            className: "rounded-md overflow-hidden",
          },
        })}
        photos={palette.gallery.map((item) => {
          // 删除_和后面的部分
          // 例如: "image_123.jpg" -> "image"
          const alt = item.url
            .split("/")
            .pop()
            ?.split("_")
            .slice(0, -1)
            .join(" ");

          return {
            src: item.url,
            width: item.width,
            height: item.height,
            alt,
          };
        })}
        render={{
          image: (props) => {
            const src = props.src as string;
            const filename = src.split("/").pop() ?? "image";
            // 删除 filename 中最后一个_和后面的部分
            const cleanedFilename = filename.split("_").slice(0, -1).join("_");

            return (
              <div className="group relative overflow-hidden rounded-md">
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-all duration-200 group-hover:opacity-100">
                  <div className="grid space-y-2 text-center">
                    <div className="font-mono text-sm text-white opacity-80">
                      File: {cleanedFilename}
                    </div>
                    <Button
                      variant="secondary"
                      asChild
                      size="sm"
                      className="border-white/20 bg-white/20 text-white hover:bg-white/30"
                    >
                      <Link href={src}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Link>
                    </Button>
                    {src.includes("color_") && (
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/create/color-card?layout=1`}>
                          Create Card
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
                <img
                  {...props}
                  alt={`${palette.name} color palette from ${palette.category} ${props.alt}`}
                  src={getAssetUrl(src, 320)}
                  srcSet={`
              ${getAssetUrl(src, 320)} 1x,
              ${getAssetUrl(src, 640)} 2x,
              ${getAssetUrl(src, 960)} 3x
            `}
                />
              </div>
            );
          },
        }}
      />
    </div>
  );
};
