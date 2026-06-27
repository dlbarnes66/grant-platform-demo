"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AuditLogsPage() {
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState<any[]>([]);

  const loadLogs = async () => {
    const res = await fetch("/api/admin/audit");
    const data = await res.json();
    setLogs(data || []);
    setLoading(false);
  };

  useEffect(() => {
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Audit Logs</h1>
          <p className="text-muted mt-2">
            Review all administrative and user activity across your organization.
          </p>
        </div>

        <Link href="/dashboard/admin" className="btn btn-secondary">
          Admin Home
        </Link>
      </div>

      {/* Logs */}
      <div className="card">
        <h2 className="section-title">Activity History</h2>

        {logs.length === 0 ? (
          <p className="text-muted mt-2">No audit logs found.</p>
        ) : (
          <div className="mt-6 space-y-4">
            {logs.map((log) => (
              <div
                key={log.id}
                className="flex items-start justify-between border-b pb-4"
              >
                <div>
                  <p className="font-semibold text-gray-900">
                    {log.action}
                  </p>

                  <p className="text-gray-700 mt-1">
                    {log.description}
                  </p>

                  <p className="text-muted text-xs mt-1">
                    {log.user} • {log.timestamp}
                  </p>
                </div>

                <span
                  className="
                    text-xs px-2 py-1 rounded 
                    bg-gray-200 text-gray-700
                  "
                >
                  {log.type}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-12 flex gap-4">
        <Link href="/dashboard/admin/organization" className="btn btn-secondary">
          Organization Settings
        </Link>

        <Link href="/dashboard" className="btn btn-success">
          Dashboard Home
        </Link>
      </div>
    </div>
  );
}
