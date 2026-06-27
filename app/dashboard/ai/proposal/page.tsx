"use client";

import { useState } from "react";
import Link from "next/link";

export default function AIProposalWriterPage() {
  const [topic, setTopic] = useState("");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");

  const generate = async () => {
    if (!topic) {
      alert("Please enter a proposal topic.");
      return;
    }

    setLoading(true);
    setOutput("");

    const res = await fetch("/api/ai/proposal", {
      method: "POST",
      body: JSON.stringify({ topic, details }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.error) {
      alert(data.error);
      return;
    }

    setOutput(data.output);
  };

  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI Proposal Writer</h1>
        <p className="text-muted mt-2">
          Generate full grant proposals using AI. Provide a topic and optional details.
        </p>
      </div>

      {/* Input Card */}
      <div className="card">
        <h2 className="section-title">Proposal Inputs</h2>

        <div className="mt-6 space-y-6">

          {/* Topic */}
          <div>
            <label className="font-semibold text-gray-800">Proposal Topic</label>
            <input
              type="text"
              className="input mt-2 w-full"
              placeholder="e.g., Youth Workforce Development Program"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          {/* Additional Details */}
          <div>
            <label className="font-semibold text-gray-800">Additional Details (Optional)</label>
            <textarea
              className="input mt-2 w-full h-32"
              placeholder="Describe your organization, goals, target population, etc."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={generate}
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? "Generating…" : "Generate Proposal"}
          </button>
        </div>
      </div>

      {/* Output Card */}
      {output && (
        <div className="card">
          <h2 className="section-title">Generated Proposal</h2>

          <div className="mt-6 whitespace-pre-wrap text-gray-800">
            {output}
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
