"use client";

import { useEffect, useState } from "react";
import Card, { CardHeader } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import {
  FunnelIcon,
  ShieldCheckIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

export default function AuditLogsPage() {
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState<any[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/audit-logs");
      const data = await res.json();
      setLogs(data);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = logs.filter((log) =>
    log.action.toLowerCase().includes(query.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-6">
        <Card className="text-center py-10">
          <p className="text-gray-600">Loading audit logs…</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-brandBlue">Audit Logs</h1>

      {/* Filters */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <FunnelIcon className="w-5 h-5 text-brandBlue" />
            Filter Logs
          </h2>
        </CardHeader>

        <div className="p-4">
          <Input
            placeholder="Search actions…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </Card>

      {/* Logs */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <ShieldCheckIcon className="w-5 h-5 text-brandBlue" />
            Activity Feed
          </h2>
        </CardHeader>

        <div className="divide-y">
          {filtered.length === 0 && (
            <p className="text-gray-500 p-4">No logs found.</p>
          )}

          {filtered.map((log) => (
            <div
              key={log.id}
              className="p-4 flex items-start justify-between gap-4"
            >
              <div className="space-y-1">
                <p className="font-medium text-gray-800">{log.action}</p>

                <p className="text-gray-500 text-sm">
                  User: {log.userName || "Unknown"}
                </p>

                <p className="text-gray-500 text-sm">
                  IP: {log.ip || "N/A"}
                </p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <Badge
                  variant={
                    log.type === "security"
                      ? "danger"
                      : log.type === "system"
                      ? "warning"
                      : "info"
                  }
                >
                  {log.type}
                </Badge>

                <div className="flex items-center gap-1 text-gray-500 text-sm">
                  <ClockIcon className="w-4 h-4" />
                  {new Date(log.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
