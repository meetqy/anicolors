import { Generator } from "./_components/generator";
import type { Metadata } from "next";
import { getAssetUrl } from "@/lib/utils";
import { ToolHero } from "@/components/tool-hero";
import { getToolData } from "../_utils";

export const generateMetadata = async (): Promise<Metadata> => {
  const tool = await getToolData(
    "quick-cinematic-palettes-for-colorpalette-cinema",
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
    "quick-cinematic-palettes-for-colorpalette-cinema",
  );

  return (
    <>
      <ToolHero tool={tool} />

      <div className="from-muted/20 to-muted/0 text-card-foreground container rounded-lg bg-gradient-to-b lg:border">
        <Generator />
      </div>
    </>
  );
}
