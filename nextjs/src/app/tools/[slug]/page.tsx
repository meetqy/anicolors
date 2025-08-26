import type { Metadata } from "next";
import { getAssetUrl } from "@/lib/utils";
import { ToolHero } from "@/components/tool-hero";
import { getClient } from "@/lib/apollo-client";
import { GET_TOOL, type ToolResponse } from "@/query/tool";
import toolComponents from "./tools";

type Props = {
  params: Promise<{ slug: string }>;
};

const getToolData = async (slug: string) => {
  const res = await getClient().query<ToolResponse>({
    query: GET_TOOL,
    variables: {
      filters: {
        slug: { eq: slug },
      },
    },
  });

  return res.data.tools[0]!;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { slug } = await params;
  const tool = await getToolData(slug);
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

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const tool = await getToolData(slug);

  const Component = toolComponents[slug as keyof typeof toolComponents];

  return (
    <>
      <ToolHero tool={tool} />

      <div className="from-muted/20 to-muted/0 text-card-foreground container rounded-lg bg-gradient-to-b lg:border">
        <Component />
      </div>
    </>
  );
}
