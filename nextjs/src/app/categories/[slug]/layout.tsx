import categoryRedirects from "@/redirects/category.json";
import { permanentRedirect } from "next/navigation";

export default async function CategoryLayout({
  params,
  children,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const redirectSlug =
    categoryRedirects[decodedSlug as keyof typeof categoryRedirects];

  if (redirectSlug) {
    permanentRedirect(`/categories/${redirectSlug}`);
  }

  return <>{children}</>;
}
