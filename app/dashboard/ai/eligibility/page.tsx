"use client";

import { useState } from "react";
import Link from "next/link";

export default function AIEligibilityCheckerPage() {
  const [orgInfo, setOrgInfo] = useState("");
  const [grantText, setGrantText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const checkEligibility = async () => {
    if (!orgInfo || !grantText) {
      alert("Please fill out both fields.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/ai/eligibility", {
      method: "POST",
      body: JSON.stringify({
        orgInfo,
        grantText,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.error) {
      alert(data.error);
      return;
    }

    setResult(data.result);
  };

  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI Eligibility Checker</h1>
        <p className="text-muted mt-2">
          Instantly determine whether your organization qualifies for a grant.
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
              placeholder="Describe your mission, programs, population served, and structure…"
              value={orgInfo}
              onChange={(e) => setOrgInfo(e.target.value)}
            />
          </div>

          {/* Grant Text */}
          <div>
            <label className="font-semibold text-gray-800">
              Grant Description
            </label>
            <textarea
              className="textarea mt-2 w-full h-32"
              placeholder="Paste the full grant description or eligibility section…"
              value={grantText}
              onChange={(e) => setGrantText(e.target.value)}
            />
          </div>

          {/* Check Button */}
          <button
            onClick={checkEligibility}
            disabled={loading}
            className="btn btn-primary mt-4"
          >
            {loading ? "Analyzing…" : "Check Eligibility"}
          </button>
        </div>
      </div>

      {/* Output Card */}
      {result && (
        <div className="card">
          <h2 className="section-title">Eligibility Result</h2>

          <pre className="whitespace-pre-wrap mt-4 text-gray-800">
            {result}
          </pre>

          <button
            className="btn btn-secondary mt-6"
            onClick={() => navigator.clipboard.writeText(result)}
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
