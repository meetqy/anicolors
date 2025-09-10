import type { Metadata } from "next";
import { getAssetUrl } from "@/lib/utils";
import { getClient } from "@/lib/apollo-client";
import { GET_TOOL, type ToolResponse } from "@/query/tool";
import { ToolWrapper, type Tools } from "./tools/tool-wrapper";
import { CommonBreadcrumb } from "@/components/common-breadcrumb";
import { ToolHero } from "./tool-hero";
import { fetchIncViews } from "@/lib/inc-views";

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
  fetchIncViews(tool.documentId, "tools");

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

  return (
    <>
      <div className="container">
        <CommonBreadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: tool.name },
          ]}
        />
      </div>
      <ToolHero tool={tool} />

      <ToolWrapper slug={slug as Tools} />
    </>
  );
}
