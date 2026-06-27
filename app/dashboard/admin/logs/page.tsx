"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLogs = async () => {
      const res = await fetch("/api/admin/logs");
      const data = await res.json();
      setLogs(data || []);
      setLoading(false);
    };

    loadLogs();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-muted text-lg py-20">
        Loading audit logs…
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Audit Logs</h1>
        <p className="text-muted mt-2">
          Track important actions taken across your organization.
        </p>
      </div>

      {/* Logs */}
      <div className="card">
        <h2 className="section-title">Recent Activity</h2>

        {logs.length === 0 ? (
          <p className="text-muted mt-2">No activity recorded yet.</p>
        ) : (
          <div className="mt-6 space-y-4">
            {logs.map((log) => (
              <div
                key={log.id}
                className="flex items-start justify-between border-b pb-4"
              >
                <div>
                  <p className="font-semibold text-gray-900">{log.action}</p>
                  <p className="text-muted text-sm mt-1">{log.description}</p>
                  <p className="text-muted text-xs mt-1">{log.timestamp}</p>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-gray-800">{log.actor}</p>
                  <p className="text-muted text-sm">User</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-12 flex gap-4">
        <Link href="/dashboard/admin" className="btn btn-secondary">
          Back to Admin
        </Link>

        <Link href="/dashboard" className="btn btn-success">
          Dashboard Home
        </Link>
      </div>
    </div>
  );
}
