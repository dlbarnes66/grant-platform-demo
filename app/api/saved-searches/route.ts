import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ===============================
// GET /api/saved-searches
// Returns all saved searches for the user
// ===============================
export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const saved = await prisma.savedSearch.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(saved);
}

// ===============================
// POST /api/saved-searches
// Saves a new search
// ===============================
export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, query } = await req.json();

  if (!name || !query) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const saved = await prisma.savedSearch.create({
    data: {
      userId,
      name,
      query,
    },
  });

  return NextResponse.json(saved, { status: 201 });
}
