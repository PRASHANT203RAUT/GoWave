// lib/syncProfile.ts

import { clerkClient } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function syncProfileFromClerk(clerkUserId: string) {
  const client = await clerkClient(); // await the client first
  const user = await client.users.getUser(clerkUserId);

  const email = user.emailAddresses[0]?.emailAddress || "";
  const name =
    (user.firstName || user.lastName)
      ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()
      : user.username || email || "Unknown";

  const imageUrl = user.imageUrl || "";

  await db.profile.upsert({
    where: {
      userId: clerkUserId,
    },
    update: {
      name,
      imageUrl,
      email,
    },
    create: {
      userId: clerkUserId,
      name,
      imageUrl,
      email,
    },
  });
}
