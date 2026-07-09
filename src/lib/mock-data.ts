export type ContentType = "text" | "url" | "file";

export interface User {
  id: string;
  name: string;
  email: string;
  initials: string;
  isPro: boolean;
}

export interface ItemType {
  id: string;
  name: string;
  icon: string;
  color: string;
  category: ContentType;
  isPro: boolean;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  isFavorite: boolean;
  itemCount: number;
  typeIds: string[];
  updatedAt: string;
}

export interface Item {
  id: string;
  title: string;
  typeId: string;
  contentType: ContentType;
  content: string;
  url: string;
  description: string;
  language: string;
  tags: string[];
  isFavorite: boolean;
  isPinned: boolean;
  collectionIds: string[];
  updatedAt: string;
}

export const currentUser: User = {
  id: "user_1",
  name: "Dana Vega",
  email: "dana@devstash.io",
  initials: "DV",
  isPro: true,
};

export const itemTypes: ItemType[] = [
  {
    id: "type_snippet",
    name: "Snippet",
    icon: "Code",
    color: "#3b82f6",
    category: "text",
    isPro: false,
  },
  {
    id: "type_command",
    name: "Command",
    icon: "Terminal",
    color: "#f97316",
    category: "text",
    isPro: false,
  },
  {
    id: "type_prompt",
    name: "Prompt",
    icon: "Sparkles",
    color: "#8b5cf6",
    category: "text",
    isPro: false,
  },
  {
    id: "type_note",
    name: "Note",
    icon: "StickyNote",
    color: "#fde047",
    category: "text",
    isPro: false,
  },
  {
    id: "type_link",
    name: "Link",
    icon: "Link",
    color: "#10b981",
    category: "url",
    isPro: false,
  },
  {
    id: "type_file",
    name: "File",
    icon: "File",
    color: "#6b7280",
    category: "file",
    isPro: true,
  },
  {
    id: "type_image",
    name: "Image",
    icon: "Image",
    color: "#ec4899",
    category: "file",
    isPro: true,
  },
];

export const collections: Collection[] = [
  {
    id: "col_react",
    name: "React Patterns",
    description: "Hooks, composition, and rendering tricks",
    isFavorite: true,
    itemCount: 12,
    typeIds: ["type_snippet", "type_note", "type_link"],
    updatedAt: "2h ago",
  },
  {
    id: "col_ai_prompts",
    name: "AI Prompts",
    description: "System messages and reusable prompt templates",
    isFavorite: true,
    itemCount: 9,
    typeIds: ["type_prompt", "type_note"],
    updatedAt: "5h ago",
  },
  {
    id: "col_shell_git",
    name: "Shell & Git",
    description: "Everyday terminal commands I always forget",
    isFavorite: false,
    itemCount: 18,
    typeIds: ["type_command", "type_snippet", "type_note"],
    updatedAt: "1d ago",
  },
  {
    id: "col_context_files",
    name: "Context Files",
    description: "Project context dumps for AI sessions",
    isFavorite: false,
    itemCount: 6,
    typeIds: ["type_note", "type_file", "type_prompt"],
    updatedAt: "2d ago",
  },
  {
    id: "col_reading_list",
    name: "Reading List",
    description: "Docs, articles, and references to revisit",
    isFavorite: false,
    itemCount: 21,
    typeIds: ["type_link", "type_note"],
    updatedAt: "3d ago",
  },
  {
    id: "col_python",
    name: "Python Snippets",
    description: "Data wrangling and scripting helpers",
    isFavorite: false,
    itemCount: 14,
    typeIds: ["type_snippet", "type_command"],
    updatedAt: "4d ago",
  },
  {
    id: "col_interview",
    name: "Interview Prep",
    description: "Algorithms, notes, and gotchas",
    isFavorite: false,
    itemCount: 8,
    typeIds: ["type_note", "type_snippet", "type_link"],
    updatedAt: "6d ago",
  },
  {
    id: "col_design_tokens",
    name: "Design Tokens",
    description: "Brand assets and reference images",
    isFavorite: false,
    itemCount: 5,
    typeIds: ["type_image", "type_file", "type_link"],
    updatedAt: "1w ago",
  },
];

export const items: Item[] = [
  {
    id: "item_usedebounce",
    title: "useDebounce hook",
    typeId: "type_snippet",
    contentType: "text",
    content:
      "export function useDebounce<T>(value: T, delay = 300) {\n  const [debounced, setDebounced] = useState(value);\n  useEffect(() => {\n    const t = setTimeout(() => setDebounced(value), delay);\n    return () => clearTimeout(t);\n  }, [value, delay]);\n  return debounced;\n}",
    url: "",
    description: "Debounce any changing value with a configurable delay.",
    language: "typescript",
    tags: ["react", "hooks", "performance"],
    isFavorite: true,
    isPinned: true,
    collectionIds: ["col_react"],
    updatedAt: "2h ago",
  },
  {
    id: "item_code_reviewer",
    title: "Senior code reviewer",
    typeId: "type_prompt",
    contentType: "text",
    content:
      "You are a senior staff engineer performing a code review. Focus on correctness, edge cases, and readability. Be direct and specific.",
    url: "",
    description: "System message for thorough code reviews.",
    language: "",
    tags: ["review", "system-prompt"],
    isFavorite: false,
    isPinned: true,
    collectionIds: ["col_ai_prompts"],
    updatedAt: "5h ago",
  },
  {
    id: "item_undo_commit",
    title: "Undo last git commit (keep changes)",
    typeId: "type_command",
    contentType: "text",
    content: "git reset --soft HEAD~1",
    url: "",
    description: "Undo the most recent commit but keep the changes staged.",
    language: "bash",
    tags: ["git", "cli"],
    isFavorite: true,
    isPinned: false,
    collectionIds: ["col_shell_git"],
    updatedAt: "1d ago",
  },
  {
    id: "item_prisma_checklist",
    title: "Prisma migration checklist",
    typeId: "type_note",
    contentType: "text",
    content:
      "1. Update schema.prisma\n2. Run migrate dev in a branch\n3. Review generated SQL\n4. Test rollback\n5. Deploy with migrate deploy",
    url: "",
    description: "Steps to follow before shipping a schema change.",
    language: "",
    tags: ["prisma", "database", "workflow"],
    isFavorite: false,
    isPinned: false,
    collectionIds: ["col_context_files"],
    updatedAt: "2d ago",
  },
  {
    id: "item_tailwind_theming",
    title: "Tailwind v4 theming guide",
    typeId: "type_link",
    contentType: "url",
    content: "",
    url: "https://tailwindcss.com/docs",
    description: "Official docs for CSS-based theme configuration.",
    language: "",
    tags: ["tailwind", "css", "docs"],
    isFavorite: false,
    isPinned: false,
    collectionIds: ["col_reading_list", "col_react"],
    updatedAt: "2d ago",
  },
  {
    id: "item_flatten_list",
    title: "Flatten a nested list",
    typeId: "type_snippet",
    contentType: "text",
    content:
      "def flatten(nested):\n    return [x for sub in nested for x in sub]",
    url: "",
    description: "One-liner to flatten a list of lists.",
    language: "python",
    tags: ["python", "lists"],
    isFavorite: false,
    isPinned: false,
    collectionIds: ["col_python"],
    updatedAt: "3d ago",
  },
  {
    id: "item_kill_port",
    title: "Kill process on port",
    typeId: "type_command",
    contentType: "text",
    content: "lsof -ti:3000 | xargs kill -9",
    url: "",
    description: "Free up a port taken by a stuck process.",
    language: "bash",
    tags: ["shell", "cli", "ports"],
    isFavorite: false,
    isPinned: false,
    collectionIds: ["col_shell_git"],
    updatedAt: "3d ago",
  },
  {
    id: "item_eli5",
    title: "Explain like I'm five",
    typeId: "type_prompt",
    contentType: "text",
    content:
      "Explain the following concept in simple terms a beginner could understand, using one everyday analogy. Keep it under 100 words.",
    url: "",
    description: "Turn dense concepts into plain-language explanations.",
    language: "",
    tags: ["learning", "explain"],
    isFavorite: false,
    isPinned: false,
    collectionIds: ["col_ai_prompts", "col_interview"],
    updatedAt: "4d ago",
  },
];
