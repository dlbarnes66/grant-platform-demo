"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function JobDetailsPage() {
  const params = useParams();
  const jobId = params.id as string;

  const [job, setJob] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function loadJob() {
    const res = await fetch(`/api/jobs/${jobId}`);
    const data = await res.json();

    setJob(data.job || null);
    setLogs(data.logs || []);
    setResult(data.result || null);
    setLoading(false);
  }

  async function retryJob() {
    await fetch(`/api/jobs/${jobId}/rerun`, { method: "POST" });
    loadJob();
  }

  async function duplicateJob() {
    await fetch(`/api/jobs/${jobId}/duplicate`, { method: "POST" });
  }

  useEffect(() => {
    loadJob();
    const interval = setInterval(loadJob, 2000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !job) {
    return (
      <div className="text-brandBlue font-medium">
        Loading job details…
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-brandBlue">Job Details</h1>

        <div className="flex gap-3">
          <button
            onClick={retryJob}
            className="px-4 py-2 bg-brandBlue text-white rounded-lg hover:bg-brandGold hover:text-black transition"
          >
            Retry
          </button>

          <button
            onClick={duplicateJob}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-brandGold hover:text-black transition"
          >
            Duplicate
          </button>
        </div>
      </div>

      {/* Job Info */}
      <div className="p-6 bg-white border rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-brandBlue mb-2">Job Text</h2>
        <p className="text-gray-700 whitespace-pre-wrap">{job.text}</p>

        <div className="mt-4">
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

      {/* Logs */}
      <div className="p-6 bg-white border rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-brandBlue mb-4">Logs</h2>

        {logs.length === 0 && (
          <p className="text-gray-500">No logs yet.</p>
        )}

        <div className="space-y-2">
          {logs.map((log) => (
            <div
              key={log.id}
              className="p-3 border rounded bg-brandLight text-gray-800"
            >
              <div className="text-sm text-gray-600">
                {new Date(log.createdAt).toLocaleString()}
              </div>
              <div>{log.message}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Result */}
      <div className="p-6 bg-white border rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-brandBlue mb-4">Result</h2>

        {!result && (
          <p className="text-gray-500">No result yet.</p>
        )}

        {result && (
          <pre className="whitespace-pre-wrap bg-brandLight p-4 rounded border text-gray-800">
            {JSON.stringify(result.result, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
