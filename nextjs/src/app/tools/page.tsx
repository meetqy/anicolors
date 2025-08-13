import { Hero } from "@/components/hero";
import { getClient } from "@/lib/apollo-client";
import { getAssetUrl } from "@/lib/utils";
import { GET_TOOL_LIST, type ToolListResponse } from "@/query/tool";
import type { Metadata } from "next";
import Link from "next/link";

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
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.map((tool) => (
            <Link
              href={`/tools/${tool.slug}`}
              key={tool.slug}
              className="group bg-background overflow-hidden rounded-lg border transition-all hover:shadow-md"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={getAssetUrl(tool.cover.url, 512)}
                  alt={tool.name}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <div className="space-y-3">
                  <h2 className="line-clamp-2 text-xl leading-tight font-semibold tracking-tight">
                    {tool.name}
                  </h2>

                  <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
