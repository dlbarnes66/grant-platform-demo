import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { createWorkspace } from "./actions";

export default async function WorkspacesPage() {
  const { userId } = auth();
  if (!userId) {
    return <div className="p-6">Not authorized</div>;
  }

  const memberships = await prisma.workspaceMember.findMany({
    where: { userId },
    include: { workspace: true },
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Workspaces</h1>

      {/* Create workspace */}
      <form
        action={async (formData) => {
          "use server";
          const name = formData.get("name") as string;
          await createWorkspace(name || "Untitled Workspace");
        }}
        className="flex gap-3"
      >
        <input
          type="text"
          name="name"
          placeholder="New workspace name"
          className="border p-2 rounded flex-1"
        />
        <button className="px-4 py-2 bg-brandBlue text-white rounded hover:bg-brandBlue/90 transition">
          Create
        </button>
      </form>

      {/* List workspaces */}
      <div className="space-y-3">
        {memberships.map((m) => (
          <a
            key={m.workspace.id}
            href={`/dashboard/compare?workspaceId=${m.workspace.id}`}
            className="block p-4 border rounded bg-white hover:shadow transition"
          >
            <div className="text-lg font-semibold">{m.workspace.name}</div>
            <div className="text-sm text-gray-500 mt-1">
              Role: {m.role}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
