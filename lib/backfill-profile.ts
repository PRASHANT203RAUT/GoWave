import { clerkClient } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function backfillProfiles() {
  const profiles = await db.profile.findMany();

  for (const profile of profiles) {
    try {
      const client = await clerkClient();  // <-- await here!
      const user = await client.users.getUser(profile.userId);

      const name =
        (user.firstName || user.lastName)
          ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()
          : user.username || user.emailAddresses[0]?.emailAddress || "Unknown";

      const imageUrl = user.imageUrl || "";
      const email = user.emailAddresses[0]?.emailAddress || "";

      if (!profile.name || !profile.imageUrl || !profile.email) {
        console.log(`Updating profile for userId: ${profile.userId}`);
        await db.profile.update({
          where: { id: profile.id },
          data: { name, imageUrl, email },
        });
      }
    } catch (err) {
      console.error(`❌ Failed to update profile for userId: ${profile.userId}`, err);
    }
  }

  console.log("✅ Backfill complete");
}
