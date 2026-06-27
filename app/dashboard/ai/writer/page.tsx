"use client";

import { useState } from "react";
import Link from "next/link";

export default function AIGrantWriterPage() {
  const [orgInfo, setOrgInfo] = useState("");
  const [grantInfo, setGrantInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");

  const generate = async () => {
    if (!orgInfo || !grantInfo) {
      alert("Please fill out both fields.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/ai/writer", {
      method: "POST",
      body: JSON.stringify({
        orgInfo,
        grantInfo,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.error) {
      alert(data.error);
      return;
    }

    setOutput(data.text);
  };

  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI Grant Writer</h1>
        <p className="text-muted mt-2">
          Generate high‑quality grant proposal drafts instantly.
        </p>
      </div>

      {/* Input Card */}
      <div className="card">
        <h2 className="section-title">Your Information</h2>

        <div className="mt-6 space-y-6">

          {/* Organization Info */}
          <div>
            <label className="font-semibold text-gray-800">
              About Your Organization
            </label>
            <textarea
              className="textarea mt-2 w-full h-32"
              placeholder="Describe your mission, programs, impact, and community served…"
              value={orgInfo}
              onChange={(e) => setOrgInfo(e.target.value)}
            />
          </div>

          {/* Grant Info */}
          <div>
            <label className="font-semibold text-gray-800">
              About the Grant
            </label>
            <textarea
              className="textarea mt-2 w-full h-32"
              placeholder="Paste the grant description, requirements, or goals…"
              value={grantInfo}
              onChange={(e) => setGrantInfo(e.target.value)}
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={generate}
            disabled={loading}
            className="btn btn-primary mt-4"
          >
            {loading ? "Generating…" : "Generate Proposal Draft"}
          </button>
        </div>
      </div>

      {/* Output Card */}
      {output && (
        <div className="card">
          <h2 className="section-title">Generated Proposal Draft</h2>

          <pre className="whitespace-pre-wrap mt-4 text-gray-800">
            {output}
          </pre>

          <button
            className="btn btn-secondary mt-6"
            onClick={() => navigator.clipboard.writeText(output)}
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
