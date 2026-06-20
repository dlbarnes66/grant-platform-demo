import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const comparison = await prisma.grantComparison.findUnique({
    where: { id: params.id },
  });

  if (!comparison) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const grants = await prisma.grantPreview.findMany({
    where: { id: { in: comparison.grantIds } },
  });

  return NextResponse.json({ comparison, grants });
}
