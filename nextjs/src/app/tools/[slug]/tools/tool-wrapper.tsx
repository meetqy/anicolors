"use client";
import dynamic from "next/dynamic";

const tools = {
  "change-svg-color": dynamic(() => import("./change-svg-color")),
  "color-names-table-search-and-filter-colors": dynamic(
    () => import("./color-names-table-search-and-filter-colors"),
  ),
  "create-cinematic-color-palettes-with-colorpalette-cinema": dynamic(
    () => import("./create-cinematic-color-palettes-with-colorpalette-cinema"),
  ),
  "fill-aspect-ratio-with-image-blur-background": dynamic(
    () => import("./fill-aspect-ratio-with-image-blur-background"),
  ),
  "generate-color-to-white-gradient-cards": dynamic(
    () => import("./generate-color-to-white-gradient-cards"),
  ),
  "mtg-color-combo-explorer-for-magic-the-gathering": dynamic(
    () => import("./mtg-color-combo-explorer-for-magic-the-gathering"),
  ),
  "purple-anime-pfp-maker": dynamic(() => import("./purple-anime-pfp-maker")),
  "what-color-is-my-name": dynamic(() => import("./what-color-is-my-name")),
};

export type Tools = keyof typeof tools;

export const ToolWrapper = ({ slug }: { slug: Tools }) => {
  const Component = tools[slug];

  return (
    <div className="from-muted/50 to-muted/0 container min-h-96 overflow-hidden rounded-md bg-gradient-to-b p-4 xl:border">
      <Component />
    </div>
  );
};
