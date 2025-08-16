import { Generator } from "./generator";
import { getClient } from "@/lib/apollo-client";
import { GET_TOOL, type ToolResponse } from "@/query/tool";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAssetUrl } from "@/lib/utils";
import { ToolHero } from "@/components/tool-hero";

const getData = async () => {
  const res = await getClient().query<ToolResponse>({
    query: GET_TOOL,
    variables: {
      filters: {
        slug: {
          eqi: "change-svg-color",
        },
      },
    },
  });

  // if (!res.data.tools || res.data.tools.length === 0) {
  //   notFound();
  // }

  return res.data.tools[0]!;
};

export const generateMetadata = async (): Promise<Metadata> => {
  const tool = await getData();
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
  const tool = await getData();

  return (
    <>
      <ToolHero tool={tool} />

      <div className="from-muted/20 to-muted/0 text-card-foreground container rounded-lg bg-gradient-to-b lg:border">
        <Generator />
      </div>
    </>
  );
}
