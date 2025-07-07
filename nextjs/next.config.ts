import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("http://localhost:1337/**/*"), new URL("https://r2.hicolors.org/**/*")],
  },
};

export default nextConfig;
