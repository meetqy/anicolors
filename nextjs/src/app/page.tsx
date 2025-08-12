import { GET_PALETTE_LIST, type PaletteListResponse } from "@/query/palette";
import { getClient } from "@/lib/apollo-client";
import { Button } from "@/components/ui/button";
import { Sparkles, Upload, Palette, ArrowRight, Grid3X3 } from "lucide-react";
import { PaletteCard } from "./palettes/components/palette-card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Stats } from "./_components/stats";
import { type Metadata } from "next";
import { FAQs } from "./_components/faqs";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Discover & Create Anime Colors | AniColors",
  description:
    "Extract the iconic colors from your favorite anime and game scenes. Upload any image to instantly generate a beautiful, shareable color palette with AniColors.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  twitter: {
    images: ["og.jpg"],
  },
  openGraph: {
    images: ["og.jpg"],
  },
  alternates: {
    canonical: "/",
  },
};

const getPalettesList = async (
  page = 1,
  pageSize = 24,
  sort = "publishedAt:desc",
) => {
  const res = await getClient().query<PaletteListResponse>({
    query: GET_PALETTE_LIST,
    variables: {
      pagination: { page, pageSize },
      sort: [sort],
    },
  });

  return res.data;
};

export default async function Page() {
  // 获取最新的调色板数据用于展示
  const { palettes_connection } = await getPalettesList(
    1,
    24,
    "publishedAt:desc",
  );
  const { nodes: featuredPalettes, pageInfo } = palettes_connection;

  return (
    <div className="mx-auto">
      <section className="from-background to-muted/50 relative overflow-hidden bg-gradient-to-b py-16">
        <div className="container mx-auto max-w-7xl px-4">
          {/* Header Content */}
          <div className="mb-12 text-center">
            <Badge variant="outline" className="mb-4">
              <Sparkles className="mr-2 h-4 w-4" />
              Anime Color Palettes
            </Badge>
            <h1 className="mx-auto mb-6 max-w-3xl text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Discover and Create <br />{" "}
              <span className="font-serif italic">Anime Colors</span>
            </h1>
            <p className="text-muted-foreground mx-auto mb-8 max-w-4xl text-xl leading-relaxed">
              Browse thousands of color palettes created from anime characters,
              artworks, games, and user-uploaded images. Discover unique color
              combinations and layout styles.
            </p>

            {/* CTA Buttons */}
            <div className="mb-12 flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/create" className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Create Your Palette
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/palettes" className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Browse All Palettes
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Quick Stats */}
            <Stats createNumber={pageInfo.total} />
          </div>

          {/* Featured Palettes Grid */}
          {featuredPalettes.length > 0 && (
            <div className="mb-12">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  Recently Created Palettes
                </h2>
                <Button asChild variant="ghost">
                  <Link href="/palettes" className="flex items-center gap-2">
                    View All <Grid3X3 className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {featuredPalettes.map((palette, index) => (
                  <PaletteCard
                    key={`${palette.documentId}-${index}`}
                    palette={palette}
                  />
                ))}
              </div>
            </div>
          )}

          <FAQs />

          {/* Bottom CTA */}
          <div className="pb-12 text-center">
            <h3 className="mb-4 text-2xl font-bold">
              Ready to Create Your Own?
            </h3>
            <p className="text-muted-foreground mx-auto mb-8 max-w-2xl">
              Upload any image and extract beautiful color palettes in seconds.
              Join thousands of creators using AniColors.
            </p>
            <Button asChild size="lg">
              <Link href="/create" className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Start Creating Now
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
