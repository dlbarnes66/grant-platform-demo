"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    queued: 0,
    processing: 0,
    completed: 0,
    failed: 0,
  });

  async function fetchJobs() {
    const res = await fetch("/api/jobs");
    if (res.ok) {
      const data = await res.json();
      setJobs(data.jobs);

      setStats({
        total: data.jobs.length,
        queued: data.jobs.filter((j: any) => j.status === "queued").length,
        processing: data.jobs.filter((j: any) => j.status === "processing").length,
        completed: data.jobs.filter((j: any) => j.status === "completed").length,
        failed: data.jobs.filter((j: any) => j.status === "failed").length,
      });
    }
  }

  useEffect(() => {
    fetchJobs();
    const interval = setInterval(fetchJobs, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Jobs" value={stats.total} />
        <StatCard label="Queued" value={stats.queued} />
        <StatCard label="Processing" value={stats.processing} />
        <StatCard label="Completed" value={stats.completed} />
        <StatCard label="Failed" value={stats.failed} />
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Link
          href="/dashboard/search"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Create New Job
        </Link>

        <Link
          href="/dashboard/jobs"
          className="px-4 py-2 bg-gray-700 text-white rounded"
        >
          View All Jobs
        </Link>
      </div>

      {/* Recent Jobs */}
      <div className="border rounded bg-white">
        <h2 className="p-4 font-semibold border-b">Recent Jobs</h2>

        {jobs.length === 0 && (
          <div className="p-4 text-gray-600">No jobs yet.</div>
        )}

        {jobs.slice(0, 5).map((job) => (
          <Link
            key={job.id}
            href={`/dashboard/jobs/${job.id}`}
            className="block p-4 hover:bg-gray-50 border-b last:border-none"
          >
            <div className="flex justify-between">
              <div>
                <div className="font-medium">{job.text.slice(0, 60)}…</div>
                <div className="text-sm text-gray-600">
                  {new Date(job.createdAt).toLocaleString()}
                </div>
              </div>

              <span
                className={`px-3 py-1 rounded text-white ${
                  job.status === "queued"
                    ? "bg-gray-500"
                    : job.status === "processing"
                    ? "bg-yellow-500"
                    : job.status === "completed"
                    ? "bg-green-600"
                    : job.status === "failed"
                    ? "bg-red-600"
                    : "bg-gray-400"
                }`}
              >
                {job.status}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="p-4 border rounded text-center bg-white shadow-sm">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
}
