"use client";

import { useState } from "react";
import Spinner from "../../components/Spinner";

export default function SearchPage() {
  const [keywords, setKeywords] = useState("");
  const [jobId, setJobId] = useState(null);
  const [status, setStatus] = useState(null);
  const [results, setResults] = useState(null);

  async function startSearch() {
    setStatus("starting");
    setResults(null);

    const res = await fetch("/api/jobs/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keywords }),
    });

    if (!res.ok) {
      setStatus("error");
      return;
    }

    const data = await res.json();
    setJobId(data.jobId);
    setStatus("queued");

    pollStatus(data.jobId);
  }

  async function pollStatus(id) {
    const interval = setInterval(async () => {
      const res = await fetch(`/api/jobs/status?jobId=${id}`);
      const data = await res.json();

      setStatus(data.state);

      if (data.state === "completed") {
        clearInterval(interval);
        setResults(data.result.results);
      }

      if (data.state === "failed") {
        clearInterval(interval);
        setStatus("error");
      }
    }, 1500);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Search Grants</h1>

      <input
        className="border p-2 rounded w-full mb-4"
        placeholder="Enter keywords..."
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
      />

      <button
        onClick={startSearch}
        disabled={status && status !== "completed" && status !== "error"}
        className={`px-4 py-2 rounded text-white ${
          status && status !== "completed" && status !== "error"
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {status && status !== "completed" && status !== "error"
          ? "Working..."
          : "Start Search"}
      </button>

      {status && (
        <div className="mt-4 flex items-center gap-3">
          {status !== "completed" && status !== "error" && <Spinner />}
          <p className="text-gray-700">
            {status === "starting" && "Starting search..."}
            {status === "queued" && "Job queued..."}
            {status === "active" && "Searching grants..."}
            {status === "completed" && "Search complete!"}
            {status === "error" && "Something went wrong."}
          </p>
        </div>
      )}

      {results && (
        <div className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold">Matching Grants</h2>

          {results.map((r, i) => (
            <div key={i} className="border p-4 rounded shadow-sm bg-white">
              <p className="text-lg font-bold">{r.title}</p>
              <p className="text-gray-700">Amount: {r.amount}</p>
              <p className="text-gray-700">Deadline: {r.deadline}</p>
              <p className="text-gray-500 text-sm mt-2">Match: {r.match}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
