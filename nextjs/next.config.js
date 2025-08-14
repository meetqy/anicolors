/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";
import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";

/** @type {import("next").NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  transpilePackages: ["next-mdx-remote"],

  images: {
    remotePatterns: [
      new URL("http://localhost:1337/**/*"),
      new URL("https://r2.hicolors.org/**/*"),
    ],
  },
  redirects: async () => {
    return [
      {
        source: "/blogs/piqxyna9zquhn0qk534idx7p",
        destination: "/blogs/genshin-impact-hair-colors-full-character-list",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [{ source: "/sitemap.xml", destination: "/api/sitemap" }],
    };
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
