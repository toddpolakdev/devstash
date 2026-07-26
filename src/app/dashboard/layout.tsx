import { DashboardShell } from "@/components/dashboard/DashboardShell";
import type { SidebarData } from "@/components/dashboard/SidebarNav";
import {
  getFavoriteCollections,
  getRecentCollectionNav,
} from "@/lib/db/collections";
import { getItemTypes } from "@/lib/db/items";
import { getCurrentUserId } from "@/lib/db/user";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userId = await getCurrentUserId();
  const [itemTypes, favoriteCollections, recentCollections] = userId
    ? await Promise.all([
        getItemTypes(userId),
        getFavoriteCollections(userId),
        getRecentCollectionNav(userId),
      ])
    : [[], [], []];

  const sidebar: SidebarData = {
    itemTypes,
    favoriteCollections,
    recentCollections,
  };

  return <DashboardShell sidebar={sidebar}>{children}</DashboardShell>;
}
