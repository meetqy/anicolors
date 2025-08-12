import { getClient } from "@/lib/apollo-client";
import { getAssetUrl } from "@/lib/utils";
import { GET_BLOG, type BlogResponse } from "@/query/blog";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

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

  return (
    <article className="prose container mx-auto py-24">
      <div className="mx-auto mb-12 max-w-screen-md text-center">
        <h1>{blog.title}</h1>
        <p>{blog.description}</p>
      </div>

      <div className="not-prose grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {data.map((item) => (
          <div key={item.documentId} className="flex flex-col items-center">
            <Link href={`/palettes/${item.documentId}`}>
              <img
                className="not-prose size-24 rounded-full border"
                src={item.avatar}
                alt={item.character}
                style={{
                  backgroundColor: item.color,
                }}
              />
            </Link>
            <div className="mt-2 text-center">
              <p className="text-muted-foreground text-sm capitalize">
                {item.character}
              </p>
              <p className="font-mono uppercase">{item.color}</p>
            </div>
          </div>
        ))}
      </div>
    </article>
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
