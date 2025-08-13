import { TwitterIcon } from "lucide-react";
import { Generator } from "./generator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { getClient } from "@/lib/apollo-client";
import { GET_TOOL, type ToolResponse } from "@/query/tool";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAssetUrl } from "@/lib/utils";
import { env } from "@/env";

const getData = async () => {
  const res = await getClient().query<ToolResponse>({
    query: GET_TOOL,
    variables: {
      filters: {
        slug: {
          eqi: "what-color-is-my-name",
        },
      },
    },
  });

  if (!res.data.tools || res.data.tools.length === 0) {
    notFound();
  }

  return res.data.tools[0]!;
};

export const generateMetadata = async (): Promise<Metadata> => {
  const tool = await getData();
  const images = tool.cover ? [getAssetUrl(tool.cover.url, 1200)] : [];

  return {
    title: tool.name,
    description: tool.description,
    twitter: { card: "summary_large_image", images },
    openGraph: { images },
    alternates: {
      canonical: `/tools/${tool.slug}`,
    },
  };
};

export default async function Page() {
  const tool = await getData();

  return (
    <div className="container mx-auto py-8">
      <div className="mb-12 space-y-6">
        <div className="space-y-3">
          <h1 className="h1 text-left">{tool.name}</h1>
          <p className="p text-muted-foreground">{tool.description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {tool.keywords.split(", ").map((item) => (
            <Badge
              key={item}
              variant="secondary"
              className="hover:bg-secondary/80 cursor-pointer"
            >
              <Link href={`#${item}`} className="capitalize">
                {item}
              </Link>
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Button size="sm" className="gap-2" asChild>
            <Link
              target="_blank"
              href={`https://x.com/intent/tweet?text=${encodeURIComponent(tool.name)}&url=${encodeURIComponent(env.NEXT_PUBLIC_SITE_URL + "/tools/" + tool.slug)}`}
            >
              <TwitterIcon className="h-4 w-4" />
              Share on Twitter
            </Link>
          </Button>
        </div>
      </div>

      <div className="bg-muted/20 text-card-foreground rounded-lg border">
        <Generator />
      </div>
    </div>
  );
}
