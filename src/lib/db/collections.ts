import { prisma } from "@/lib/prisma";

export interface CollectionType {
  id: string;
  name: string;
  icon: string;
}

export interface CollectionSummary {
  id: string;
  name: string;
  description: string | null;
  isFavorite: boolean;
  itemCount: number;
  types: CollectionType[]; // most-used first; [0] drives the card accent color
  updatedAt: Date;
}

export interface CollectionStats {
  total: number;
  favorites: number;
}

// Most recently updated collections, with the item count and the item types
// they contain. One query plus one relation query — not per-collection.
export async function getRecentCollections(
  userId: string,
  limit = 6,
): Promise<CollectionSummary[]> {
  const collections = await prisma.collection.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    take: limit,
    select: {
      id: true,
      name: true,
      description: true,
      isFavorite: true,
      updatedAt: true,
      items: {
        select: {
          item: {
            select: {
              itemType: { select: { id: true, name: true, icon: true } },
            },
          },
        },
      },
    },
  });

  return collections.map(({ items, ...collection }) => ({
    ...collection,
    itemCount: items.length,
    types: rankTypesByUsage(items.map(({ item }) => item.itemType)),
  }));
}

export async function getCollectionStats(
  userId: string,
): Promise<CollectionStats> {
  const [total, favorites] = await Promise.all([
    prisma.collection.count({ where: { userId } }),
    prisma.collection.count({ where: { userId, isFavorite: true } }),
  ]);

  return { total, favorites };
}

// Distinct types ordered by how many items in the collection use them.
function rankTypesByUsage(types: CollectionType[]): CollectionType[] {
  const usage = new Map<string, { type: CollectionType; count: number }>();

  for (const type of types) {
    const entry = usage.get(type.id);
    if (entry) {
      entry.count += 1;
    } else {
      usage.set(type.id, { type, count: 1 });
    }
  }

  return [...usage.values()]
    .sort((a, b) => b.count - a.count)
    .map(({ type }) => type);
}
