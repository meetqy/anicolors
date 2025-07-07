import { cn, getAssetUrl } from "@/lib/utils";
import { timeAgo } from "@/lib/time-utils";
import { PaletteListItem } from "@/query/palette";
import Link from "next/link";

interface PaletteCardProps {
  palette: PaletteListItem;
}

export const PaletteCard = ({ palette }: PaletteCardProps) => {
  const isEndNumber = /\d$/.test(palette.documentId);
  return (
    <div className="relative ">
      <Link href={`/palettes/${palette.documentId}`} className="group">
        <div className="rounded-md relative" style={{ backgroundColor: palette.points[0].color }}>
          <img
            src={getAssetUrl(palette.image.url)}
            alt={palette.name}
            className={cn("w-full z-10 relative aspect-square object-contain group-hover:scale-125 transition-transform", isEndNumber ? "group-hover:rotate-6" : "group-hover:-rotate-6")}
          />
          <div className="flex w-full rounded-b-md overflow-hidden absolute bottom-0 left-0">
            {palette.points.map((point, index) => {
              return <div className="w-full h-3" key={index} style={{ backgroundColor: point.color }}></div>;
            })}
          </div>
        </div>
      </Link>
      <div className="py-2 flex justify-between items-center">
        <div>
          <h2 className="capitalize font-medium">{palette.name}</h2>
          <p className="text-muted-foreground capitalize text-sm">{palette.category}</p>
        </div>
        <time className="text-sm text-muted-foreground">{timeAgo(palette.createdAt)}</time>
      </div>
    </div>
  );
};
