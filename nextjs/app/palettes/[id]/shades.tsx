import { Palette } from "@/query/palette";
import Color, { ColorInstance } from "color";
import Link from "next/link";

export const Shades = ({ palette }: { palette: Palette }) => {
  const { points } = palette;

  const generateShades = (baseColor: ColorInstance) => {
    return [
      { label: "+40%", color: baseColor.lighten(0.4).hex() },
      { label: "+30%", color: baseColor.lighten(0.3).hex() },
      { label: "+20%", color: baseColor.lighten(0.2).hex() },
      { label: "+10%", color: baseColor.lighten(0.1).hex() },
      { label: "Base", color: baseColor.hex() },
      { label: "-10%", color: baseColor.darken(0.1).hex() },
      { label: "-20%", color: baseColor.darken(0.2).hex() },
      { label: "-30%", color: baseColor.darken(0.3).hex() },
      { label: "-40%", color: baseColor.darken(0.4).hex() },
    ];
  };

  return (
    <article className="space-y-12">
      <h2>Explore the 10-step light-to-dark shades for each color in this palette.</h2>
      <p>
        These gradients reveal how each tone transforms across brightness levels — from airy pastels to deep, rich hues — giving you more creative control for backgrounds, highlights, shadows, and UI
        accents.
      </p>
      {points.map((point, index) => {
        const color = Color(point.color);
        const shades = generateShades(color);

        return (
          <div key={index} className="space-y-6">
            <h3>
              <Link className="no-underline border-b-2 font-bold" href={`/color/${point.name}`} style={{ borderColor: color.hex() }}>
                {point.name}
              </Link>{" "}
              – 9 Shades from Light to Dark
            </h3>

            <div className="grid grid-cols-5 lg:grid-cols-9 gap-4">
              {shades.map((shade, shadeIndex) => (
                <div key={shadeIndex} className="space-y-2">
                  <div className="w-full rounded-lg aspect-square border shadow-sm" style={{ backgroundColor: shade.color }} />
                  <div className="text-center space-y-1 not-prose">
                    <p className="text-sm font-medium">{shade.label}</p>
                    <p className="text-xs text-muted-foreground font-mono">{shade.color.toUpperCase()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </article>
  );
};
