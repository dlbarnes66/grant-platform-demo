"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

/* -------------------------------------------------------
   CREATE WORKSPACE (Owner)
------------------------------------------------------- */
export async function createWorkspace(name: string) {
  const { userId } = auth();
  if (!userId) return null;

  const workspace = await prisma.workspace.create({
    data: {
      name,
      members: {
        create: {
          userId,
          role: "owner",
        },
      },
    },
  });

  return workspace;
}

/* -------------------------------------------------------
   RENAME WORKSPACE (Owner/Admin)
------------------------------------------------------- */
export async function renameWorkspace(workspaceId: string, name: string) {
  const { userId } = auth();
  if (!userId) return null;

  const member = await prisma.workspaceMember.findFirst({
    where: { workspaceId, userId },
  });

  if (!member) return null;
  if (member.role !== "owner" && member.role !== "admin") return null;

  await prisma.workspace.update({
    where: { id: workspaceId },
    data: { name },
  });

  return true;
}

/* -------------------------------------------------------
   DELETE WORKSPACE (Owner Only)
------------------------------------------------------- */
export async function deleteWorkspace(workspaceId: string) {
  const { userId } = auth();
  if (!userId) return null;

  const member = await prisma.workspaceMember.findFirst({
    where: { workspaceId, userId },
  });

  if (!member || member.role !== "owner") return null;

  await prisma.workspace.delete({
    where: { id: workspaceId },
  });

  redirect("/dashboard/workspaces");
}

/* -------------------------------------------------------
   INVITE USER TO WORKSPACE (Owner/Admin)
------------------------------------------------------- */
export async function inviteToWorkspace(workspaceId: string, email: string) {
  const { userId } = auth();
  if (!userId) return null;

  const normalized = email.trim().toLowerCase();
  if (!normalized.includes("@")) return null;

  const member = await prisma.workspaceMember.findFirst({
    where: { workspaceId, userId },
  });

  if (!member) return null;
  if (member.role !== "owner" && member.role !== "admin") return null;

  await prisma.workspaceInvite.create({
    data: {
      workspaceId,
      email: normalized,
      invitedById: userId,
    },
  });

  return true;
}

/* -------------------------------------------------------
   ACCEPT INVITE (Any User)
------------------------------------------------------- */
export async function acceptWorkspaceInvite(inviteId: string) {
  const { userId } = auth();
  if (!userId) return null;

  const invite = await prisma.workspaceInvite.findUnique({
    where: { id: inviteId },
  });

  if (!invite || invite.status !== "pending") return null;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user || user.email?.toLowerCase() !== invite.email.toLowerCase()) {
    return null;
  }

  // Add user to workspace
  await prisma.workspaceMember.create({
    data: {
      workspaceId: invite.workspaceId,
      userId,
      role: "member",
    },
  });

  // Mark invite as accepted
  await prisma.workspaceInvite.update({
    where: { id: inviteId },
    data: { status: "accepted" },
  });

  return true;
}

/* -------------------------------------------------------
   REMOVE MEMBER (Owner Only)
------------------------------------------------------- */
export async function removeWorkspaceMember(workspaceId: string, memberId: string) {
  const { userId } = auth();
  if (!userId) return null;

  const actor = await prisma.workspaceMember.findFirst({
    where: { workspaceId, userId },
  });

  if (!actor || actor.role !== "owner") return null;

  await prisma.workspaceMember.delete({
    where: { id: memberId },
  });

  return true;
}

/* -------------------------------------------------------
   CHANGE ROLE (Owner Only)
------------------------------------------------------- */
export async function changeWorkspaceRole(
  workspaceId: string,
  memberId: string,
  newRole: "member" | "admin"
) {
  const { userId } = auth();
  if (!userId) return null;

  const actor = await prisma.workspaceMember.findFirst({
    where: { workspaceId, userId },
  });

  if (!actor || actor.role !== "owner") return null;

  await prisma.workspaceMember.update({
    where: { id: memberId },
    data: { role: newRole },
  });

  return true;
}

/* -------------------------------------------------------
   SWITCH WORKSPACE (Client uses redirect)
------------------------------------------------------- */
export async function switchWorkspace(workspaceId: string) {
  const { userId } = auth();
  if (!userId) return null;

  const membership = await prisma.workspaceMember.findFirst({
    where: { workspaceId, userId },
  });

  if (!membership) return null;

  redirect(`/dashboard?workspaceId=${workspaceId}`);
}
