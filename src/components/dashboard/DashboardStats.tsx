import { FolderClosed, FolderHeart, Package, Star, type LucideIcon } from "lucide-react";

import type { CollectionStats } from "@/lib/db/collections";
import type { ItemStats } from "@/lib/db/items";

interface Stat {
  label: string;
  value: number;
  icon: LucideIcon;
}

interface DashboardStatsProps {
  itemStats: ItemStats;
  collectionStats: CollectionStats;
}

export function DashboardStats({
  itemStats,
  collectionStats,
}: DashboardStatsProps) {
  const stats: Stat[] = [
    { label: "Items", value: itemStats.total, icon: Package },
    { label: "Collections", value: collectionStats.total, icon: FolderClosed },
    {
      label: "Favorite Items",
      value: itemStats.favorites,
      icon: Star,
    },
    {
      label: "Favorite Collections",
      value: collectionStats.favorites,
      icon: FolderHeart,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="flex items-center gap-3 rounded-xl border border-border bg-card p-4"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <Icon className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="text-2xl font-semibold tabular-nums">{value}</p>
            <p className="truncate text-sm text-muted-foreground">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
