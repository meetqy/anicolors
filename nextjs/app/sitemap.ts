import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base: MetadataRoute.Sitemap = [
    {
      url: "https://hicolors.org",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://hicolors.org/palettes",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: "https://hicolors.org/create",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  try {
    const response = await fetch("https://strapi.hicolors.org/api/strapi-5-sitemap-plugin/sitemap.xml", {
      next: { revalidate: 86400 }, // Cache for 1 day
    });

    if (!response.ok) {
      throw new Error("Failed to fetch sitemap from Strapi");
    }

    const xmlText = await response.text();

    // Parse XML and extract URLs
    const urlMatches = xmlText.match(/<url>[\s\S]*?<\/url>/g) || [];

    const palettesMap: MetadataRoute.Sitemap = urlMatches
      .map((urlBlock) => {
        const locMatch = urlBlock.match(/<loc>(.*?)<\/loc>/);
        const lastmodMatch = urlBlock.match(/<lastmod>(.*?)<\/lastmod>/);
        const changefreqMatch = urlBlock.match(/<changefreq>(.*?)<\/changefreq>/);
        const priorityMatch = urlBlock.match(/<priority>(.*?)<\/priority>/);
        const imagesMatch = urlBlock.match(/<image:loc>(.*?)<\/image:loc>/g) || [];

        return {
          url: locMatch?.[1] || "",
          lastModified: lastmodMatch?.[1] ? new Date(lastmodMatch[1]) : new Date(),
          changeFrequency: (changefreqMatch?.[1] as MetadataRoute.Sitemap[number]["changeFrequency"]) || "weekly",
          priority: priorityMatch?.[1] ? parseFloat(priorityMatch[1]) : 0.5,
          images: imagesMatch.map((img) => {
            return img.replace(/<image:loc>(.*?)<\/image:loc>/, "$1").trim();
          }),
        };
      })
      .filter((entry) => entry.url); // Filter out empty URLs

    return base.concat(palettesMap);
  } catch (error) {
    console.error("Error fetching or parsing sitemap:", (error as Error).message);
    return base;
  }
}
