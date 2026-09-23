import "dotenv/config";
import { defineConfig } from "prisma/config";

// Prisma 7 moved CLI configuration here (out of package.json / the schema
// datasource block). Env vars are no longer auto-loaded, hence `dotenv/config`.
//
// Migrations use DIRECT_URL — Neon's pooled (`-pooler`) endpoint runs in
// transaction pooling mode, which breaks Prisma's advisory locks. The app
// runtime still uses the pooled DATABASE_URL (see src/lib/prisma.ts).
//
// Read via `process.env` rather than Prisma's `env()` helper: `env()` throws at
// config-load time when the var is unset, which breaks `prisma generate` (the
// postinstall step) in environments that only need the client, not a database.
// Migration commands still fail loudly on their own if the URL is missing.
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: process.env.DIRECT_URL,
  },
});
