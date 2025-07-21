import { Metadata } from "next";
import { Maker } from "./components/maker";
import Introduction from "./components/introduction";

export const metadata: Metadata = {
  title: "Anime & Game Color Palette Generator - HiColors",
  description:
    "Upload any screenshot from your favorite anime, game, or comic, and hand-pick the exact colors from characters, scenes, or designs. Instantly generate the perfect palette for your fanart, cosplay, or creative projects.",
  alternates: {
    canonical: "https://hicolors.org/create",
  },
};

export default async function Page({ searchParams }: { searchParams: Promise<{ id: string }> }) {
  const { id } = await searchParams;
  return (
    <div className="py-12">
      <div className="mx-auto mb-12 max-w-screen-lg px-4 lg:px-0">
        <h1 className="h1 text-left">{metadata.title?.toString()}</h1>
        <p className="p">{metadata.description}</p>
      </div>
      <Maker id={id} />
      <Introduction />
    </div>
  );
}
