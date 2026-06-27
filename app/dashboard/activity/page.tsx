"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ActivityFeedPage() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<any[]>([]);

  const load = async () => {
    const res = await fetch("/api/activity");
    const data = await res.json();
    setEvents(data || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-muted text-lg py-20">
        Loading activity feed…
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Activity Feed</h1>
        <p className="text-muted mt-2">
          View recent actions, system events, and AI activity across your account.
        </p>
      </div>

      {/* Activity List */}
      <div className="card">
        <h2 className="section-title">Recent Activity</h2>

        {events.length === 0 ? (
          <p className="text-muted mt-2">No activity yet.</p>
        ) : (
          <div className="mt-6 space-y-6">
            {events.map((e) => (
              <div
                key={e.id}
                className="flex items-start justify-between border-b pb-4"
              >
                <div>
                  <p className="font-semibold text-gray-900">{e.title}</p>

                  <p className="text-gray-700 mt-1">{e.description}</p>

                  <p className="text-muted text-xs mt-1">{e.timestamp}</p>
                </div>

                <span
                  className={`
                    text-xs px-2 py-1 rounded
                    ${
                      e.type === "system"
                        ? "bg-gray-200 text-gray-700"
                        : e.type === "grant"
                        ? "bg-blue-100 text-blue-700"
                        : e.type === "ai"
                        ? "bg-purple-100 text-purple-700"
                        : e.type === "security"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }
                  `}
                >
                  {e.type}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-12 flex gap-4">
        <Link href="/dashboard" className="btn btn-success">
          Dashboard Home
        </Link>
      </div>
    </div>
  );
}
