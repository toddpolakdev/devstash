import { Prisma } from "@/generated/prisma/client";
import type { ContentType } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";

export interface ItemTypeSummary {
  id: string;
  name: string;
  icon: string;
}

export interface ItemSummary {
  id: string;
  title: string;
  type: ItemTypeSummary; // drives the card's accent border and icon color
  contentType: ContentType;
  content: string | null;
  url: string | null;
  description: string | null;
  isFavorite: boolean;
  isPinned: boolean;
  tags: string[];
  updatedAt: Date;
}

export interface ItemStats {
  total: number;
  favorites: number;
}

const itemSummarySelect = {
  id: true,
  title: true,
  contentType: true,
  content: true,
  url: true,
  description: true,
  isFavorite: true,
  isPinned: true,
  updatedAt: true,
  itemType: { select: { id: true, name: true, icon: true } },
  tags: { select: { name: true }, orderBy: { name: "asc" } },
} satisfies Prisma.ItemSelect;

export function getPinnedItems(userId: string, limit = 8) {
  return findItemSummaries({ userId, isPinned: true }, limit);
}

export function getRecentItems(userId: string, limit = 10) {
  return findItemSummaries({ userId }, limit);
}

export async function getItemStats(userId: string): Promise<ItemStats> {
  const [total, favorites] = await Promise.all([
    prisma.item.count({ where: { userId } }),
    prisma.item.count({ where: { userId, isFavorite: true } }),
  ]);

  return { total, favorites };
}

// Most recently updated first. The item type and tags come through the same
// query — one round trip per section, no per-card lookups.
async function findItemSummaries(
  where: Prisma.ItemWhereInput,
  take: number,
): Promise<ItemSummary[]> {
  const items = await prisma.item.findMany({
    where,
    orderBy: { updatedAt: "desc" },
    take,
    select: itemSummarySelect,
  });

  return items.map(({ itemType, tags, ...item }) => ({
    ...item,
    type: itemType,
    tags: tags.map((tag) => tag.name),
  }));
}
