import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Palette, Upload, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                Color Palette Generator
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Create Color Palettes from <span className="text-primary">Any Image</span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                Pick 5 colors. Extract from characters, art, or anything you love. <span className="font-semibold text-foreground">HiColors</span> turns images into beautiful color palettes in
                seconds.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link href="/create" className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload Image
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg">
                <Link href="/palettes" className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Browse Palettes
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-sm text-muted-foreground">Palettes Created</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">5 Colors</div>
                <div className="text-sm text-muted-foreground">Per Palette</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">Instant</div>
                <div className="text-sm text-muted-foreground">Generation</div>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            {/* Demo Color Palette Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="transform rotate-3 hover:rotate-6 transition-transform">
                <CardContent className="p-4">
                  <div className="aspect-square bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg mb-3"></div>
                  <div className="flex gap-1">
                    {["#3B82F6", "#8B5CF6", "#EC4899", "#F59E0B", "#10B981"].map((color, i) => (
                      <div key={i} className="flex-1 h-2 rounded" style={{ backgroundColor: color }}></div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="transform -rotate-2 hover:-rotate-6 transition-transform mt-8">
                <CardContent className="p-4">
                  <div className="aspect-square bg-gradient-to-br from-orange-400 to-red-600 rounded-lg mb-3"></div>
                  <div className="flex gap-1">
                    {["#F97316", "#DC2626", "#7C2D12", "#FED7AA", "#FBBF24"].map((color, i) => (
                      <div key={i} className="flex-1 h-2 rounded" style={{ backgroundColor: color }}></div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="transform rotate-1 hover:rotate-3 transition-transform -mt-4">
                <CardContent className="p-4">
                  <div className="aspect-square bg-gradient-to-br from-green-400 to-teal-600 rounded-lg mb-3"></div>
                  <div className="flex gap-1">
                    {["#22C55E", "#14B8A6", "#0F766E", "#A7F3D0", "#6EE7B7"].map((color, i) => (
                      <div key={i} className="flex-1 h-2 rounded" style={{ backgroundColor: color }}></div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="transform -rotate-1 hover:-rotate-3 transition-transform">
                <CardContent className="p-4">
                  <div className="aspect-square bg-gradient-to-br from-pink-400 to-rose-600 rounded-lg mb-3"></div>
                  <div className="flex gap-1">
                    {["#F472B6", "#E11D48", "#BE185D", "#FECDD3", "#FDA4AF"].map((color, i) => (
                      <div key={i} className="flex-1 h-2 rounded" style={{ backgroundColor: color }}></div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-secondary/20 rounded-full animate-pulse delay-500"></div>
            <div className="absolute top-1/2 -right-8 w-4 h-4 bg-accent/20 rounded-full animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
