"use client";

import { Menu, PanelLeft, Plus, Search } from "lucide-react";

import { DashboardLogo } from "@/components/dashboard/DashboardLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";

interface DashboardTopBarProps {
  onToggleCollapse: () => void;
  onOpenMobile: () => void;
}

export function DashboardTopBar({
  onToggleCollapse,
  onOpenMobile,
}: DashboardTopBarProps) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-3">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={onOpenMobile}
        aria-label="Open sidebar"
      >
        <Menu />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="hidden md:inline-flex"
        onClick={onToggleCollapse}
        aria-label="Toggle sidebar"
      >
        <PanelLeft />
      </Button>
      <div className="px-1">
        <DashboardLogo />
      </div>
      <div className="flex flex-1 items-center gap-3 pl-2">
        <div className="relative w-full max-w-xl">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search snippets, prompts, tags…"
            aria-label="Search"
            className="h-9 pr-14 pl-9"
          />
          <Kbd className="absolute top-1/2 right-2 -translate-y-1/2">⌘K</Kbd>
        </div>
        <Button size="lg" className="ml-auto">
          <Plus />
          New Item
        </Button>
      </div>
    </header>
  );
}
