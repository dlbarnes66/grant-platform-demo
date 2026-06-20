"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function CompareTable({ grants, onRemove }: any) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const attributes = [
    { key: "amount", label: "Funding Amount" },
    { key: "deadline", label: "Deadline" },
    { key: "category", label: "Category" },
    { key: "summary", label: "Summary" },
  ];

  function toggle(id: string) {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead className="sticky top-0 bg-white shadow-sm z-10">
          <tr>
            <th className="w-48 text-left p-4 text-gray-700 font-semibold border-b">
              Attribute
            </th>

            {grants.map((g: any) => (
              <th
                key={g.id}
                className="min-w-64 p-4 text-brandBlue font-semibold border-b"
              >
                <div className="flex items-center justify-between">
                  <span>{g.title}</span>
                  <button
                    onClick={() => onRemove(g.id)}
                    className="text-gray-500 hover:text-red-600 transition"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {attributes.map((attr) => (
            <tr key={attr.key} className="border-b">
              <td className="p-4 font-medium text-gray-700 bg-gray-50">
                {attr.label}
              </td>

              {grants.map((g: any) => {
                const value = g[attr.key] || "—";
                const long = typeof value === "string" && value.length > 120;

                return (
                  <td key={g.id} className="p-4 align-top text-gray-700">
                    {attr.key === "category" ? (
                      <Badge variant="info">{value}</Badge>
                    ) : long ? (
                      <>
                        <p className="line-clamp-3">
                          {expanded[g.id] ? value : value.slice(0, 120) + "..."}
                        </p>
                        <button
                          onClick={() => toggle(g.id)}
                          className="text-brandBlue text-sm mt-1"
                        >
                          {expanded[g.id] ? "Show Less" : "Show More"}
                        </button>
                      </>
                    ) : (
                      <span>{value}</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
