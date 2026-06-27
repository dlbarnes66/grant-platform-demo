import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { grantId } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) return new Response("Unauthorized", { status: 401 });

  await prisma.savedGrant.create({
    data: {
      userId: user.id,
      grantId,
      title: "",
    },
  });

  return new Response("OK");
}
