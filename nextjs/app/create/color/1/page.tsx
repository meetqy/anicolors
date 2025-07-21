import { Generator } from "./generator";

export default function Page() {
  return (
    <div className="container py-16">
      <div className="mb-16 text-center max-w-3xl mx-auto">
        <h1 className="h1">Color Card Generator</h1>
        <p className="p">
          Pick a color and instantly generate a high-resolution 4:5 color card. Each card includes the color name, RGB, CMYK, and HEX codes. Download your color cards in high quality with just one
          click.
        </p>
      </div>
      <Generator />
    </div>
  );
}
