"use client";

import { useState } from "react";
import Link from "next/link";

export default function AIGrantSummaryPage() {
  const [grantText, setGrantText] = useState("");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");

  const generateSummary = async () => {
    if (!grantText) {
      alert("Please paste the grant text.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/ai/summary", {
      method: "POST",
      body: JSON.stringify({ text: grantText }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.error) {
      alert(data.error);
      return;
    }

    setSummary(data.summary);
  };

  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI Grant Summary</h1>
        <p className="text-muted mt-2">
          Paste any grant description and get a clean, structured summary.
        </p>
      </div>

      {/* Input Card */}
      <div className="card">
        <h2 className="section-title">Grant Text</h2>

        <textarea
          className="textarea mt-4 w-full h-48"
          placeholder="Paste the full grant description here…"
          value={grantText}
          onChange={(e) => setGrantText(e.target.value)}
        />

        <button
          onClick={generateSummary}
          disabled={loading}
          className="btn btn-primary mt-6"
        >
          {loading ? "Summarizing…" : "Generate Summary"}
        </button>
      </div>

      {/* Output Card */}
      {summary && (
        <div className="card">
          <h2 className="section-title">Summary</h2>

          <pre className="whitespace-pre-wrap mt-4 text-gray-800">
            {summary}
          </pre>

          <button
            className="btn btn-secondary mt-6"
            onClick={() => navigator.clipboard.writeText(summary)}
          >
            Copy to Clipboard
          </button>
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
