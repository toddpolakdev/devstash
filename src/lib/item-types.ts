import {
  Code,
  File,
  Image,
  Link,
  Sparkles,
  StickyNote,
  Terminal,
  type LucideIcon,
} from "lucide-react";

import { itemTypes } from "@/lib/mock-data";

// Lookup an ItemType by its id.
export const itemTypeById = new Map(itemTypes.map((type) => [type.id, type]));

// Maps the `icon` string stored on each ItemType to its Lucide component.
export const typeIcons: Record<string, LucideIcon> = {
  Code,
  Terminal,
  Sparkles,
  StickyNote,
  Link,
  File,
  Image,
};

// Tailwind text-color class per type (literal strings so Tailwind can scan them).
export const typeColorClasses: Record<string, string> = {
  type_snippet: "text-blue-500",
  type_command: "text-orange-500",
  type_prompt: "text-violet-500",
  type_note: "text-yellow-300",
  type_link: "text-emerald-500",
  type_file: "text-gray-500",
  type_image: "text-pink-500",
};

// Left-border accent class per type (literal strings so Tailwind can scan them).
export const typeBorderClasses: Record<string, string> = {
  type_snippet: "border-l-blue-500",
  type_command: "border-l-orange-500",
  type_prompt: "border-l-violet-500",
  type_note: "border-l-yellow-300",
  type_link: "border-l-emerald-500",
  type_file: "border-l-gray-500",
  type_image: "border-l-pink-500",
};

// Subtle background tint per type (literal strings so Tailwind can scan them).
export const typeTintClasses: Record<string, string> = {
  type_snippet: "bg-blue-500/5",
  type_command: "bg-orange-500/5",
  type_prompt: "bg-violet-500/5",
  type_note: "bg-yellow-300/5",
  type_link: "bg-emerald-500/5",
  type_file: "bg-gray-500/5",
  type_image: "bg-pink-500/5",
};

// Route slug for an item type, e.g. "Snippet" -> "snippets" (/items/snippets).
export function itemTypeSlug(name: string): string {
  return `${name.toLowerCase()}s`;
}
