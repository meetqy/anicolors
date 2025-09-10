import { Hero } from "@/components/hero";
import { ToolsAndBlogsList } from "@/components/tool-and-blog-list";
import { getClient } from "@/lib/apollo-client";
import { GET_BLOG_LIST, type BlogListResponse } from "@/query/blog";
import type { Metadata } from "next";

const getData = async (page = 1) => {
  const res = await getClient().query<BlogListResponse>({
    query: GET_BLOG_LIST,
    variables: {
      pagination: { pageSize: 24, page },
    },
  });

  return res.data.blogs;
};

export const metadata: Metadata = {
  title: "Anime Colors Blogs",
  description:
    "Explore hair colors, eye colors, and outfit colors from your favorite anime and games. Find accurate HEX codes, color names, and design inspiration.",
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
        title="Anime Colors Blogs"
        description="Explore hair colors, eye colors, and outfit colors from your favorite anime and games. Find accurate HEX codes, color names, and design inspiration."
      />
      <div className="container mx-auto px-4 lg:px-0">
        <ToolsAndBlogsList data={data} type="blog" layout="columns" />
      </div>
    </>
  );
}
