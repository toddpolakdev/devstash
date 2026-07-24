import { Package } from "lucide-react";

export function DashboardLogo() {
  return (
    <div className="flex w-64 shrink-0 items-center gap-2 border-r border-border px-4">
      <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <Package className="size-4" />
      </span>
      <span className="text-base font-semibold tracking-tight">DevStash</span>
    </div>
  );
}
