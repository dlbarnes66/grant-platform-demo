"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function SystemStatusPage() {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<any>(null);

  const load = async () => {
    const res = await fetch("/api/system/status");
    const data = await res.json();
    setStatus(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-muted text-lg py-20">
        Checking system health…
      </div>
    );
  }

  const badge = (state: string) => {
    if (state === "operational")
      return "bg-green-100 text-green-700";
    if (state === "degraded")
      return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">System Status</h1>
        <p className="text-muted mt-2">
          Monitor platform uptime, service health, and recent incidents.
        </p>
      </div>

      {/* Overall Status */}
      <div className="card">
        <h2 className="section-title">Overall System Health</h2>

        <div className="mt-6 flex items-center gap-4">
          <span
            className={`px-3 py-1 rounded text-sm font-semibold ${badge(
              status.overall
            )}`}
          >
            {status.overall.toUpperCase()}
          </span>

          <p className="text-gray-700">
            {status.message}
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="card">
        <h2 className="section-title">Service Status</h2>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {status.services.map((svc: any) => (
            <div
              key={svc.name}
              className="p-4 bg-gray-50 rounded-lg border"
            >
              <p className="font-semibold text-gray-900">{svc.name}</p>

              <span
                className={`inline-block mt-2 px-3 py-1 rounded text-xs font-semibold ${badge(
                  svc.status
                )}`}
              >
                {svc.status.toUpperCase()}
              </span>

              <p className="text-muted text-sm mt-2">
                {svc.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Incidents */}
      <div className="card">
        <h2 className="section-title">Recent Incidents</h2>

        {status.incidents.length === 0 ? (
          <p className="text-muted mt-2">No incidents reported.</p>
        ) : (
          <div className="mt-6 space-y-4">
            {status.incidents.map((i: any) => (
              <div
                key={i.id}
                className="border-b pb-4"
              >
                <p className="font-semibold text-gray-900">{i.title}</p>
                <p className="text-gray-700 mt-1">{i.details}</p>
                <p className="text-muted text-xs mt-1">{i.timestamp}</p>
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
