"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function SessionsPage() {
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState<any[]>([]);
  const [revoking, setRevoking] = useState(false);

  const loadSessions = async () => {
    const res = await fetch("/api/settings/sessions");
    const data = await res.json();
    setSessions(data || []);
    setLoading(false);
  };

  const revokeSession = async (id: string) => {
    if (!confirm("Are you sure you want to revoke this session?")) return;

    await fetch("/api/settings/sessions/revoke", {
      method: "POST",
      body: JSON.stringify({ id }),
    });

    loadSessions();
  };

  const revokeAll = async () => {
    if (!confirm("Log out of all devices except this one?")) return;

    setRevoking(true);

    await fetch("/api/settings/sessions/revoke-all", {
      method: "POST",
    });

    setRevoking(false);
    loadSessions();
  };

  useEffect(() => {
    loadSessions();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-muted text-lg py-20">
        Loading sessions…
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Active Sessions</h1>
          <p className="text-muted mt-2">
            View and manage devices currently logged into your account.
          </p>
        </div>

        <Link href="/dashboard/settings/security" className="btn btn-secondary">
          Back to Security
        </Link>
      </div>

      {/* Sessions List */}
      <div className="card">
        <h2 className="section-title">Your Devices</h2>

        {sessions.length === 0 ? (
          <p className="text-muted mt-2">No active sessions found.</p>
        ) : (
          <div className="mt-6 space-y-4">
            {sessions.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div>
                  <p className="font-semibold text-gray-900">
                    {s.device} — {s.browser}
                  </p>

                  <p className="text-muted text-sm">
                    {s.location} • Last active: {s.lastActive}
                  </p>

                  {s.current && (
                    <p className="text-green-600 text-sm font-semibold mt-1">
                      This device
                    </p>
                  )}
                </div>

                {!s.current && (
                  <button
                    onClick={() => revokeSession(s.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Revoke
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Revoke All */}
        {sessions.length > 1 && (
          <button
            onClick={revokeAll}
            disabled={revoking}
            className="btn btn-primary mt-6"
          >
            {revoking ? "Revoking…" : "Log Out of All Other Devices"}
          </button>
        )}
      </div>

      {/* Footer */}
      <div className="mt-12 flex gap-4">
        <Link href="/dashboard/settings" className="btn btn-secondary">
          Settings Home
        </Link>

        <Link href="/dashboard" className="btn btn-success">
          Dashboard Home
        </Link>
      </div>
    </div>
  );
}
