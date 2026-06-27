"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardSavedSearchesPage() {
  const [searches, setSearches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSaved = async () => {
      const res = await fetch("/api/saved-searches");
      const data = await res.json();
      setSearches(data || []);
      setLoading(false);
    };

    loadSaved();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-muted text-lg py-20">
        Loading saved searches…
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Saved Searches</h1>
        <p className="text-muted mt-2">
          Quickly re-run your previous searches or manage saved queries.
        </p>
      </div>

      {/* Empty State */}
      {searches.length === 0 && (
        <div className="card text-center py-12">
          <p className="text-muted text-lg">You haven’t saved any searches yet.</p>
          <Link href="/dashboard/search" className="btn btn-primary mt-6">
            Search Grants
          </Link>
        </div>
      )}

      {/* Saved Searches List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {searches.map((search) => (
          <div key={search.id} className="card hover-card">

            {/* Query */}
            <h2 className="text-lg font-semibold text-gray-900 leading-tight">
              {search.query}
            </h2>

            {/* Timestamp */}
            <p className="text-muted text-sm mt-1">
              Saved on {new Date(search.createdAt).toLocaleDateString()}
            </p>

            {/* Buttons */}
            <div className="mt-6 flex flex-col gap-3">
              <Link
                href={`/dashboard/search?query=${encodeURIComponent(search.query)}`}
                className="btn btn-success w-full text-center"
              >
                Run Search
              </Link>

              <button
                onClick={async () => {
                  await fetch(`/api/saved-searches/${search.id}`, {
                    method: "DELETE",
                  });
                  setSearches((prev) => prev.filter((s) => s.id !== search.id));
                }}
                className="btn btn-danger w-full"
              >
                Remove
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
