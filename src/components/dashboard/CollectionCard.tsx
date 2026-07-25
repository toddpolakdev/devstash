import Link from "next/link";
import { Star } from "lucide-react";

import type { Collection } from "@/lib/mock-data";
import {
  itemTypeById,
  typeBorderClasses,
  typeColorClasses,
  typeIcons,
  typeTintClasses,
} from "@/lib/item-types";
import { cn } from "@/lib/utils";

interface CollectionCardProps {
  collection: Collection;
}

export function CollectionCard({ collection }: CollectionCardProps) {
  const dominantTypeId = collection.typeIds[0];

  return (
    <Link
      href={`/collections/${collection.id}`}
      className={cn(
        "flex flex-col rounded-xl border border-border border-l-4 p-4 transition-colors hover:bg-accent",
        typeBorderClasses[dominantTypeId],
        typeTintClasses[dominantTypeId],
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold">{collection.name}</h3>
        {collection.isFavorite && (
          <Star className="size-4 shrink-0 fill-amber-400 text-amber-400" />
        )}
      </div>
      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
        {collection.description}
      </p>
      <div className="mt-4 flex items-end justify-between gap-2">
        <div className="flex items-center gap-1.5">
          {collection.typeIds.map((typeId) => {
            const type = itemTypeById.get(typeId);
            const Icon = type ? typeIcons[type.icon] : undefined;
            return Icon ? (
              <Icon
                key={typeId}
                className={cn("size-4", typeColorClasses[typeId])}
              />
            ) : null;
          })}
        </div>
        <div className="text-right text-xs text-muted-foreground">
          <p>{collection.itemCount} items</p>
          <p>{collection.updatedAt}</p>
        </div>
      </div>
    </Link>
  );
}
