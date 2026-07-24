# Current Feature

_No active feature. The last feature is recorded in the history below._

## Status

Completed

## History

<!-- Keep this updated. Earliest to latest -->

- **2026-07-07** — Initial Next.js 16 / React 19 project setup. Scaffolded the App Router app (`src/app/`), enabled the React Compiler (`next.config.ts`), configured Tailwind CSS v4 (PostCSS), ESLint flat config, and TypeScript with the `@/*` path alias. Removed the default `create-next-app` SVG assets from `public/`. Added `AGENTS.md`/`CLAUDE.md` guidance and the `context/` docs folder (project overview, coding standards, AI interaction, current feature). Committed and pushed as the first real commit (`be7f34c`).
- **2026-07-23** — Started Dashboard UI Phase 1. Set as the current feature with status In Progress; no implementation work yet.
- **2026-07-24** — Completed Dashboard UI Phase 1. Initialized shadcn/ui (radix base, `nova` preset — Lucide + Geist, neutral base color, CSS variables) and installed `button`, `input`, `kbd`. Rewrote `globals.css` with the Tailwind v4 `@theme inline` token block and light/dark variable sets; enabled dark mode by default via the `dark` class on `<html>` (plus `color-scheme: dark`), and renamed the Geist font vars to `--font-sans`/`--font-mono` to match the preset. Added the `/dashboard` route: a full-width top bar (DevStash logo + `Package` icon in the top-left corner, display-only search with a `⌘K` hint, and a display-only "New Item" button) sitting above a `w-64` sidebar and main content area, both placeholders (`h2` "Sidebar"/"Main"). Added `"use client"` to the shadcn `button` to avoid the `radix-ui` barrel breaking the RSC build. Build and lint pass.
- **2026-07-24** — Started Dashboard UI Phase 2. Set as the current feature with status In Progress; no implementation work yet.
- **2026-07-24** — Completed Dashboard UI Phase 2. Build out the sidebar: a collapsible sidebar with item types, favorite collections, most recent collections, and a user avatar area — sourced from mock data (full spec: @context/features/dashboard-phase-2-spec.md). Added `src/lib/item-types.ts` (Lucide icon map, per-type Tailwind color classes, and an `itemTypeSlug` helper for `/items/TYPE` routes). New `DashboardShell` client component owns the collapse + mobile-drawer state and lays out top bar / sidebar / main. `SidebarNav` (shared by desktop and mobile) renders Favorites/Recently-used quick links, the Item Types list (colored icons, Pro badges, links to `/items/{slug}`), Favorite Collections and Recent Collections sections (from mock data), plus a Settings link and a user avatar area (initials, name, email, Pro badge) pinned at the bottom; active route is highlighted via `usePathname`. `DashboardSidebar` collapses to `w-0` on desktop and renders as an overlay drawer (backdrop + slide-in, always a drawer) on mobile. `DashboardTopBar` gained a `PanelLeft` desktop collapse toggle and a `Menu` mobile-drawer button; `DashboardLogo` was slimmed to a reusable brand mark. Build and lint pass.
