import { ToolsAndBlogsList } from "@/components/tool-and-blog-list";
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
      <ToolsAndBlogsList showTypeIcon type="blog" data={palette.blogs} />
    </>
  );
};
