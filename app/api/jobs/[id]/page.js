"use client";
import { useEffect, useState } from "react";

export default function JobStatusPage({ params }) {
  const { id } = params;
  const [job, setJob] = useState(null);

  useEffect(() => {
    async function fetchStatus() {
      const res = await fetch(`/api/jobs/${id}`);
      const data = await res.json();
      setJob(data);
    }

    fetchStatus();
    const interval = setInterval(fetchStatus, 2000);
    return () => clearInterval(interval);
  }, [id]);

  if (!job) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-4">Job Status</h2>

      <p><strong>Job ID:</strong> {id}</p>
      <p><strong>Status:</strong> {job.status}</p>

      {job.result && (
        <div className="mt-6 p-4 bg-white border rounded">
          <h3 className="text-xl font-semibold mb-2">Results</h3>
          <pre className="text-sm bg-gray-100 p-4 rounded">
            {JSON.stringify(job.result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
