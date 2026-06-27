"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardSearchHistoryPage() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHistory = async () => {
      const res = await fetch("/api/search-history");
      const data = await res.json();
      setHistory(data || []);
      setLoading(false);
    };

    loadHistory();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-muted text-lg py-20">
        Loading search history…
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Search History</h1>
        <p className="text-muted mt-2">
          Quickly re-run past searches or clean up your history.
        </p>
      </div>

      {/* Empty State */}
      {history.length === 0 && (
        <div className="card text-center py-12">
          <p className="text-muted text-lg">No search history yet.</p>
          <Link href="/dashboard/search" className="btn btn-primary mt-6">
            Search Grants
          </Link>
        </div>
      )}

      {/* History List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {history.map((item) => (
          <div key={item.id} className="card hover-card">

            {/* Query */}
            <h2 className="text-lg font-semibold text-gray-900 leading-tight">
              {item.query}
            </h2>

            {/* Timestamp */}
            <p className="text-muted text-sm mt-1">
              {new Date(item.createdAt).toLocaleString()}
            </p>

            {/* Buttons */}
            <div className="mt-6 flex flex-col gap-3">
              <Link
                href={`/dashboard/search?query=${encodeURIComponent(item.query)}`}
                className="btn btn-success w-full text-center"
              >
                Run Again
              </Link>

              <button
                onClick={async () => {
                  await fetch(`/api/search-history/${item.id}`, {
                    method: "DELETE",
                  });
                  setHistory((prev) => prev.filter((h) => h.id !== item.id));
                }}
                className="btn btn-danger w-full"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
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
