import "dotenv/config";
import { defineConfig, env } from "prisma/config";

// Prisma 7 moved CLI configuration here (out of package.json / the schema
// datasource block). Env vars are no longer auto-loaded, hence `dotenv/config`.
//
// Migrations use DIRECT_URL — Neon's pooled (`-pooler`) endpoint runs in
// transaction pooling mode, which breaks Prisma's advisory locks. The app
// runtime still uses the pooled DATABASE_URL (see src/lib/prisma.ts).
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: env("DIRECT_URL"),
  },
});
