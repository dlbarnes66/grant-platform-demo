import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Clerk event type
    const eventType = body?.type;
    const user = body?.data;

    if (eventType !== "user.created") {
      return NextResponse.json({ received: true });
    }

    const userId = user.id;
    const email = user.email_addresses?.[0]?.email_address ?? null;

    if (!userId || !email) {
      return NextResponse.json({ error: "Missing user data" }, { status: 400 });
    }

    // Ensure user exists in Prisma
    await prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: {
        id: userId,
        email,
      },
    });

    // Create personal workspace
    const workspace = await prisma.workspace.create({
      data: {
        name: `${email}'s Workspace`,
        members: {
          create: {
            userId,
            role: "owner",
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      workspaceId: workspace.id,
    });
  } catch (error) {
    console.error("Clerk webhook error:", error);
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}
