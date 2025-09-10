import { getClient } from "@/lib/apollo-client";
import { getAssetUrl } from "@/lib/utils";
import { GET_BLOG, type BlogResponse } from "@/query/blog";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import remarkGfm from "remark-gfm";
import { ToolsAndBlogsList } from "@/components/tool-and-blog-list";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { CommonBreadcrumb } from "@/components/common-breadcrumb";
import { fetchIncViews } from "@/lib/inc-views";

/**
 * 通过路径字符串获取对象中的值
 * @param obj - 目标对象
 * @param path - 路径字符串，如 'a.b.c'
 * @returns 获取到的值，如果路径不存在则返回 undefined
 */
function getValueByPath<T = unknown>(
  obj: Record<string, unknown>,
  path: string,
): T | undefined {
  if (!obj || !path) return undefined;

  return path.split(".").reduce((current, key) => {
    if (
      current &&
      typeof current === "object" &&
      current !== null &&
      key in current
    ) {
      return (current as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj as unknown) as T | undefined;
}

const getData = async (slug: string) => {
  const res = await getClient().query<BlogResponse>({
    query: GET_BLOG,
    variables: {
      filters: { slug: { eqi: slug } },
      pagination: { pageSize: 999, page: 1 },
    },
  });

  if (!res.data.blogs.length) {
    notFound();
  }

  return res.data.blogs[0]!;
};

type PageProps = { params: Promise<{ slug: string }> };

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const blog = await getData(slug);
  const data = blog.palettes.map((palette) => {
    return {
      ...getValueByPath<{ color: string; name: string }>(palette, blog.field),
      character: palette.name,
      avatar: palette?.avatar?.url,
      image: palette.image.url,
      documentId: palette.documentId,
    };
  });

  fetchIncViews(blog.documentId, "blogs");

  const { useTypes = "field" } = blog;

  return (
    <>
      <div className="container">
        <CommonBreadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Blogs", href: "/blogs" },
            { label: blog.title },
          ]}
        />
      </div>
      <article className="container mx-auto py-24">
        <div className="prose mx-auto mb-12 max-w-screen-md text-center">
          <h1>{blog.title}</h1>
          <p>{blog.description}</p>
        </div>

        <div className="prose mx-auto max-w-screen-lg">
          {useTypes.includes("markdown") && (
            <MDXRemote
              source={blog.markdown}
              options={{
                mdxOptions: { remarkPlugins: [remarkGfm] },
              }}
            />
          )}

          <MDXRemote
            source={blog.markdown}
            options={{
              mdxOptions: { remarkPlugins: [remarkGfm] },
            }}
          />

          {useTypes.includes("field") && (
            <Table className="not-prose text-base">
              <TableHeader>
                <TableRow>
                  <TableHead>Character</TableHead>
                  <TableHead>Color Name</TableHead>
                  <TableHead>Hex</TableHead>
                  <TableHead>Swatch</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item.documentId}>
                    <TableCell>
                      <Link
                        href={`/palettes/${item.documentId}`}
                        className="inline-flex items-center gap-2 capitalize no-underline"
                      >
                        <img
                          className="not-prose size-12 rounded-full border"
                          src={item.avatar}
                          alt={item.character}
                          style={{
                            backgroundColor: item.color,
                          }}
                        />
                        {item.character}
                      </Link>
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell className="font-mono uppercase">
                      {item.color}
                    </TableCell>
                    <TableCell>
                      <div
                        className="size-12 rounded-md"
                        style={{ backgroundColor: item.color }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        {blog.tools.length > 0 && (
          <div className="prose mx-auto mt-24 max-w-screen-xl">
            <h2>Tools recommendation</h2>
            <ToolsAndBlogsList data={blog.tools} type="tool" showTypeIcon />
          </div>
        )}

        {blog.blogs.length > 0 && (
          <div className="prose mx-auto mt-24 max-w-screen-xl">
            <h2>Blogs recommendation</h2>
            <ToolsAndBlogsList data={blog.blogs} type="blog" showTypeIcon />
          </div>
        )}
      </article>
    </>
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getData(slug);
  const images = blog?.cover?.url && [getAssetUrl(blog.cover.url, 1200)];

  return {
    title: blog.title,
    description: blog.description,
    openGraph: { images },
    alternates: { canonical: `/blogs/${slug}` },
    twitter: {
      card: "summary_large_image",
      images,
    },
  };
}
