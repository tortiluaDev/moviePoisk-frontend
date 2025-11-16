import type { NextConfig } from "next";
import * as path from "node:path";
import { TMDB_IMG } from "./src/shared/constants/tmdb.constants";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "src")],
    prependData: `@use "@/shared/styles/variables" as *;`,
  },
  outputFileTracingRoot: path.join(__dirname, "bun.lock"),
  images: {
    remotePatterns: [new URL(`${TMDB_IMG.baseUrl}/**`)],
  },
};

export default nextConfig;
