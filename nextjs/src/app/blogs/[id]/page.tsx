import { getClient } from "@/lib/apollo-client";
import { getAssetUrl } from "@/lib/utils";
import { GET_BLOG, type BlogResponse } from "@/query/blog";
import type { Metadata } from "next";
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

const getData = async (id: string) => {
  const res = await getClient().query<BlogResponse>({
    query: GET_BLOG,
    variables: {
      documentId: id,
      pagination: { pageSize: 100 },
    },
  });

  if (!res.data.blog) {
    notFound();
  }

  return res.data.blog;
};

type PageProps = { params: Promise<{ id: string }> };

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const blog = await getData(id);
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
    <article className="container mx-auto py-24">
      <div className="mx-auto mb-12 max-w-screen-md text-center">
        <h1 className="h1">{blog.title}</h1>
        <p className="p">{blog.description}</p>
      </div>

      <table className="prose prose-th:text-center prose-td:text-center mx-auto w-full text-center">
        <thead>
          <tr>
            <th>Character</th>
            <th className="capitalize">{blog.field.split(".").pop()} Color</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="flex flex-col items-center justify-center gap-2 capitalize">
                <img
                  className="not-prose size-16 rounded-full border bg-black"
                  src={item.avatar}
                  alt={item.character}
                />
              </td>
              <td className="not-prose">
                <div
                  className="mx-auto flex h-10 w-2/3 items-center gap-2 rounded-md pl-4"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
                <p className="mx-auto flex w-2/3 justify-end gap-4 text-right">
                  <span>{item.name}</span>
                  <span className="font-mono uppercase">{item.color}</span>
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const blog = await getData(id);
  const images = blog?.cover?.url && [getAssetUrl(blog.cover.url, 1200)];

  return {
    title: blog.title,
    description: blog.description,
    openGraph: { images },
    twitter: {
      card: "summary_large_image",
      images,
    },
  };
}
