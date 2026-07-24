"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock, Settings, Star } from "lucide-react";

import { collections, currentUser, itemTypes } from "@/lib/mock-data";
import { itemTypeSlug, typeColorClasses, typeIcons } from "@/lib/item-types";
import { cn } from "@/lib/utils";

interface SidebarNavProps {
  onNavigate?: () => void;
}

export function SidebarNav({ onNavigate }: SidebarNavProps) {
  const pathname = usePathname();
  const favoriteCollections = collections.filter((c) => c.isFavorite);
  const recentCollections = collections.slice(0, 5);

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <nav className="min-h-0 flex-1 overflow-y-auto p-3">
        <ul className="space-y-1">
          <li>
            <SidebarLink
              href="/favorites"
              label="Favorites"
              icon={<Star className="size-4" />}
              active={pathname === "/favorites"}
              onNavigate={onNavigate}
            />
          </li>
          <li>
            <SidebarLink
              href="/recent"
              label="Recently used"
              icon={<Clock className="size-4" />}
              active={pathname === "/recent"}
              onNavigate={onNavigate}
            />
          </li>
        </ul>

        <SectionLabel>Item Types</SectionLabel>
        <ul className="space-y-1">
          {itemTypes.map((type) => {
            const Icon = typeIcons[type.icon];
            const href = `/items/${itemTypeSlug(type.name)}`;
            return (
              <li key={type.id}>
                <SidebarLink
                  href={href}
                  label={type.name}
                  icon={
                    Icon ? (
                      <Icon className={cn("size-4", typeColorClasses[type.id])} />
                    ) : null
                  }
                  badge={type.isPro ? "Pro" : undefined}
                  active={pathname === href}
                  onNavigate={onNavigate}
                />
              </li>
            );
          })}
        </ul>

        {favoriteCollections.length > 0 && (
          <>
            <SectionLabel>Favorite Collections</SectionLabel>
            <ul className="space-y-1">
              {favoriteCollections.map((collection) => (
                <li key={collection.id}>
                  <SidebarLink
                    href={`/collections/${collection.id}`}
                    label={collection.name}
                    trailing={
                      <Star className="size-3.5 fill-amber-400 text-amber-400" />
                    }
                    active={pathname === `/collections/${collection.id}`}
                    onNavigate={onNavigate}
                  />
                </li>
              ))}
            </ul>
          </>
        )}

        <SectionLabel>Recent Collections</SectionLabel>
        <ul className="space-y-1">
          {recentCollections.map((collection) => (
            <li key={collection.id}>
              <SidebarLink
                href={`/collections/${collection.id}`}
                label={collection.name}
                active={pathname === `/collections/${collection.id}`}
                onNavigate={onNavigate}
              />
            </li>
          ))}
        </ul>
      </nav>

      <div className="shrink-0 border-t border-sidebar-border p-3">
        <SidebarLink
          href="/settings"
          label="Settings"
          icon={<Settings className="size-4" />}
          active={pathname === "/settings"}
          onNavigate={onNavigate}
        />
        <div className="mt-1 flex items-center gap-3 rounded-md px-3 py-2">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
            {currentUser.initials}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{currentUser.name}</p>
            <p className="truncate text-xs text-muted-foreground">
              {currentUser.email}
            </p>
          </div>
          {currentUser.isPro && <NavBadge>Pro</NavBadge>}
        </div>
      </div>
    </div>
  );
}

interface SidebarLinkProps {
  href: string;
  label: string;
  icon?: ReactNode;
  badge?: string;
  trailing?: ReactNode;
  active?: boolean;
  onNavigate?: () => void;
}

function SidebarLink({
  href,
  label,
  icon,
  badge,
  trailing,
  active,
  onNavigate,
}: SidebarLinkProps) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground",
        active && "bg-sidebar-accent font-medium text-sidebar-foreground",
      )}
    >
      {icon}
      <span className="min-w-0 flex-1 truncate">{label}</span>
      {badge && <NavBadge>{badge}</NavBadge>}
      {trailing}
    </Link>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="px-3 pt-5 pb-1 text-xs font-medium tracking-wider text-muted-foreground uppercase">
      {children}
    </p>
  );
}

function NavBadge({ children }: { children: ReactNode }) {
  return (
    <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">
      {children}
    </span>
  );
}
