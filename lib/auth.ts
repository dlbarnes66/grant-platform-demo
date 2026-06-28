import { auth } from "@clerk/nextjs/server";

export function getUserId() {
  const { userId } = auth();
  if (!userId) throw new Error("Not authenticated");
  return userId;
}

// Dummy authOptions for legacy imports
export const authOptions = {};
