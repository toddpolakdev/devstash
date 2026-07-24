# Current Feature

Dashboard UI — Phase 1 (of 3). Initial dashboard layout: ShadCN setup, the `/dashboard` route, dark mode, and a top bar with placeholder sidebar/main regions. Full spec: @context/features/dashboard-phase-1-spec.md

## Status

Completed

## Goals

- Initialize ShadCN UI and install the components needed for the layout
- Add a dashboard route at `/dashboard`
- Build the main dashboard layout and any global styles it needs
- Dark mode by default
- Top bar with search and a "new item" button (display only, no behavior)
- Placeholder sidebar and main area — just an `h2` reading "Sidebar" and "Main" for now

## Notes

- Match the layout in @context/screenshots/dashboard-ui-main.png
- Related references: @context/project-overview.md, @src/lib/mock-data.ts
- Later phases: @context/features/dashboard-phase-2-spec.md, @context/features/dashboard-phase-3-spec.md

## History

<!-- Keep this updated. Earliest to latest -->

- **2026-07-07** — Initial Next.js 16 / React 19 project setup. Scaffolded the App Router app (`src/app/`), enabled the React Compiler (`next.config.ts`), configured Tailwind CSS v4 (PostCSS), ESLint flat config, and TypeScript with the `@/*` path alias. Removed the default `create-next-app` SVG assets from `public/`. Added `AGENTS.md`/`CLAUDE.md` guidance and the `context/` docs folder (project overview, coding standards, AI interaction, current feature). Committed and pushed as the first real commit (`be7f34c`).
- **2026-07-23** — Started Dashboard UI Phase 1. Set as the current feature with status In Progress; no implementation work yet.
- **2026-07-24** — Completed Dashboard UI Phase 1. Initialized shadcn/ui (radix base, `nova` preset — Lucide + Geist, neutral base color, CSS variables) and installed `button`, `input`, `kbd`. Rewrote `globals.css` with the Tailwind v4 `@theme inline` token block and light/dark variable sets; enabled dark mode by default via the `dark` class on `<html>` (plus `color-scheme: dark`), and renamed the Geist font vars to `--font-sans`/`--font-mono` to match the preset. Added the `/dashboard` route: a full-width top bar (DevStash logo + `Package` icon in the top-left corner, display-only search with a `⌘K` hint, and a display-only "New Item" button) sitting above a `w-64` sidebar and main content area, both placeholders (`h2` "Sidebar"/"Main"). Added `"use client"` to the shadcn `button` to avoid the `radix-ui` barrel breaking the RSC build. Build and lint pass.
