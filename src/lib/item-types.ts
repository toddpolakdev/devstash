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

// Route slug for an item type, e.g. "Snippet" -> "snippets" (/items/snippets).
export function itemTypeSlug(name: string): string {
  return `${name.toLowerCase()}s`;
}
