// pages/api/backfillProfiles.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { backfillProfiles } from "@/lib/backfill-profile";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await backfillProfiles();
    res.status(200).json({ message: "Backfill completed" });
  } catch (error) {
    console.error("❌ Backfill error:", error);
    res.status(500).json({ error: "Backfill failed" });
  }
}
