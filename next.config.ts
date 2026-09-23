import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    // Pin the root so a stray lockfile higher up (e.g. in the home folder)
    // isn't picked as the workspace root.
    root: import.meta.dirname,
  },
};

export default nextConfig;
