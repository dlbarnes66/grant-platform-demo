import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ===============================
// DELETE /api/saved-searches/:id
// Deletes a saved search
// ===============================
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const entry = await prisma.savedSearch.findUnique({
    where: { id: params.id },
  });

  if (!entry || entry.userId !== userId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.savedSearch.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ success: true });
}
