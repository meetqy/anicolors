import { ListItemCard } from "@/components/list-item-card";
import type { Palette } from "@/query/palette";

export const Blogs = ({ palette }: { palette: Palette }) => {
  if (!palette.blogs?.length) return null;

  return (
    <>
      <h2>Related Blog Posts About {palette.name}'s</h2>
      <p>
        Explore detailed color guides for {palette.name} and other Genshin
        characters.
      </p>
      <div className="not-prose grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {palette.blogs?.map((blog) => (
          <ListItemCard
            type="blog"
            href={`/blogs/${blog.slug}`}
            key={blog.slug}
            title={blog.title}
            description={blog.description}
            image={blog.cover.url}
          />
        ))}
      </div>
    </>
  );
};
