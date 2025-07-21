import { Metadata } from "next";
import { Generator } from "./generator";
import { Badge } from "@/components/ui/badge";
import { getAssetUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Color Card Generator – Create, Download, Share – Free Online Tool",
  description: `Create beautiful 4:5 color cards with HEX, RGB & CMYK codes. Perfect for designers, artists, and color enthusiasts. Download high-quality cards instantly.`,
  openGraph: {
    images: [getAssetUrl("https://r2.hicolors.org/1/color_1_18515360cf.png", 1200)],
  },
  twitter: {
    images: [getAssetUrl("https://r2.hicolors.org/1/color_1_18515360cf.png", 1200)],
    card: "summary_large_image",
  },
};

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Generator */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="space-x-1 mb-2">
            <Badge variant="secondary">Create</Badge>
            <Badge variant="secondary">Download</Badge>
            <Badge variant="secondary">Share</Badge>
          </div>

          <h1 className="h1">Color Card Generator</h1>
          <p className="p text-muted-foreground max-w-2xl mx-auto">
            Pick any color and instantly generate professional color cards with RGB, CMYK, HEX codes, and color names. Perfect for designers, artists, and color enthusiasts.
          </p>
        </div>

        {/* Generator Tool in Hero */}
        <div className="max-w-5xl mx-auto">
          <Generator />
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="h2 border-transparent">What You Get</h2>
            <p className="p text-muted-foreground">Professional color cards with all the information you need</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border bg-card text-card-foreground px-6 py-4">
              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <span className="text-primary font-bold text-lg">#</span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold">HEX Codes</h3>
                  <p className="text-sm text-muted-foreground">Perfect for web design and digital projects</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-card text-card-foreground px-6 py-4">
              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/20">
                  <span className="text-green-600 dark:text-green-400 font-bold text-sm">RGB</span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold">RGB Values</h3>
                  <p className="text-sm text-muted-foreground">Essential for digital displays and screens</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-card text-card-foreground px-6 py-4">
              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/20">
                  <span className="text-purple-600 dark:text-purple-400 font-bold text-xs">CMYK</span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold">CMYK Codes</h3>
                  <p className="text-sm text-muted-foreground">Ready for print and professional printing</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-card text-card-foreground px-6 py-4">
              <div className="flex items-center space-x-4">
                <div className="flex flex-shrink-0 h-12 w-12 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/20">
                  <span className="text-orange-600 dark:text-orange-400 font-bold text-sm">Aa</span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold">Color Names</h3>
                  <p className="text-sm text-muted-foreground">Descriptive names for easy reference</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="h2 border-transparent">How It Works</h2>
            <p className="p text-muted-foreground">Three simple steps to create your color card</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            <div className="text-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mx-auto">
                <span className="text-xl font-bold">1</span>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold h3">Pick a Color</h3>
                <p className="p text-muted-foreground">Use our color picker or enter HEX/RGB values to select your perfect color</p>
              </div>
            </div>

            <div className="text-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mx-auto">
                <span className="text-xl font-bold">2</span>
              </div>
              <div className="space-y-2">
                <h3 className="h3 font-semibold">Preview the Card</h3>
                <p className="p text-muted-foreground">See your color card with all format codes displayed in real-time</p>
              </div>
            </div>

            <div className="text-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mx-auto">
                <span className="text-xl font-bold">3</span>
              </div>
              <div className="space-y-2">
                <h3 className="h3 font-semibold">Download It</h3>
                <p className="p text-muted-foreground">Download your high-resolution 4:5 color card for sharing or printing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="border-t bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="h2 border-transparent">Perfect For</h2>
            <p className="p text-muted-foreground">Who can benefit from color cards?</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border bg-card text-card-foreground p-6 text-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/20 mx-auto">
                <span className="text-2xl">🎨</span>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Designers</h3>
                <p className="text-sm text-muted-foreground">Create color references for brand guidelines and design systems</p>
              </div>
            </div>

            <div className="rounded-lg border bg-card text-card-foreground p-6 text-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/20 mx-auto">
                <span className="text-2xl">👩‍🎨</span>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Artists</h3>
                <p className="text-sm text-muted-foreground">Document color palettes and share artistic inspirations</p>
              </div>
            </div>

            <div className="rounded-lg border bg-card text-card-foreground p-6 text-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/20 mx-auto">
                <span className="text-2xl">💝</span>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Color Lovers</h3>
                <p className="text-sm text-muted-foreground">Collect and organize your favorite colors in a beautiful format</p>
              </div>
            </div>

            <div className="rounded-lg border bg-card text-card-foreground p-6 text-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/20 mx-auto">
                <span className="text-2xl">📱</span>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Content Creators</h3>
                <p className="text-sm text-muted-foreground">Create shareable color content for social media platforms</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Gallery */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="h2 border-transparent">Example Color Cards</h2>
            <p className="p text-muted-foreground">See what you can create</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {["color_3_15e5f68fdd.png", "color_1_eff1afc56a.png", "color_4_0b912607ad.png", "color_3_f700250e43.png", "color_2_64b0cb9d34.png", "color_4_ee7b5ef293.png"].map((item) => {
              const url = process.env.NEXT_PUBLIC_ASSET_URL + "/" + item;
              return (
                <div className="border rounded-md overflow-hidden" key={item}>
                  <img
                    alt="Example color card"
                    srcSet={`
${getAssetUrl(url, 320)} 1x,
${getAssetUrl(url, 640)} 2x,
${getAssetUrl(url, 960)} 3x
`}
                    className="w-full aspect-[5/4]"
                    src={getAssetUrl(url, 320)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t bg-muted/50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="h2 border-transparent">Ready to Make Your Color Card?</h2>
          <p className="p text-muted-foreground">Start creating beautiful, professional color cards in seconds. Free to use, no signup required.</p>
          <Button size="lg" className="mt-8" asChild>
            <Link href="/create/color/1">Start Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
