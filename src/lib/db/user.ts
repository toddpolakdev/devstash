import { cache } from "react";

import { prisma } from "@/lib/prisma";

const DEMO_USER_EMAIL = "demo@devstash.io";

// Placeholder until auth lands: all dashboard data is scoped to the seeded
// demo user. `cache` dedupes the lookup across a single request.
export const getCurrentUserId = cache(async (): Promise<string | null> => {
  const user = await prisma.user.findUnique({
    where: { email: DEMO_USER_EMAIL },
    select: { id: true },
  });

  return user?.id ?? null;
});
