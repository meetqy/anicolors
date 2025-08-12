import { env } from "@/env";

export async function GET() {
  const sitemapResponse = await fetch(
    `${env.NEXT_PUBLIC_API_URL}/api/strapi-5-sitemap-plugin/sitemap.xml`,
    { next: { revalidate: 86400 } },
  );

  const xml = await sitemapResponse.text();
  const response = new Response(xml, {
    status: 200,
    statusText: "ok",
  });
  response.headers.append("content-type", "text/xml");

  return response;
}
