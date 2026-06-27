"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

//
// Workspace Switcher (Client-Side)
//
function WorkspaceSwitcher() {
  const [workspaces, setWorkspaces] = useState<any[]>([]);
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/workspaces");
      const data = await res.json();
      setWorkspaces(data.workspaces);
      setCurrent(data.currentWorkspaceId);
    }
    load();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    window.location.href = `/dashboard?workspaceId=${id}`;
  };

  if (!workspaces.length) return null;

  return (
    <select
      className="border rounded px-2 py-1 text-sm"
      value={current ?? ""}
      onChange={handleChange}
    >
      {workspaces.map((ws) => (
        <option key={ws.id} value={ws.id}>
          {ws.name}
        </option>
      ))}
    </select>
  );
}

//
// Sidebar Navigation
//
const navItems = [
  { href: "/dashboard", label: "Home" },
  { href: "/dashboard/search", label: "Search Grants" },
  { href: "/dashboard/search-history", label: "Search History" },
  { href: "/dashboard/saved-grants", label: "Saved Grants" },
  { href: "/dashboard/saved-searches", label: "Saved Searches" },
  { href: "/dashboard/jobs", label: "Jobs" },
  { href: "/dashboard/recommendations", label: "Recommendations" },
  { href: "/dashboard/compare", label: "Compare" },
  { href: "/dashboard/settings", label: "Settings" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const workspaceId = searchParams.get("workspaceId");

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r px-6 py-8 hidden md:flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-bold">Dashboard</h2>

          {/* Workspace Switcher */}
          <WorkspaceSwitcher />
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);

            const href = workspaceId
              ? `${item.href}?workspaceId=${workspaceId}`
              : item.href;

            return (
              <Link
                key={item.href}
                href={href}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition
                  ${
                    active
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                `}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* MOBILE TOP BAR */}
      <div className="md:hidden w-full bg-white border-b px-4 py-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Dashboard</h2>

        <div className="flex items-center gap-3">
          <WorkspaceSwitcher />
          <Link href="/dashboard/settings" className="btn btn-secondary text-sm">
            Settings
          </Link>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 md:p-10">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
