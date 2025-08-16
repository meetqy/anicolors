import { Hero } from "@/components/hero";
import { ListItemCard } from "@/components/list-item-card";
import { getClient } from "@/lib/apollo-client";
import { getAssetUrl } from "@/lib/utils";
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
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.map((blog) => (
            <ListItemCard
              key={blog.slug}
              href={`/blogs/${blog.slug}`}
              image={{ src: getAssetUrl(blog.cover.url, 512), alt: blog.title }}
              title={blog.title}
              description={blog.description}
            />
          ))}
        </div>
      </div>
    </>
  );
}
