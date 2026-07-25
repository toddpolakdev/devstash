import "dotenv/config";

import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "../src/generated/prisma/client";

// Standalone seed (run via `npm run db:seed`). Prisma 7 no longer auto-loads
// env vars, hence `dotenv/config`; it also requires a driver adapter.
// Data follows context/features/seed-spec.md.
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const DEMO_USER = {
  id: "user_demo",
  email: "demo@devstash.io",
  name: "Demo User",
  password: "12345678",
  isPro: false,
};

// System item types (isSystem: true, no owner). Icons are Lucide names.
const SYSTEM_TYPES = [
  { id: "type_snippet", name: "snippet", icon: "Code", color: "#3b82f6" },
  { id: "type_prompt", name: "prompt", icon: "Sparkles", color: "#8b5cf6" },
  { id: "type_command", name: "command", icon: "Terminal", color: "#f97316" },
  { id: "type_note", name: "note", icon: "StickyNote", color: "#fde047" },
  { id: "type_file", name: "file", icon: "File", color: "#6b7280" },
  { id: "type_image", name: "image", icon: "Image", color: "#ec4899" },
  { id: "type_link", name: "link", icon: "Link", color: "#10b981" },
] as const;

type TypeName = (typeof SYSTEM_TYPES)[number]["name"];

interface SeedItem {
  title: string;
  type: TypeName;
  content?: string;
  url?: string;
  description?: string;
  language?: string;
  tags?: string[];
  isFavorite?: boolean;
  isPinned?: boolean;
}

interface SeedCollection {
  id: string;
  name: string;
  description: string;
  isFavorite?: boolean;
  items: SeedItem[];
}

const COLLECTIONS: SeedCollection[] = [
  {
    id: "col_react",
    name: "React Patterns",
    description: "Reusable React patterns and hooks",
    isFavorite: true,
    items: [
      {
        title: "useDebounce hook",
        type: "snippet",
        language: "typescript",
        description: "Debounce any changing value with a configurable delay.",
        tags: ["react", "hooks", "performance"],
        isFavorite: true,
        isPinned: true,
        content: `import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}`,
      },
      {
        title: "Typed context provider",
        type: "snippet",
        language: "tsx",
        description: "A null-safe React context with a guarded hook.",
        tags: ["react", "context", "patterns"],
        content: `import { createContext, useContext, type ReactNode } from "react";

interface ThemeValue {
  theme: "light" | "dark";
  toggle: () => void;
}

const ThemeContext = createContext<ThemeValue | null>(null);

export function ThemeProvider({ value, children }: { value: ThemeValue; children: ReactNode }) {
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}`,
      },
      {
        title: "groupBy utility",
        type: "snippet",
        language: "typescript",
        description: "Group an array into a record keyed by a selector.",
        tags: ["typescript", "utils"],
        content: `export function groupBy<T, K extends PropertyKey>(
  items: T[],
  key: (item: T) => K,
): Record<K, T[]> {
  return items.reduce((acc, item) => {
    const k = key(item);
    (acc[k] ??= []).push(item);
    return acc;
  }, {} as Record<K, T[]>);
}`,
      },
    ],
  },
  {
    id: "col_ai_workflows",
    name: "AI Workflows",
    description: "AI prompts and workflow automations",
    isFavorite: true,
    items: [
      {
        title: "Senior code reviewer",
        type: "prompt",
        description: "System prompt for thorough, actionable code review.",
        tags: ["review", "code-quality"],
        isPinned: true,
        content: `You are a staff engineer reviewing a pull request. Focus on correctness, edge cases, security, and readability. For each issue, cite the line, explain the risk, and suggest a concrete fix. Be direct and concise, and call out anything that would block a merge.`,
      },
      {
        title: "Documentation generator",
        type: "prompt",
        description: "Turn code into consistent reference docs.",
        tags: ["docs", "generation"],
        content: `Generate clear documentation for the following code. Include a one-line summary, parameters with their types, the return value, any thrown errors, and a short usage example. Match the project's existing documentation style and keep prose tight.`,
      },
      {
        title: "Refactoring assistant",
        type: "prompt",
        description: "Behavior-preserving refactors with rationale.",
        tags: ["refactor", "cleanup"],
        content: `Refactor the following code for readability and maintainability without changing its behavior. Preserve the public API, add types where missing, and explain each change and why it helps. Flag any change that could alter behavior so it can be reviewed separately.`,
      },
    ],
  },
  {
    id: "col_devops",
    name: "DevOps",
    description: "Infrastructure and deployment resources",
    items: [
      {
        title: "Multi-stage Node.js Dockerfile",
        type: "snippet",
        language: "dockerfile",
        description: "Small production image via multi-stage build.",
        tags: ["docker", "ci-cd"],
        content: `FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
EXPOSE 3000
CMD ["npm", "start"]`,
      },
      {
        title: "Build, push, and roll out a release",
        type: "command",
        language: "bash",
        description: "One-liner deploy to a container registry + cluster.",
        tags: ["deploy", "docker", "kubernetes"],
        content: `docker build -t registry.example.com/devstash:latest . \\
  && docker push registry.example.com/devstash:latest \\
  && kubectl rollout restart deployment/devstash`,
      },
      {
        title: "Docker documentation",
        type: "link",
        url: "https://docs.docker.com",
        description: "Official Docker reference and guides.",
        tags: ["docker", "docs"],
      },
      {
        title: "GitHub Actions documentation",
        type: "link",
        url: "https://docs.github.com/en/actions",
        description: "CI/CD workflows on GitHub Actions.",
        tags: ["ci-cd", "docs"],
      },
    ],
  },
  {
    id: "col_terminal",
    name: "Terminal Commands",
    description: "Useful shell commands for everyday development",
    items: [
      {
        title: "Undo last commit (keep changes)",
        type: "command",
        language: "bash",
        description: "Soft-reset the last commit, keeping changes staged.",
        tags: ["git"],
        isFavorite: true,
        content: `git reset --soft HEAD~1`,
      },
      {
        title: "Remove all stopped containers",
        type: "command",
        language: "bash",
        description: "Prune stopped Docker containers.",
        tags: ["docker"],
        content: `docker container prune -f`,
      },
      {
        title: "Kill the process on a port",
        type: "command",
        language: "bash",
        description: "Free a port held by a stuck process.",
        tags: ["process", "ports"],
        content: `lsof -ti:3000 | xargs kill -9`,
      },
      {
        title: "Reinstall node modules cleanly",
        type: "command",
        language: "bash",
        description: "Nuke and reinstall dependencies.",
        tags: ["npm"],
        content: `rm -rf node_modules package-lock.json && npm install`,
      },
    ],
  },
  {
    id: "col_design",
    name: "Design Resources",
    description: "UI/UX resources and references",
    items: [
      {
        title: "Tailwind CSS documentation",
        type: "link",
        url: "https://tailwindcss.com/docs",
        description: "Utility-first CSS framework reference.",
        tags: ["css", "tailwind"],
        isFavorite: true,
      },
      {
        title: "shadcn/ui",
        type: "link",
        url: "https://ui.shadcn.com",
        description: "Composable React component library.",
        tags: ["components", "ui"],
      },
      {
        title: "Material Design 3",
        type: "link",
        url: "https://m3.material.io",
        description: "Google's design system guidelines.",
        tags: ["design-system"],
      },
      {
        title: "Lucide Icons",
        type: "link",
        url: "https://lucide.dev/icons",
        description: "Open-source icon set (used across DevStash).",
        tags: ["icons"],
      },
    ],
  },
];

const contentTypeFor = (type: TypeName) =>
  type === "link" ? "url" : type === "file" || type === "image" ? "file" : "text";

async function reset() {
  // Delete children before parents (FK-safe).
  await prisma.itemCollection.deleteMany();
  await prisma.item.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.itemType.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();
}

async function seed() {
  await prisma.user.create({
    data: {
      id: DEMO_USER.id,
      email: DEMO_USER.email,
      name: DEMO_USER.name,
      isPro: DEMO_USER.isPro,
      emailVerified: new Date(),
      passwordHash: await bcrypt.hash(DEMO_USER.password, 12),
    },
  });

  await prisma.itemType.createMany({
    data: SYSTEM_TYPES.map((type) => ({
      id: type.id,
      name: type.name,
      icon: type.icon,
      color: type.color,
      isSystem: true,
    })),
  });

  for (const collection of COLLECTIONS) {
    await prisma.collection.create({
      data: {
        id: collection.id,
        name: collection.name,
        description: collection.description,
        isFavorite: collection.isFavorite ?? false,
        defaultTypeId: `type_${collection.items[0].type}`,
        userId: DEMO_USER.id,
      },
    });

    for (const item of collection.items) {
      await prisma.item.create({
        data: {
          title: item.title,
          contentType: contentTypeFor(item.type),
          content: item.content ?? null,
          url: item.url ?? null,
          description: item.description ?? null,
          language: item.language ?? null,
          isFavorite: item.isFavorite ?? false,
          isPinned: item.isPinned ?? false,
          user: { connect: { id: DEMO_USER.id } },
          itemType: { connect: { id: `type_${item.type}` } },
          tags: {
            connectOrCreate: (item.tags ?? []).map((name) => ({
              where: { userId_name: { userId: DEMO_USER.id, name } },
              create: { name, userId: DEMO_USER.id },
            })),
          },
          collections: {
            create: [{ collection: { connect: { id: collection.id } } }],
          },
        },
      });
    }
  }
}

async function main() {
  await reset();
  await seed();

  const [users, types, cols, itemCount, tags, links] = await Promise.all([
    prisma.user.count(),
    prisma.itemType.count(),
    prisma.collection.count(),
    prisma.item.count(),
    prisma.tag.count(),
    prisma.itemCollection.count(),
  ]);

  console.log(
    `Seeded ${users} user, ${types} item types, ${cols} collections, ` +
      `${itemCount} items, ${tags} tags, ${links} collection links.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
