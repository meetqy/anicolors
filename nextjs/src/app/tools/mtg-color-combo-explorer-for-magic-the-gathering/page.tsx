import { Generator } from "./generator";

import type { Metadata } from "next";
import { getAssetUrl } from "@/lib/utils";
import { ToolHero } from "@/components/tool-hero";
import { getToolData } from "../_utils";
import { ToolsAndBlogsList } from "@/components/tool-and-blog-list";

export const generateMetadata = async (): Promise<Metadata> => {
  const tool = await getToolData(
    "mtg-color-combo-explorer-for-magic-the-gathering",
  );
  const images = tool.cover ? [getAssetUrl(tool.cover.url, 1200)] : [];

  return {
    title: tool.name,
    description: tool.description,
    twitter: { card: "summary_large_image", images },
    openGraph: { images },
    alternates: {
      canonical: `/tools/${tool.slug}`,
    },
  };
};

export default async function Page() {
  const tool = await getToolData(
    "mtg-color-combo-explorer-for-magic-the-gathering",
  );

  return (
    <>
      <ToolHero tool={tool} />

      <div className="from-muted/20 to-muted/0 text-card-foreground container rounded-lg bg-gradient-to-b lg:border">
        <Generator />
      </div>

      <div className="container mx-auto px-4 lg:px-0">
        <ToolsAndBlogsList data={tool.blogs} type="blog" />
      </div>
    </>
  );
}
