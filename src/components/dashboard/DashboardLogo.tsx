import { Package } from "lucide-react";

export function DashboardLogo() {
  return (
    <div className="flex items-center gap-2">
      <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <Package className="size-4" />
      </span>
      <span className="text-base font-semibold tracking-tight">DevStash</span>
    </div>
  );
}
