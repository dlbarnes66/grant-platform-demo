"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardRecommendationsPage() {
  const [recs, setRecs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecs = async () => {
      const res = await fetch("/api/recommendations");
      const data = await res.json();
      setRecs(data || []);
      setLoading(false);
    };

    loadRecs();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-muted text-lg py-20">
        Loading recommendations…
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Recommended Grants</h1>
        <p className="text-muted mt-2">
          AI‑curated grants based on your searches, saved items, and activity.
        </p>
      </div>

      {/* Empty State */}
      {recs.length === 0 && (
        <div className="card text-center py-12">
          <p className="text-muted text-lg">
            No recommendations available yet. Try searching or saving grants.
          </p>
          <Link href="/dashboard/search" className="btn btn-primary mt-6">
            Search Grants
          </Link>
        </div>
      )}

      {/* Recommendations List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recs.map((grant) => (
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

      {/* Footer */}
      <div className="mt-12">
        <Link href="/dashboard" className="text-muted underline">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
