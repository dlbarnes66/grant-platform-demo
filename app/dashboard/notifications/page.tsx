"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function NotificationCenterPage() {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<any[]>([]);

  const load = async () => {
    const res = await fetch("/api/notifications");
    const data = await res.json();
    setNotifications(data || []);
    setLoading(false);
  };

  const markRead = async (id: string) => {
    await fetch("/api/notifications/read", {
      method: "POST",
      body: JSON.stringify({ id }),
    });

    load();
  };

  const markAllRead = async () => {
    await fetch("/api/notifications/read-all", {
      method: "POST",
    });

    load();
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-muted text-lg py-20">
        Loading notifications…
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-muted mt-2">
            Stay updated with grant alerts, AI activity, and system messages.
          </p>
        </div>

        {notifications.some((n) => !n.read) && (
          <button onClick={markAllRead} className="btn btn-secondary">
            Mark All as Read
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="card">
        <h2 className="section-title">Recent Alerts</h2>

        {notifications.length === 0 ? (
          <p className="text-muted mt-2">No notifications yet.</p>
        ) : (
          <div className="mt-6 space-y-4">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`flex items-start justify-between border-b pb-4 ${
                  !n.read ? "bg-yellow-50" : ""
                }`}
              >
                <div>
                  <p className="font-semibold text-gray-900">{n.title}</p>
                  <p className="text-gray-700 mt-1">{n.message}</p>
                  <p className="text-muted text-xs mt-1">{n.timestamp}</p>
                </div>

                {!n.read && (
                  <button
                    onClick={() => markRead(n.id)}
                    className="btn btn-primary btn-sm"
                  >
                    Mark Read
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-12 flex gap-4">
        <Link href="/dashboard/settings/notifications" className="btn btn-secondary">
          Notification Settings
        </Link>

        <Link href="/dashboard" className="btn btn-success">
          Dashboard Home
        </Link>
      </div>
    </div>
  );
}
