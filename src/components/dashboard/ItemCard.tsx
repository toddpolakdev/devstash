import Link from "next/link";
import { Pin, Star } from "lucide-react";

import type { ItemSummary } from "@/lib/db/items";
import {
  typeBorderClasses,
  typeColorClasses,
  typeIcons,
} from "@/lib/item-types";
import { cn, formatRelativeTime } from "@/lib/utils";

interface ItemCardProps {
  item: ItemSummary;
}

export function ItemCard({ item }: ItemCardProps) {
  const Icon = typeIcons[item.type.icon];
  const isCode =
    item.type.id === "type_snippet" || item.type.id === "type_command";

  return (
    <Link
      href={`/items/${item.id}`}
      className={cn(
        "flex flex-col rounded-xl border border-border border-l-4 bg-card p-4 transition-colors hover:bg-accent",
        typeBorderClasses[item.type.id],
      )}
    >
      <div className="flex items-center gap-2">
        {Icon && (
          <Icon
            className={cn("size-4 shrink-0", typeColorClasses[item.type.id])}
          />
        )}
        <h3 className="min-w-0 flex-1 truncate font-medium">{item.title}</h3>
        {item.isPinned && (
          <Pin className="size-3.5 shrink-0 text-muted-foreground" />
        )}
        {item.isFavorite && (
          <Star className="size-3.5 shrink-0 fill-amber-400 text-amber-400" />
        )}
      </div>

      <ItemPreview item={item} isCode={isCode} />

      {item.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <p className="mt-3 text-right text-xs text-muted-foreground">
        {formatRelativeTime(item.updatedAt)}
      </p>
    </Link>
  );
}

function ItemPreview({ item, isCode }: { item: ItemSummary; isCode: boolean }) {
  if (item.contentType === "url") {
    return (
      <p className="mt-3 truncate text-sm text-muted-foreground">{item.url}</p>
    );
  }

  if (isCode) {
    return (
      <pre className="mt-3 overflow-hidden rounded-md bg-muted p-3 font-mono text-xs leading-relaxed text-foreground">
        <code className="line-clamp-4 whitespace-pre-wrap">{item.content}</code>
      </pre>
    );
  }

  return (
    <p className="mt-3 line-clamp-3 text-sm whitespace-pre-line text-muted-foreground">
      {item.content || item.description}
    </p>
  );
}
