import { categoryRedirects } from "@/redirects/category";
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
    categoryRedirects[decodedSlug as keyof typeof categoryRedirects] || "";

  if (redirectSlug) {
    permanentRedirect(`/category/${redirectSlug as string}`);
  }

  return <>{children}</>;
}
