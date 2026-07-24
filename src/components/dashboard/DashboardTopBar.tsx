import { Plus, Search } from "lucide-react";

import { DashboardLogo } from "@/components/dashboard/DashboardLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";

export function DashboardTopBar() {
  return (
    <header className="flex h-14 shrink-0 items-center border-b border-border">
      <DashboardLogo />
      <div className="flex flex-1 items-center gap-3 px-4">
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
