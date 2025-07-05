import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Palette, Download, Zap, Eye, Brush, Target, Users, Lightbulb, PaintBucket, Pipette, FileImage } from "lucide-react";
import Link from "next/link";

export default function Landing() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Pipette className="w-4 h-4 mr-2" />
            Professional Color Tool
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight mb-6">
            Extract Colors From Any Image With
            <span className="text-primary"> Precision & Control</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Upload your image and pick 5 perfect colors with our intuitive color picker. Fine-tune each selection and export professional-grade color palettes for your creative projects.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Instant Color Detection</CardTitle>
              <CardDescription>Upload any image and our tool automatically suggests 5 distinct colors based on color theory principles</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Pixel-Perfect Precision</CardTitle>
              <CardDescription>Use our magnifying glass tool to select exact pixels and fine-tune your color choices with complete accuracy</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Download className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Multiple Export Options</CardTitle>
              <CardDescription>Download color palettes, gradient cards, and individual color swatches in high resolution for any project</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">Simple 3-Step Process</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <FileImage className="w-8 h-8 text-muted-foreground" />
              </div>
              <h4 className="text-xl font-semibold mb-3">1. Upload Image</h4>
              <p className="text-muted-foreground">Drag and drop any image or click to browse. Supports JPG, PNG, GIF, and WebP formats up to 10MB.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-muted-foreground" />
              </div>
              <h4 className="text-xl font-semibold mb-3">2. Pick Colors</h4>
              <p className="text-muted-foreground">Drag the color markers to your desired spots or let our tool suggest the most distinct colors automatically.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <PaintBucket className="w-8 h-8 text-muted-foreground" />
              </div>
              <h4 className="text-xl font-semibold mb-3">3. Export Palette</h4>
              <p className="text-muted-foreground">Download your color palette with hex codes, color names, and beautifully designed cards ready to use.</p>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">Perfect For Creative Professionals</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950 rounded-lg flex items-center justify-center shrink-0">
                  <Brush className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Graphic Design</h4>
                  <p className="text-muted-foreground">Extract brand colors from reference images, create consistent design systems, and maintain color harmony across projects.</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-50 dark:bg-green-950 rounded-lg flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Web Development</h4>
                  <p className="text-muted-foreground">Generate color schemes for websites, get exact hex codes, and create accessible color combinations for better UX.</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-50 dark:bg-purple-950 rounded-lg flex items-center justify-center shrink-0">
                  <Palette className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Digital Art</h4>
                  <p className="text-muted-foreground">Find color inspiration from photographs, build mood boards, and develop unique color stories for artwork.</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-50 dark:bg-orange-950 rounded-lg flex items-center justify-center shrink-0">
                  <Lightbulb className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Brand Development</h4>
                  <p className="text-muted-foreground">Create professional brand color palettes, ensure consistency across materials, and develop comprehensive style guides.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Features List */}
        <Card className="p-8 mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Why Choose Our Color Picker?</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Smart color selection algorithm for maximum contrast</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>High-resolution export up to 2160px width</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Multiple export formats and styles</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Automatic color name recognition</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Intuitive drag-and-drop interface</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Works with any image format and size</span>
            </div>
          </div>
        </Card>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Start Creating Your Color Palette</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join designers and creators who trust our tool for professional color extraction. Upload your image and discover the perfect color combination today.
          </p>
          <Button size="lg" className="gap-2" asChild>
            <Link href={"#"}>
              <Palette className="w-5 h-5" />
              Get Started Now
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
