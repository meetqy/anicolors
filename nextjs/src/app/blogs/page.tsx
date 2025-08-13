import { Hero } from "@/components/hero";
import { getClient } from "@/lib/apollo-client";
import { getAssetUrl } from "@/lib/utils";
import { GET_BLOG_LIST, type BlogListResponse } from "@/query/blog";
import type { Metadata } from "next";
import Link from "next/link";

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
            <Link
              key={blog.slug}
              href={`/blogs/${blog.slug}`}
              className="group bg-background overflow-hidden rounded-lg border shadow-sm transition-all hover:shadow-md"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={getAssetUrl(blog.cover.url, 512)}
                  alt={blog.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <div className="space-y-3">
                  <h2 className="line-clamp-2 text-xl leading-tight font-semibold tracking-tight">
                    {blog.title}
                  </h2>

                  <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
                    {blog.description}
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <time
                      dateTime={blog.publishedAt}
                      className="text-muted-foreground text-xs"
                      suppressHydrationWarning
                    >
                      {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
