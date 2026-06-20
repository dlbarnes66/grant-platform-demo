"use client";

import { useEffect, useState } from "react";

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const jobId = params.id;

  const [job, setJob] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch job status
  async function fetchJob() {
    const res = await fetch(`/api/jobs/${jobId}`);
    if (res.ok) {
      const data = await res.json();
      setJob(data);
    }
  }

  // Fetch logs
  async function fetchLogs() {
    const res = await fetch(`/api/jobs/${jobId}/logs`);
    if (res.ok) {
      const data = await res.json();
      setLogs(data.logs);
    }
  }

  // Fetch result
  async function fetchResult() {
    const res = await fetch(`/api/jobs/${jobId}/result`);
    if (res.ok) {
      const data = await res.json();
      setResult(data.result);
    }
  }

  // Poll every 2 seconds
  useEffect(() => {
    async function load() {
      await fetchJob();
      await fetchLogs();
      await fetchResult();
      setLoading(false);
    }

    load();

    const interval = setInterval(load, 2000);
    return () => clearInterval(interval);
  }, []);

  async function retryJob() {
    await fetch(`/api/jobs/${jobId}/retry`, { method: "POST" });
  }

  async function cancelJob() {
    await fetch(`/api/jobs/${jobId}/cancel`, { method: "POST" });
  }

  async function rerunJob() {
    await fetch(`/api/jobs/${jobId}/rerun`, { method: "POST" });
  }

  if (loading) return <div className="p-6">Loading job…</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Job Details</h1>

      {/* Status */}
      <div className="p-4 border rounded">
        <h2 className="font-semibold">Status</h2>
        <p className="text-lg">{job?.status}</p>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={retryJob}
          className="px-4 py-2 bg-yellow-500 text-white rounded"
        >
          Retry
        </button>

        <button
          onClick={cancelJob}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Cancel
        </button>

        <button
          onClick={rerunJob}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Rerun
        </button>
      </div>

      {/* Logs */}
      <div className="p-4 border rounded">
        <h2 className="font-semibold mb-2">Logs</h2>
        <div className="space-y-1">
          {logs.map((log, i) => (
            <div key={i} className="text-sm text-gray-700">
              {log.message}
            </div>
          ))}
        </div>
      </div>

      {/* Result */}
      <div className="p-4 border rounded">
        <h2 className="font-semibold mb-2">Result</h2>
        {result ? (
          <pre className="whitespace-pre-wrap text-sm bg-gray-100 p-3 rounded">
            {JSON.stringify(result, null, 2)}
          </pre>
        ) : (
          <p>No result yet.</p>
        )}
      </div>
    </div>
  );
}
