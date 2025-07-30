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
};

export default config;
