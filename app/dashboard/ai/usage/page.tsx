"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AIUsagePage() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);

  const load = async () => {
    const res = await fetch("/api/ai/usage");
    const data = await res.json();

    setSummary(data.summary || {});
    setLogs(data.logs || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-muted text-lg py-20">
        Loading AI usage…
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI Usage Logs</h1>
        <p className="text-muted mt-2">
          Track your AI requests, token usage, and tool activity.
        </p>
      </div>

      {/* Summary Card */}
      <div className="card">
        <h2 className="section-title">Usage Summary</h2>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-700 font-semibold">Total Requests</p>
            <p className="text-3xl font-bold mt-2">{summary.requests}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-700 font-semibold">Total Tokens</p>
            <p className="text-3xl font-bold mt-2">{summary.tokens}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-700 font-semibold">Most Used Tool</p>
            <p className="text-xl font-bold mt-2">{summary.topTool}</p>
          </div>
        </div>
      </div>

      {/* Logs Card */}
      <div className="card">
        <h2 className="section-title">Request Logs</h2>

        {logs.length === 0 ? (
          <p className="text-muted mt-2">No usage logs found.</p>
        ) : (
          <div className="mt-6 space-y-4">
            {logs.map((log) => (
              <div
                key={log.id}
                className="flex items-start justify-between border-b pb-4"
              >
                <div>
                  <p className="font-semibold text-gray-900">
                    {log.tool.replace(/_/g, " ")}
                  </p>

                  <p className="text-muted text-sm mt-1">
                    {log.timestamp} • Tokens: {log.tokens}
                  </p>

                  <p className="text-gray-700 text-sm mt-1">
                    Status:{" "}
                    <span
                      className={
                        log.status === "completed"
                          ? "text-green-600"
                          : log.status === "failed"
                          ? "text-red-600"
                          : "text-blue-600"
                      }
                    >
                      {log.status}
                    </span>
                  </p>
                </div>

                <Link
                  href={`/dashboard/ai/history?id=${log.id}`}
                  className="btn btn-secondary btn-sm"
                >
                  View
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-12 flex gap-4">
        <Link href="/dashboard/ai" className="btn btn-secondary">
          Back to AI Tools
        </Link>

        <Link href="/dashboard" className="btn btn-success">
          Dashboard Home
        </Link>
      </div>
    </div>
  );
}
