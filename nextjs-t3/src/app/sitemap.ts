import { env } from "@/env";
import { getAssetUrl } from "@/lib/utils";
import { type MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base: MetadataRoute.Sitemap = [
    {
      url: env.NEXT_PUBLIC_SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${env.NEXT_PUBLIC_SITE_URL}/palettes`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${env.NEXT_PUBLIC_SITE_URL}/create`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/api/strapi-5-sitemap-plugin/sitemap.xml`,
      {
        next: { revalidate: 86400 }, // Cache for 1 day
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch sitemap from Strapi");
    }

    const xmlText = await response.text();

    // Parse XML and extract URLs
    const urlMatches = xmlText.match(/<url>[\s\S]*?<\/url>/g) ?? [];

    const palettesMap: MetadataRoute.Sitemap = urlMatches
      .map((urlBlock) => {
        const locMatch = /<loc>(.*?)<\/loc>/.exec(urlBlock);
        const lastmodMatch = /<lastmod>(.*?)<\/lastmod>/.exec(urlBlock);
        const changefreqMatch = /<changefreq>(.*?)<\/changefreq>/.exec(
          urlBlock,
        );
        const priorityMatch = /<priority>(.*?)<\/priority>/.exec(urlBlock);
        const imagesMatch =
          urlBlock.match(/<image:loc>(.*?)<\/image:loc>/g) ?? [];

        return {
          url: locMatch?.[1] ?? "",
          lastModified: lastmodMatch?.[1]
            ? new Date(lastmodMatch[1])
            : new Date(),
          changeFrequency:
            (changefreqMatch?.[1] as MetadataRoute.Sitemap[number]["changeFrequency"]) ??
            "weekly",
          priority: priorityMatch?.[1] ? parseFloat(priorityMatch[1]) : 0.5,
          images: imagesMatch.map((img) => {
            return getAssetUrl(
              img.replace(/<image:loc>(.*?)<\/image:loc>/, "$1").trim(),
              960,
            );
          }),
        };
      })
      .filter((entry) => entry.url); // Filter out empty URLs

    return base.concat(palettesMap);
  } catch (error) {
    console.error(
      "Error fetching or parsing sitemap:",
      (error as Error).message,
    );
    return base;
  }
}
