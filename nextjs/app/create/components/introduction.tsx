import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Palette, Download, Zap, Eye, Brush, Target, Users, Lightbulb, PaintBucket, Pipette, FileImage } from "lucide-react";
import Link from "next/link";

export default function Introduction() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Pipette className="w-4 h-4 mr-2" />
            The Ultimate Fan-Palette Tool
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight mb-6">
            Capture the Soul of Your Favorite Worlds
            <span className="text-primary"> in a Perfect Palette</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Upload a screenshot from your favorite anime, a panel from a manga, or official game art. Hand-pick the 5 iconic colors—from a character's eyes to a magical attack—and build a palette for
            your fanart, cosplay, or collection.
          </p>
        </div>

        {/* <!-- Features Grid --> */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Instant Scene Analysis</CardTitle>
              <CardDescription>Upload an image from any anime or game and our AI instantly finds 5 dominant colors, perfect for capturing the mood of a scene or character.</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Pixel-Perfect Precision</CardTitle>
              <CardDescription>
                Zoom in to grab the exact shade of your waifu's hair or the subtle gradient in a Ghibli sky. Our magnifier ensures you get the color you *actually* want.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Download className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Creator-Ready Exports</CardTitle>
              <CardDescription>Export your palette as a high-res image, a gradient card to show off, or copy the codes directly for your fan wiki or art project.</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* <!-- How It Works --> */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">From Screenshot to Palette in 3 Steps</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <FileImage className="w-8 h-8 text-muted-foreground" />
              </div>
              <h4 className="text-xl font-semibold mb-3">1. Upload Your Scene</h4>
              <p className="text-muted-foreground">Drag and drop any anime screenshot, game art, or manga panel. Supports JPG, PNG, GIF, and WebP formats up to 10MB.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-muted-foreground" />
              </div>
              <h4 className="text-xl font-semibold mb-3">2. Pick Your Colors</h4>
              <p className="text-muted-foreground">Manually drag the pickers to pinpoint the exact colors you love, or let our AI suggest a palette that captures the scene's essence.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <PaintBucket className="w-8 h-8 text-muted-foreground" />
              </div>
              <h4 className="text-xl font-semibold mb-3">3. Export Your Palette</h4>
              <p className="text-muted-foreground">Download your color palette with hex codes and beautifully designed cards, ready for your fanart reference folder or to share with friends.</p>
            </div>
          </div>
        </div>

        {/* <!-- Use Cases --> */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">The Go-To Tool for Fan Creators & Artists</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950 rounded-lg flex items-center justify-center shrink-0">
                  <Brush className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Fanart & Digital Illustration</h4>
                  <p className="text-muted-foreground">
                    Struggling to match a character's official color scheme? Extract it directly from reference art to create illustrations faithful to the source material.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-50 dark:bg-green-950 rounded-lg flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Cosplay & Crafting</h4>
                  <p className="text-muted-foreground">
                    Planning a new cosplay? Grab the exact colors for fabrics, wigs, and props to ensure your creation is a perfect real-life replica of your favorite character.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-50 dark:bg-purple-950 rounded-lg flex items-center justify-center shrink-0">
                  <Palette className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Community & Fan Wikis</h4>
                  <p className="text-muted-foreground">
                    Building a fan wiki or a character profile? Export precise color codes to document official color schemes and maintain consistency across your community project.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-50 dark:bg-orange-950 rounded-lg flex items-center justify-center shrink-0">
                  <Lightbulb className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Inspiration & Moodboarding</h4>
                  <p className="text-muted-foreground">
                    Love the aesthetic of an anime or game? Create mood boards with your favorite color stories to find endless inspiration for your own creative style.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* <!-- Features List --> */}
        <Card className="p-8 mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Why Our Palette Generator?</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Smart algorithm finds colors with the most visual impact</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>High-resolution export for detailed fanart and prints</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Multiple export formats designed for creators</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Automatic color name recognition (e.g., "Sakura Pink")</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Intuitive drag-and-drop interface for any image</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Works with any image, from low-res memes to 4K wallpapers</span>
            </div>
          </div>
        </Card>

        {/* <!-- CTA Section --> */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Capture Your Fandom's Colors?</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of artists, cosplayers, and fans who use our tool to bring their favorite worlds to life. Upload an image and create your first palette in seconds.
          </p>
          <Button size="lg" className="gap-2" asChild>
            <Link href={"#"}>
              <Palette className="w-5 h-5" />
              Create Your Palette
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
