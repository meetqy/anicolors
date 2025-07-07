import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getAssetUrl } from "@/lib/utils";

interface PaletteCardProps {
  palette: {
    name: string;
    category: string;
    likes: number;
    cover: { url: string };
    points: Array<{ color: string; id: number }>;
  };
}

export const PaletteCard = ({ palette }: PaletteCardProps) => {
  return (
    <Link href={`/create?id=${palette.name}`}>
      <Card className="group hover:shadow-lg transition-shadow duration-200 overflow-hidden p-0">
        <div className="aspect-square relative">
          <Image src={getAssetUrl(palette.cover.url)} alt={palette.name} fill className="object-cover group-hover:scale-105 transition-transform duration-200" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="text-xs bg-white/90 text-black">
              {palette.category}
            </Badge>
          </div>

          {/* Likes */}
          <div className="absolute top-3 right-3">
            <div className="flex items-center gap-1 text-xs text-white bg-black/50 px-2 py-1 rounded-full">
              <Heart className="w-3 h-3" />
              <span>{palette.likes}</span>
            </div>
          </div>
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2">{palette.name}</h3>
        </CardContent>
      </Card>
    </Link>
  );
};
