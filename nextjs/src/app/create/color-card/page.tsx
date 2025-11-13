import { type Metadata } from "next";
import { Generator } from "./generator";
import { Badge } from "@/components/ui/badge";
import { getAssetUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { env } from "@/env";

export const metadata: Metadata = {
  title: "Color Card Generator – Create, Download, Share – Free Online Tool",
  description: `Create beautiful 4:5 color cards with HEX, RGB & CMYK codes. Perfect for designers, artists, and color enthusiasts. Download high-quality cards instantly.`,
  openGraph: {
    images: [
      getAssetUrl(
        `${env.NEXT_PUBLIC_ASSET_URL}/1/color_1_18515360cf.png`,
        1200,
      ),
    ],
  },
  twitter: {
    images: [
      getAssetUrl(
        `${env.NEXT_PUBLIC_ASSET_URL}/1/color_1_18515360cf.png`,
        1200,
      ),
    ],
    card: "summary_large_image",
  },
};

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section with Generator */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto mb-16 max-w-4xl text-center">
          <div className="mb-2 space-x-1">
            <Badge variant="secondary">Create</Badge>
            <Badge variant="secondary">Download</Badge>
            <Badge variant="secondary">Share</Badge>
          </div>

          <h1 className="h1">Color Card Generator</h1>
          <p className="p text-muted-foreground mx-auto max-w-2xl">
            Pick any color and instantly generate professional color cards with
            RGB, CMYK, HEX codes, and color names. Perfect for designers,
            artists, and color enthusiasts.
          </p>
        </div>

        {/* Generator Tool in Hero */}
        <div className="mx-auto max-w-5xl">
          <Generator />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/50 border-t py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 space-y-4 text-center">
            <h2 className="h2 border-transparent">What You Get</h2>
            <p className="p text-muted-foreground">
              Professional color cards with all the information you need
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-card text-card-foreground rounded-lg border px-6 py-4">
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg">
                  <span className="text-primary text-lg font-bold">#</span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold">HEX Codes</h3>
                  <p className="text-muted-foreground text-sm">
                    Perfect for web design and digital projects
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card text-card-foreground rounded-lg border px-6 py-4">
              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/20">
                  <span className="text-sm font-bold text-green-600 dark:text-green-400">
                    RGB
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold">RGB Values</h3>
                  <p className="text-muted-foreground text-sm">
                    Essential for digital displays and screens
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card text-card-foreground rounded-lg border px-6 py-4">
              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/20">
                  <span className="text-xs font-bold text-purple-600 dark:text-purple-400">
                    CMYK
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold">CMYK Codes</h3>
                  <p className="text-muted-foreground text-sm">
                    Ready for print and professional printing
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card text-card-foreground rounded-lg border px-6 py-4">
              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/20">
                  <span className="text-sm font-bold text-orange-600 dark:text-orange-400">
                    Aa
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold">Color Names</h3>
                  <p className="text-muted-foreground text-sm">
                    Descriptive names for easy reference
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="h2 border-transparent">How It Works</h2>
            <p className="p text-muted-foreground">
              Three simple steps to create your color card
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            <div className="space-y-4 text-center">
              <div className="bg-primary text-primary-foreground mx-auto flex h-16 w-16 items-center justify-center rounded-full">
                <span className="text-xl font-bold">1</span>
              </div>
              <div className="space-y-2">
                <h3 className="h3 font-semibold">Pick a Color</h3>
                <p className="p text-muted-foreground">
                  Use our color picker or enter HEX/RGB values to select your
                  perfect color
                </p>
              </div>
            </div>

            <div className="space-y-4 text-center">
              <div className="bg-primary text-primary-foreground mx-auto flex h-16 w-16 items-center justify-center rounded-full">
                <span className="text-xl font-bold">2</span>
              </div>
              <div className="space-y-2">
                <h3 className="h3 font-semibold">Preview the Card</h3>
                <p className="p text-muted-foreground">
                  See your color card with all format codes displayed in
                  real-time
                </p>
              </div>
            </div>

            <div className="space-y-4 text-center">
              <div className="bg-primary text-primary-foreground mx-auto flex h-16 w-16 items-center justify-center rounded-full">
                <span className="text-xl font-bold">3</span>
              </div>
              <div className="space-y-2">
                <h3 className="h3 font-semibold">Download It</h3>
                <p className="p text-muted-foreground">
                  Download your high-resolution 4:5 color card for sharing or
                  printing
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="bg-muted/50 border-t py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="h2 border-transparent">Perfect For</h2>
            <p className="p text-muted-foreground">
              Who can benefit from color cards?
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-card text-card-foreground space-y-4 rounded-lg border p-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/20">
                <span className="text-2xl">🎨</span>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Designers</h3>
                <p className="text-muted-foreground text-sm">
                  Create color references for brand guidelines and design
                  systems
                </p>
              </div>
            </div>

            <div className="bg-card text-card-foreground space-y-4 rounded-lg border p-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/20">
                <span className="text-2xl">👩‍🎨</span>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Artists</h3>
                <p className="text-muted-foreground text-sm">
                  Document color palettes and share artistic inspirations
                </p>
              </div>
            </div>

            <div className="bg-card text-card-foreground space-y-4 rounded-lg border p-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/20">
                <span className="text-2xl">💝</span>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Color Lovers</h3>
                <p className="text-muted-foreground text-sm">
                  Collect and organize your favorite colors in a beautiful
                  format
                </p>
              </div>
            </div>

            <div className="bg-card text-card-foreground space-y-4 rounded-lg border p-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/20">
                <span className="text-2xl">📱</span>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Content Creators</h3>
                <p className="text-muted-foreground text-sm">
                  Create shareable color content for social media platforms
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Gallery */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="h2 border-transparent">Example Color Cards</h2>
            <p className="p text-muted-foreground">See what you can create</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              "color_3_15e5f68fdd.png",
              "color_1_eff1afc56a.png",
              "color_4_0b912607ad.png",
              "color_3_f700250e43.png",
              "color_2_64b0cb9d34.png",
              "color_4_ee7b5ef293.png",
            ].map((item) => {
              const url = process.env.NEXT_PUBLIC_ASSET_URL + "/" + item;
              return (
                <div className="overflow-hidden rounded-md border" key={item}>
                  <img
                    alt="Example color card"
                    className="aspect-[5/4] w-full"
                    src={getAssetUrl(url, 640)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-muted/50 border-t py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="h2 border-transparent">
            Ready to Make Your Color Card?
          </h2>
          <p className="p text-muted-foreground">
            Start creating beautiful, professional color cards in seconds. Free
            to use, no signup required.
          </p>
          <Button size="lg" className="mt-8" asChild>
            <Link href="/create/color/1">Start Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
