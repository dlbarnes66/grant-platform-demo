"use client";

import { useState } from "react";
import Link from "next/link";

export default function DashboardSearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const runSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);

    const res = await fetch("/api/search", {
      method: "POST",
      body: JSON.stringify({ query }),
    });

    const data = await res.json();
    setResults(data.results || []);
    setLoading(false);
  };

  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Search Grants</h1>
        <p className="text-muted mt-2">
          Find grants that match your mission, location, and eligibility.
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Search grants…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input flex-1"
        />

        <button
          onClick={runSearch}
          disabled={loading}
          className="btn btn-primary"
        >
          {loading ? "Searching…" : "Search"}
        </button>
      </div>

      {/* Results */}
      <div>
        {loading && (
          <p className="text-muted text-lg">Searching for grants…</p>
        )}

        {!loading && results.length === 0 && (
          <p className="text-muted mt-4">No results yet. Try a search.</p>
        )}

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((grant) => (
            <div key={grant.id} className="card hover-card">

              {/* Title */}
              <h2 className="text-lg font-semibold text-gray-900 leading-tight">
                {grant.title}
              </h2>

              {/* Agency */}
              {grant.agency && (
                <p className="text-muted mt-1">{grant.agency}</p>
              )}

              {/* Metadata */}
              <div className="mt-4 space-y-1 text-sm text-gray-700">
                <p>
                  <span className="font-semibold">Amount:</span>{" "}
                  {grant.amount || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Deadline:</span>{" "}
                  {grant.deadline || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Category:</span>{" "}
                  {grant.category || "N/A"}
                </p>
              </div>

              {/* Summary */}
              <p className="mt-4 text-gray-700 text-sm leading-relaxed line-clamp-4">
                {grant.summary || "No summary available."}
              </p>

              {/* Buttons */}
              <div className="mt-6 flex flex-col gap-3">
                <Link
                  href={`/dashboard/grants/${grant.id}`}
                  className="btn btn-success w-full text-center"
                >
                  View Details
                </Link>

                <Link
                  href={`/dashboard/grants/${grant.id}/write`}
                  className="btn btn-primary w-full text-center"
                >
                  Write with AI
                </Link>
              </div>
            </div>
          ))}
        </div>
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
