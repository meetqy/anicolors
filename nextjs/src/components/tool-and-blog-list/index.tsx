import type { BlogListResponse } from "@/query/blog";
import { BlogAndToolItemCard } from "./item-card";
import type { ToolListResponse } from "@/query/tool";
import { cn } from "@/lib/utils";

const basePath = {
  blog: "/blogs",
  tool: "/tools",
};

interface ToolsAndBlogsListProps {
  data: BlogListResponse["blogs"] | ToolListResponse["tools"];
  type?: keyof typeof basePath;
  className?: string;
}

export const ToolsAndBlogsList = ({
  data,
  type = "blog",
  className,
}: ToolsAndBlogsListProps) => {
  return (
    <div
      className={cn(
        "not-prose grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {data.map((item) => (
        <BlogAndToolItemCard
          key={item.slug}
          href={`${basePath[type]}/${item.slug}`}
          image={item.cover.url}
          title={"title" in item ? item.title : item.name}
          description={item.description}
          type={type}
        />
      ))}
    </div>
  );
};
