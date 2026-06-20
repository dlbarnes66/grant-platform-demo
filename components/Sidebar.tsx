"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  ClockIcon,
  BookmarkIcon,
  StarIcon,
  Squares2X2Icon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    {
      label: "Home",
      href: "/dashboard",
      icon: HomeIcon,
    },
    {
      label: "Search Grants",
      href: "/dashboard/search",
      icon: MagnifyingGlassIcon,
    },
    {
      label: "Search History",
      href: "/dashboard/search-history",
      icon: ClockIcon,
    },
    {
      label: "Saved Searches",
      href: "/dashboard/saved-searches",
      icon: BookmarkIcon,
    },
    {
      label: "Saved Grants",
      href: "/dashboard/saved-grants",
      icon: StarIcon,
    },
    {
      label: "Compare Grants",
      href: "/dashboard/compare",
      icon: Squares2X2Icon,
    },
    {
      label: "Jobs",
      href: "/dashboard/jobs",
      icon: BriefcaseIcon,
    },
  ];

  return (
    <aside className="w-64 bg-white border-r p-6 space-y-8 shadow-sm hidden md:block">
      <h2 className="text-2xl font-bold text-brandBlue">Dashboard</h2>

      <nav className="space-y-2">
        {links.map(({ label, href, icon: Icon }) => {
          const active = pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition ${
                active
                  ? "bg-brandBlue text-white"
                  : "text-gray-700 hover:bg-gray-100 hover:text-brandBlue"
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
