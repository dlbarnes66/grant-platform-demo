"use client";

import { useState } from "react";
import Link from "next/link";

export default function AIDraftEditorPage() {
  const [draft, setDraft] = useState("");
  const [instructions, setInstructions] = useState("");
  const [loading, setLoading] = useState(false);

  const improveDraft = async () => {
    if (!draft.trim()) return;

    setLoading(true);

    const res = await fetch("/api/ai/editor", {
      method: "POST",
      body: JSON.stringify({
        draft,
        instructions,
      }),
    });

    const data = await res.json();
    setDraft(data.output || draft);
    setLoading(false);
  };

  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI Draft Editor</h1>
        <p className="text-muted mt-2">
          Edit, refine, and improve proposal drafts using AI assistance.
        </p>
      </div>

      {/* Draft Editor */}
      <div className="card">
        <h2 className="section-title">Your Draft</h2>
        <p className="text-muted mt-2">
          Paste or write your draft here. The AI will help refine it.
        </p>

        <textarea
          className="textarea mt-4 w-full h-96"
          placeholder="Paste your draft here…"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
      </div>

      {/* Instructions */}
      <div className="card">
        <h2 className="section-title">Improvement Instructions</h2>
        <p className="text-muted mt-2">
          Optional: describe how you want the draft improved (tone, clarity, structure).
        </p>

        <input
          type="text"
          className="input mt-4 w-full"
          placeholder="Example: Make it more persuasive and tighten the narrative"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
      </div>

      {/* Improve Button */}
      <button
        onClick={improveDraft}
        disabled={loading}
        className="btn btn-primary"
      >
        {loading ? "Improving…" : "Improve Draft"}
      </button>

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
