"use client";

import { useState } from "react";
import Link from "next/link";

export default function AIRewritePage() {
  const [inputText, setInputText] = useState("");
  const [instructions, setInstructions] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const runRewrite = async () => {
    if (!inputText.trim()) return;

    setLoading(true);

    const res = await fetch("/api/ai/rewrite", {
      method: "POST",
      body: JSON.stringify({
        text: inputText,
        instructions,
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
        <h1 className="text-3xl font-bold text-gray-900">AI Rewrite Tool</h1>
        <p className="text-muted mt-2">
          Improve clarity, tone, structure, or professionalism using AI.
        </p>
      </div>

      {/* Input Card */}
      <div className="card">
        <h2 className="section-title">Original Text</h2>
        <p className="text-muted mt-2">
          Paste the text you want the AI to rewrite.
        </p>

        <textarea
          className="textarea mt-4 w-full h-64"
          placeholder="Paste your text here…"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>

      {/* Instructions */}
      <div className="card">
        <h2 className="section-title">Rewrite Instructions</h2>
        <p className="text-muted mt-2">
          Optional: describe how you want the text rewritten (tone, length, style).
        </p>

        <input
          type="text"
          className="input mt-4 w-full"
          placeholder="Example: Make it more formal and concise"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
      </div>

      {/* Rewrite Button */}
      <button
        onClick={runRewrite}
        disabled={loading}
        className="btn btn-primary"
      >
        {loading ? "Rewriting…" : "Rewrite Text"}
      </button>

      {/* Output */}
      {output && (
        <div className="card">
          <h2 className="section-title">Rewritten Text</h2>

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
