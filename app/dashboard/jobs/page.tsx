"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/jobs");
      const data = await res.json();
      setJobs(data);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-brandBlue">Jobs</h1>

      {loading && (
        <Card className="text-center py-10">
          <p className="text-gray-600">Loading jobs…</p>
        </Card>
      )}

      {!loading && jobs.length === 0 && (
        <Card className="text-center py-10">
          <h2 className="text-lg font-semibold text-gray-700">
            No jobs found
          </h2>
          <p className="text-gray-500 mt-2">
            Jobs will appear here when you run searches or comparisons.
          </p>
        </Card>
      )}

      <div className="space-y-4">
        {jobs.map((job) => (
          <Card key={job.id} className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                {job.type}
              </h2>
              <p className="text-gray-600 text-sm">
                Created: {new Date(job.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Badge
                variant={
                  job.status === "completed"
                    ? "success"
                    : job.status === "failed"
                    ? "danger"
                    : "info"
                }
              >
                {job.status}
              </Badge>

              <Link href={`/dashboard/jobs/${job.id}`}>
                <Button size="sm" variant="outline">
                  View Logs
                </Button>
              </Link>

              {job.status === "failed" && (
                <Button size="sm" variant="primary">
                  Retry
                </Button>
              )}

              {job.status === "running" && (
                <Button size="sm" variant="danger">
                  Cancel
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
