import { GET_PALETTE_LIST, PaletteListResponse } from "@/query/palette";
import { getClient } from "@/lib/apollo-client";
import { Button } from "@/components/ui/button";
import { Sparkles, Upload, Palette, ArrowRight, Grid3X3 } from "lucide-react";
import { PaletteCard } from "./palettes/components/palette-card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export const dynamic = "force-dynamic";

const getPalettesList = async (page: number = 1, pageSize: number = 24, sort: string = "createdAt:desc") => {
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
  const { palettes_connection } = await getPalettesList(1, 16, "createdAt:desc");
  const { nodes: featuredPalettes } = palettes_connection;

  return (
    <div className="mx-auto">
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header Content */}
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              Color Palette Gallery
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 max-w-3xl mx-auto">
              Explore Color Palettes Extracted from <span className="text-primary">Images</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
              Browse thousands of 5-color palettes created from anime characters, artworks, games, and user-uploaded images. Discover unique color combinations and layout styles.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg">
                <Link href="/create" className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Create Your Palette
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/palettes" className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Browse All Palettes
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="text-center p-4 rounded-lg bg-card">
                <div className="text-2xl font-bold text-primary mb-1">10K+</div>
                <div className="text-sm text-muted-foreground">Palettes Created</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-card">
                <div className="text-2xl font-bold text-primary mb-1">50+</div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-card">
                <div className="text-2xl font-bold text-primary mb-1">5</div>
                <div className="text-sm text-muted-foreground">Colors Each</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-card">
                <div className="text-2xl font-bold text-primary mb-1">12</div>
                <div className="text-sm text-muted-foreground">Layout Styles</div>
              </div>
            </div>
          </div>

          {/* Featured Palettes Grid */}
          {featuredPalettes.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Recently Created Palettes</h2>
                <Button asChild variant="ghost">
                  <Link href="/palettes" className="flex items-center gap-2">
                    View All <Grid3X3 className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
                {featuredPalettes.map((palette, index) => (
                  <PaletteCard key={`${palette.documentId}-${index}`} palette={palette} />
                ))}
              </div>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Create Your Own?</h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">Upload any image and extract beautiful color palettes in seconds. Join thousands of creators using HiColors.</p>
            <Button asChild size="lg">
              <Link href="/create" className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Start Creating Now
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
