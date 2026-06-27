"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardJobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJobs = async () => {
      const res = await fetch("/api/jobs");
      const data = await res.json();
      setJobs(data || []);
      setLoading(false);
    };

    loadJobs();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-muted text-lg py-20">
        Loading jobs…
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI Jobs</h1>
        <p className="text-muted mt-2">
          Track the status of your AI‑powered tasks, writers, and analyzers.
        </p>
      </div>

      {/* Empty State */}
      {jobs.length === 0 && (
        <div className="card text-center py-12">
          <p className="text-muted text-lg">No jobs found.</p>
          <Link href="/dashboard/search" className="btn btn-primary mt-6">
            Start a Search
          </Link>
        </div>
      )}

      {/* Jobs List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div key={job.id} className="card hover-card">

            {/* Title */}
            <h2 className="text-lg font-semibold text-gray-900 leading-tight">
              {job.type || "Job"}
            </h2>

            {/* Status */}
            <p className="text-sm mt-1">
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={
                  job.status === "completed"
                    ? "text-green-600"
                    : job.status === "failed"
                    ? "text-red-600"
                    : "text-blue-600"
                }
              >
                {job.status}
              </span>
            </p>

            {/* Timestamp */}
            <p className="text-muted text-sm mt-1">
              Created: {new Date(job.createdAt).toLocaleString()}
            </p>

            {/* Buttons */}
            <div className="mt-6 flex flex-col gap-3">
              <Link
                href={`/dashboard/jobs/${job.id}`}
                className="btn btn-primary w-full text-center"
              >
                View Job
              </Link>

              {job.status === "failed" && (
                <button
                  onClick={async () => {
                    await fetch(`/api/jobs/${job.id}/retry`, { method: "POST" });
                    location.reload();
                  }}
                  className="btn btn-secondary w-full"
                >
                  Retry
                </button>
              )}

              <button
                onClick={async () => {
                  await fetch(`/api/jobs/${job.id}/delete`, { method: "POST" });
                  setJobs((prev) => prev.filter((j) => j.id !== job.id));
                }}
                className="btn btn-danger w-full"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Back Link */}
      <div className="mt-12">
        <Link href="/dashboard" className="text-muted underline">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
