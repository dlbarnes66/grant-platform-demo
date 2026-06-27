"use client";

import { useState } from "react";
import Link from "next/link";

export default function AIOutlinePage() {
  const [topic, setTopic] = useState("");
  const [style, setStyle] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const runOutline = async () => {
    if (!topic.trim()) return;

    setLoading(true);

    const res = await fetch("/api/ai/outline", {
      method: "POST",
      body: JSON.stringify({
        topic,
        style,
      }),
    });

    const data = await res.json();
    setOutput(data.output || "");
    setLoading(false);
  };

  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI Outline Generator</h1>
        <p className="text-muted mt-2">
          Create structured proposal outlines, section frameworks, and narrative flow.
        </p>
      </div>

      {/* Topic Input */}
      <div className="card">
        <h2 className="section-title">Project or Proposal Topic</h2>
        <p className="text-muted mt-2">
          Describe the project, program, or grant narrative you want outlined.
        </p>

        <textarea
          className="textarea mt-4 w-full h-48"
          placeholder="Example: Outline a proposal for a youth mentorship program expanding into rural communities…"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
      </div>

      {/* Style Input */}
      <div className="card">
        <h2 className="section-title">Outline Style (Optional)</h2>
        <p className="text-muted mt-2">
          Specify a structure or format (e.g., federal grant outline, logic model, narrative sections).
        </p>

        <input
          type="text"
          className="input mt-4 w-full"
          placeholder="Example: Use a federal grant narrative structure with 5 sections"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
        />
      </div>

      {/* Generate Button */}
      <button
        onClick={runOutline}
        disabled={loading}
        className="btn btn-primary"
      >
        {loading ? "Generating…" : "Generate Outline"}
      </button>

      {/* Output */}
      {output && (
        <div className="card">
          <h2 className="section-title">Generated Outline</h2>

          <textarea
            className="textarea mt-4 w-full h-96"
            value={output}
            readOnly
          />
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
