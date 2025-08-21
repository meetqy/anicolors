import { getAssetUrl } from "@/lib/utils";
import { Rss, ToolCase } from "lucide-react";
import Link from "next/link";

export interface BlogAndToolItemCardProps {
  href: string;
  image: string;
  title: string;
  description: string;
  type?: "blog" | "tool";
  showTypeIcon?: boolean;
}

export const BlogAndToolItemCard = ({
  href,
  image,
  title,
  description,
  type,
  showTypeIcon,
}: BlogAndToolItemCardProps) => {
  return (
    <Link
      href={href}
      className="group bg-background relative inline-block overflow-hidden rounded-lg border transition-all hover:shadow-md"
    >
      {showTypeIcon && (
        <div className="bg-background/50 absolute top-2 right-2 z-10 rounded-full p-1 backdrop-blur-lg">
          {type === "blog" && <Rss className="text-background/80 size-4" />}
          {type === "tool" && (
            <ToolCase className="text-background/80 size-4" />
          )}
        </div>
      )}
      <CardImage src={getAssetUrl(image, 512)} alt={title} />
      <CardContent title={title} description={description} />
    </Link>
  );
};

const CardImage = ({ src, alt }: { src: string; alt: string }) => (
  <div className="aspect-video overflow-hidden">
    <img
      src={src}
      alt={alt}
      className="h-full w-full object-cover transition-transform group-hover:scale-105"
    />
  </div>
);

const CardContent = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="p-6">
    <div className="space-y-3">
      <h2 className="text-xl leading-tight font-semibold tracking-tight">
        {title}
      </h2>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);
