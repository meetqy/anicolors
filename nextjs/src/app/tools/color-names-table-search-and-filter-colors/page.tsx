import { Generator } from "./generator";
import type { Metadata } from "next";
import { getAssetUrl } from "@/lib/utils";
import { ToolHero } from "@/components/tool-hero";
import { getToolData } from "../_utils";

interface Props {
  searchParams: Promise<{ name: string }>;
}

const handleToolData = async ({ searchParams }: Props) => {
  const tool = await getToolData("color-names-table-search-and-filter-colors");
  const { name } = await searchParams;

  return {
    ...tool,
    name: name ? `${name} Color Names` : tool.name,
    description: name
      ? `Search and filter color names related to "${name}"`
      : tool.description,
  };
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const tool = await handleToolData(props);
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

export default async function Page(props: Props) {
  const tool = await handleToolData(props);

  return (
    <>
      <ToolHero tool={tool} />

      <div className="from-muted/20 to-muted/0 text-card-foreground container rounded-lg bg-gradient-to-b">
        <Generator />
      </div>
    </>
  );
}
