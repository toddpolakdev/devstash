"use client";

import { X } from "lucide-react";

import { DashboardLogo } from "@/components/dashboard/DashboardLogo";
import { SidebarNav } from "@/components/dashboard/SidebarNav";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DashboardSidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export function DashboardSidebar({
  collapsed,
  mobileOpen,
  onCloseMobile,
}: DashboardSidebarProps) {
  return (
    <>
      <aside
        className={cn(
          "hidden shrink-0 overflow-hidden border-border transition-[width] duration-200 md:block",
          collapsed ? "md:w-0 md:border-r-0" : "md:w-64 md:border-r",
        )}
      >
        <div className="h-full w-64">
          <SidebarNav />
        </div>
      </aside>

      <div
        className={cn(
          "fixed inset-0 z-50 md:hidden",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!mobileOpen}
      >
        <div
          className={cn(
            "absolute inset-0 bg-black/50 transition-opacity duration-200",
            mobileOpen ? "opacity-100" : "opacity-0",
          )}
          onClick={onCloseMobile}
        />
        <aside
          className={cn(
            "absolute inset-y-0 left-0 flex w-72 max-w-[85%] flex-col border-r border-border bg-sidebar shadow-xl transition-transform duration-200",
            mobileOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex h-14 shrink-0 items-center justify-between border-b border-sidebar-border px-4">
            <DashboardLogo />
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onCloseMobile}
              aria-label="Close sidebar"
            >
              <X />
            </Button>
          </div>
          <div className="min-h-0 flex-1">
            <SidebarNav onNavigate={onCloseMobile} />
          </div>
        </aside>
      </div>
    </>
  );
}
