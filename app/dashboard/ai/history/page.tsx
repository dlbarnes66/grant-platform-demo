"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AIHistoryPage() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);

  const load = async () =>
    {
      const res = await fetch("/api/ai/history");
      const data = await res.json();
      setJobs(data || []);
      setLoading(false);
    };

  useEffect(() => {
    load();
  }, []);

  const rerun = async (id: string) => {
    const res = await fetch("/api/ai/history/rerun", {
      method: "POST",
      body: JSON.stringify({ id }),
    });

    const data = await res.json();

    if (data.error) {
      alert(data.error);
      return;
    }

    alert("Job re‑run started!");
    load();
  };

  if (loading) {
    return (
      <div className="text-center text-muted text-lg py-20">
        Loading AI job history…
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI Job History</h1>
        <p className="text-muted mt-2">
          View all AI tasks, outputs, and execution logs.
        </p>
      </div>

      {/* Jobs List */}
      <div className="card">
        <h2 className="section-title">Recent Jobs</h2>

        {jobs.length === 0 ? (
          <p className="text-muted mt-2">No AI jobs found.</p>
        ) : (
          <div className="mt-6 space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="flex items-start justify-between border-b pb-4"
              >
                <div>
                  <p className="font-semibold text-gray-900">
                    {job.type.replace(/_/g, " ")}
                  </p>

                  <p className="text-muted text-sm mt-1">
                    {job.timestamp} • Tokens: {job.tokens}
                  </p>

                  <p className="text-gray-700 text-sm mt-1">
                    Status:{" "}
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
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setSelected(job)}
                    className="btn btn-secondary btn-sm"
                  >
                    View
                  </button>

                  <button
                    onClick={() => rerun(job.id)}
                    className="btn btn-primary btn-sm"
                  >
                    Re‑Run
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Output Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-3xl max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900">
              Job Output
            </h2>

            <p className="text-muted mt-1 text-sm">
              {selected.type.replace(/_/g, " ")} • {selected.timestamp}
            </p>

            <div className="mt-6 whitespace-pre-wrap text-gray-800">
              {selected.output}
            </div>

            <div className="mt-8 flex justify-end gap-4">
              <button
                onClick={() => setSelected(null)}
                className="btn btn-secondary"
              >
                Close
              </button>

              <button
                onClick={() => rerun(selected.id)}
                className="btn btn-primary"
              >
                Re‑Run Job
              </button>
            </div>
          </div>
        </div>
      )}

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
