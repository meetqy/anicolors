import { Hero } from "@/components/hero";
import { ToolsAndBlogsList } from "@/components/tool-and-blog-list";
import { getClient } from "@/lib/apollo-client";
import { GET_TOOL_LIST, type ToolListResponse } from "@/query/tool";
import type { Metadata } from "next";

const getData = async (page = 1) => {
  const res = await getClient().query<ToolListResponse>({
    query: GET_TOOL_LIST,
    variables: {
      pagination: { pageSize: 24, page },
    },
  });

  return res.data.tools;
};

export const metadata: Metadata = {
  title: "Anime Colors Tools",
  description:
    "Create anime color palettes, swap character colors, design gradient cards, and check color accessibility—all in one place for artists and anime fans.",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page: number }>;
}) {
  const { page } = await searchParams;

  const data = await getData(page);

  return (
    <>
      <Hero
        title="Anime Colors Tools"
        description="Create anime color palettes, swap character colors, design gradient cards, and check color accessibility—all in one place for artists and anime fans."
      />
      <div className="container mx-auto px-4 lg:px-0">
        <ToolsAndBlogsList data={data} type="tool" />
      </div>
    </>
  );
}
