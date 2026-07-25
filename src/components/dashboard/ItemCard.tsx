import Link from "next/link";
import { Pin, Star } from "lucide-react";

import type { Item } from "@/lib/mock-data";
import {
  itemTypeById,
  typeBorderClasses,
  typeColorClasses,
  typeIcons,
} from "@/lib/item-types";
import { cn } from "@/lib/utils";

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  const type = itemTypeById.get(item.typeId);
  const Icon = type ? typeIcons[type.icon] : undefined;
  const isCode = item.typeId === "type_snippet" || item.typeId === "type_command";

  return (
    <Link
      href={`/items/${item.id}`}
      className={cn(
        "flex flex-col rounded-xl border border-border border-l-4 bg-card p-4 transition-colors hover:bg-accent",
        typeBorderClasses[item.typeId],
      )}
    >
      <div className="flex items-center gap-2">
        {Icon && (
          <Icon className={cn("size-4 shrink-0", typeColorClasses[item.typeId])} />
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
        {item.updatedAt}
      </p>
    </Link>
  );
}

function ItemPreview({ item, isCode }: { item: Item; isCode: boolean }) {
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
