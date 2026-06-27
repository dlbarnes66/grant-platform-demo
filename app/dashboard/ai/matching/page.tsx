"use client";

import { useState } from "react";
import Link from "next/link";

export default function AIGrantMatchingPage() {
  const [orgInfo, setOrgInfo] = useState("");
  const [keywords, setKeywords] = useState("");
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState<any[]>([]);

  const findMatches = async () => {
    if (!orgInfo) {
      alert("Please describe your organization.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/ai/matching", {
      method: "POST",
      body: JSON.stringify({
        orgInfo,
        keywords,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.error) {
      alert(data.error);
      return;
    }

    setMatches(data.matches || []);
  };

  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI Grant Matching</h1>
        <p className="text-muted mt-2">
          Discover grants that align with your mission, programs, and community.
        </p>
      </div>

      {/* Input Card */}
      <div className="card">
        <h2 className="section-title">Your Organization</h2>

        <div className="mt-6 space-y-6">

          {/* Organization Info */}
          <div>
            <label className="font-semibold text-gray-800">
              About Your Organization
            </label>
            <textarea
              className="textarea mt-2 w-full h-32"
              placeholder="Describe your mission, programs, geography, demographics served…"
              value={orgInfo}
              onChange={(e) => setOrgInfo(e.target.value)}
            />
          </div>

          {/* Keywords */}
          <div>
            <label className="font-semibold text-gray-800">
              Optional Keywords
            </label>
            <input
              type="text"
              className="input mt-2 w-full"
              placeholder="education, youth, housing, veterans…"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
            <p className="text-muted text-sm mt-1">
              Helps the AI refine your matches.
            </p>
          </div>

          {/* Match Button */}
          <button
            onClick={findMatches}
            disabled={loading}
            className="btn btn-primary mt-4"
          >
            {loading ? "Finding Matches…" : "Find Matching Grants"}
          </button>
        </div>
      </div>

      {/* Results */}
      {matches.length > 0 && (
        <div className="card">
          <h2 className="section-title">Matching Grants</h2>

          <div className="mt-6 space-y-6">
            {matches.map((g, idx) => (
              <div
                key={idx}
                className="border-b pb-4 flex flex-col gap-2"
              >
                <p className="font-semibold text-gray-900 text-lg">
                  {g.title}
                </p>

                <p className="text-muted text-sm">{g.funder}</p>

                <p className="text-gray-800">{g.summary}</p>

                <p className="text-sm text-gray-700 mt-1">
                  <strong>Match Score:</strong> {g.score}%
                </p>

                <a
                  href={g.url}
                  target="_blank"
                  className="btn btn-secondary btn-sm mt-2 w-fit"
                >
                  View Grant
                </a>
              </div>
            ))}
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
