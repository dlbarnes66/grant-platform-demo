"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ApplicationsListPage() {
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadApps = async () => {
      const res = await fetch("/api/applications");
      const data = await res.json();
      setApps(data || []);
      setLoading(false);
    };

    loadApps();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-muted text-lg py-20">
        Loading applications…
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Your Applications</h1>
        <p className="text-muted mt-2">
          Track progress, upload documents, and submit completed applications.
        </p>
      </div>

      {/* Empty State */}
      {apps.length === 0 && (
        <div className="card text-center py-12">
          <p className="text-muted text-lg">You haven’t started any applications yet.</p>
          <Link href="/dashboard/search" className="btn btn-primary mt-6">
            Find Grants to Apply For
          </Link>
        </div>
      )}

      {/* Applications Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {apps.map((app) => (
          <div key={app.id} className="card hover-card">

            {/* Title */}
            <h2 className="text-lg font-semibold text-gray-900 leading-tight">
              {app.grantTitle}
            </h2>

            {/* Status */}
            <p className="text-muted text-sm mt-1">
              Status: {app.submitted ? "Submitted" : "In Progress"}
            </p>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="w-full bg-gray-200 h-3 rounded">
                <div
                  className="bg-blue-600 h-3 rounded"
                  style={{
                    width: `${(app.completedSections / app.totalSections) * 100}%`,
                  }}
                />
              </div>
              <p className="text-muted text-sm mt-1">
                {app.completedSections} / {app.totalSections} sections completed
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-col gap-3">
              <Link
                href={`/dashboard/applications/${app.id}`}
                className="btn btn-primary w-full text-center"
              >
                {app.submitted ? "View Application" : "Continue Application"}
              </Link>

              {!app.submitted && (
                <button
                  onClick={async () => {
                    if (!confirm("Delete this application?")) return;

                    await fetch(`/api/applications/${app.id}/delete`, {
                      method: "POST",
                    });

                    setApps((prev) => prev.filter((a) => a.id !== app.id));
                  }}
                  className="btn btn-danger w-full"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-12">
        <Link href="/dashboard" className="text-muted underline">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
