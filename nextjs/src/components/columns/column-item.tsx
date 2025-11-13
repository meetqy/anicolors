"use client";
import { cn, getAssetUrl } from "@/lib/utils";
import { timeAgo } from "@/lib/time-utils";
import { type PaletteListItem } from "@/query/palette";
import Link from "next/link";

interface PaletteCardProps {
  palette: PaletteListItem;
  as?: React.ElementType;
}

export const ColumnItem = ({ palette, as }: PaletteCardProps) => {
  const { points } = palette;

  const bgColor = points[0]!.color;
  const Element = as || "h2";

  return (
    <div className="relative w-full">
      <Link
        href={`/palettes/${palette.documentId}`}
        className="group"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
      >
        <div className="relative rounded-md">
          <div
            className="absolute bottom-0 left-1/2 h-full w-full -translate-x-1/2 rounded-md transition-all duration-300 group-hover:bottom-[-85px] group-hover:h-56 group-hover:w-56 group-hover:rotate-x-[80deg] group-hover:rounded-full"
            style={{
              backgroundColor: bgColor,
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            }}
          />
          {/* 额外的流畅背景层 */}
          <div
            style={{ backgroundColor: bgColor }}
            className="absolute inset-0 rounded-md opacity-100 transition-opacity duration-300 group-hover:opacity-0"
          />
          <img
            src={getAssetUrl(palette.image.url, 640)}
            alt={palette.name}
            className={cn(
              "relative z-10 aspect-square w-full object-contain transition-transform duration-300 group-hover:z-20 group-hover:translate-y-[-60px] group-hover:scale-130 group-hover:rotate-x-[15deg] group-hover:drop-shadow-2xl",
            )}
          />
          <div className="absolute bottom-0 left-0 flex w-full overflow-hidden rounded-b-md">
            {palette.points.slice(0, 5).map((point, index) => {
              return (
                <div
                  className="h-3 w-full"
                  key={index}
                  style={{ backgroundColor: point.color }}
                />
              );
            })}
          </div>
        </div>
      </Link>
      <div className="flex items-end justify-between py-2">
        <div>
          <Element className="line-clamp-1 font-medium capitalize">
            {palette.name}
          </Element>
          <Link
            href={`/categories/${palette.categoryExtend.slug}`}
            className="text-muted-foreground hover:text-foreground line-clamp-1 text-sm capitalize hover:underline"
          >
            {palette.categoryExtend.name}
          </Link>
        </div>
        <time
          suppressHydrationWarning
          className="text-muted-foreground shrink-0 text-sm"
        >
          {timeAgo(palette.createdAt)}
        </time>
      </div>
    </div>
  );
};
