import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function ComparePage({
  searchParams,
}: {
  searchParams: { workspaceId?: string };
}) {
  const { userId } = auth();
  if (!userId) redirect("/");

  const workspaceId = searchParams.workspaceId;
  if (!workspaceId) {
    return (
      <div className="p-6">
        <p className="text-gray-600">No workspace selected.</p>
      </div>
    );
  }

  const comparisons = await prisma.grantComparison.findMany({
    where: { workspaceId },
    orderBy: { createdAt: "desc" },
    include: {
      comments: true,
      activities: true,
    },
    take: 20,
  });

  return (
    <div className="p-6 space-y-8">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Grant Comparisons</h1>

        <a
          href={`/dashboard/compare/analytics?workspaceId=${workspaceId}`}
          className="text-blue-600 hover:underline text-sm"
        >
          View Analytics →
        </a>
      </div>

      {/* EMPTY STATE */}
      {comparisons.length === 0 && (
        <p className="text-gray-600 text-sm">
          No comparisons yet. Use the “Compare” button on a grant to start.
        </p>
      )}

      {/* LIST */}
      <div className="space-y-3">
        {comparisons.map((c) => (
          <a
            key={c.id}
            href={`/dashboard/compare/${c.id}?workspaceId=${workspaceId}`}
            className="block p-4 border rounded bg-white hover:shadow transition"
          >
            {/* NAME */}
            <div className="text-lg font-semibold">
              {c.name || "Untitled Comparison"}
            </div>

            {/* METADATA */}
            <div className="text-sm text-gray-500 mt-1">
              Created: {c.createdAt.toLocaleString()}
            </div>

            <div className="text-sm mt-1">
              Grants in set: {c.grantIds.length}
            </div>

            {/* COMMENT + ACTIVITY COUNTS */}
            <div className="flex gap-4 text-xs text-gray-600 mt-2">
              <span>💬 {c.comments.length} comments</span>
              <span>📊 {c.activities.length} activity events</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
