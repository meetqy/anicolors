/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
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

export default config;
