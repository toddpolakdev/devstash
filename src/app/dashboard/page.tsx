import type { Metadata } from "next";
import { Clock, LayoutGrid, Pin, type LucideIcon } from "lucide-react";

import { CollectionCard } from "@/components/dashboard/CollectionCard";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { ItemCard } from "@/components/dashboard/ItemCard";
import {
  getCollectionStats,
  getRecentCollections,
} from "@/lib/db/collections";
import { getItemStats, getPinnedItems, getRecentItems } from "@/lib/db/items";
import { getCurrentUserId } from "@/lib/db/user";

export const metadata: Metadata = {
  title: "Dashboard — DevStash",
};

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const userId = await getCurrentUserId();
  const [
    recentCollections,
    collectionStats,
    pinnedItems,
    recentItems,
    itemStats,
  ] = userId
    ? await Promise.all([
        getRecentCollections(userId),
        getCollectionStats(userId),
        getPinnedItems(userId),
        getRecentItems(userId),
        getItemStats(userId),
      ])
    : [[], { total: 0, favorites: 0 }, [], [], { total: 0, favorites: 0 }];

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold">Your Stash</h1>
        <p className="mt-1 text-muted-foreground">
          Everything you&apos;ve saved, at a glance.
        </p>
      </div>

      <DashboardStats itemStats={itemStats} collectionStats={collectionStats} />

      <section>
        <SectionHeading
          icon={LayoutGrid}
          title="Recent Collections"
          count={recentCollections.length}
        />
        {recentCollections.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {recentCollections.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            No collections yet.
          </p>
        )}
      </section>

      {pinnedItems.length > 0 && (
        <section>
          <SectionHeading
            icon={Pin}
            title="Pinned Items"
            count={pinnedItems.length}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {pinnedItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}

      <section>
        <SectionHeading
          icon={Clock}
          title="Recent Items"
          count={recentItems.length}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {recentItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}

interface SectionHeadingProps {
  icon: LucideIcon;
  title: string;
  count: number;
}

function SectionHeading({ icon: Icon, title, count }: SectionHeadingProps) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <Icon className="size-5 text-muted-foreground" />
      <h2 className="text-lg font-semibold">{title}</h2>
      <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground tabular-nums">
        {count}
      </span>
    </div>
  );
}
