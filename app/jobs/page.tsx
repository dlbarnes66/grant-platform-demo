"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function JobsListPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchJobs() {
    const res = await fetch("/api/jobs");
    if (res.ok) {
      const data = await res.json();
      setJobs(data.jobs);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchJobs();
    const interval = setInterval(fetchJobs, 2000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="p-6">Loading jobs…</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Your Jobs</h1>

      <Link
        href="/"
        className="inline-block px-4 py-2 bg-blue-600 text-white rounded"
      >
        Create New Job
      </Link>

      <div className="border rounded divide-y">
        {jobs.length === 0 && (
          <div className="p-4 text-gray-600">No jobs yet.</div>
        )}

        {jobs.map((job) => (
          <Link
            key={job.id}
            href={`/jobs/${job.id}`}
            className="block p-4 hover:bg-gray-50"
          >
            <div className="flex justify-between">
              <div>
                <div className="font-semibold">{job.text.slice(0, 60)}…</div>
                <div className="text-sm text-gray-600">
                  {new Date(job.createdAt).toLocaleString()}
                </div>
              </div>

              <div className="text-right">
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
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
