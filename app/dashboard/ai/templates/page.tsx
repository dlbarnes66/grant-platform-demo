"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function PromptTemplatesPage() {
  const [loading, setLoading] = useState(true);
  const [templates, setTemplates] = useState<any[]>([]);

  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [prompt, setPrompt] = useState("");

  const load = async () => {
    const res = await fetch("/api/ai/templates");
    const data = await res.json();
    setTemplates(data || []);
    setLoading(false);
  };

  const createTemplate = async () => {
    if (!name || !prompt) {
      alert("Please enter a name and prompt text.");
      return;
    }

    setCreating(true);

    const res = await fetch("/api/ai/templates/create", {
      method: "POST",
      body: JSON.stringify({ name, prompt }),
    });

    const data = await res.json();
    setCreating(false);

    if (data.error) {
      alert(data.error);
      return;
    }

    setName("");
    setPrompt("");
    load();
  };

  const deleteTemplate = async (id: string) => {
    if (!confirm("Delete this template?")) return;

    await fetch("/api/ai/templates/delete", {
      method: "POST",
      body: JSON.stringify({ id }),
    });

    load();
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-muted text-lg py-20">
        Loading templates…
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Prompt Templates</h1>
        <p className="text-muted mt-2">
          Save and reuse custom prompts for proposals, analysis, and workflows.
        </p>
      </div>

      {/* Existing Templates */}
      <div className="card">
        <h2 className="section-title">Saved Templates</h2>

        {templates.length === 0 ? (
          <p className="text-muted mt-2">No templates saved yet.</p>
        ) : (
          <div className="mt-6 space-y-4">
            {templates.map((t) => (
              <div
                key={t.id}
                className="border-b pb-4 flex items-start justify-between"
              >
                <div>
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-gray-700 mt-1 whitespace-pre-wrap">
                    {t.prompt}
                  </p>
                </div>

                <button
                  onClick={() => deleteTemplate(t.id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Template */}
      <div className="card">
        <h2 className="section-title">Create New Template</h2>

        <div className="mt-6 space-y-6">

          {/* Name */}
          <div>
            <label className="font-semibold text-gray-800">Template Name</label>
            <input
              type="text"
              className="input mt-2 w-full"
              placeholder="e.g., Standard Needs Statement"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Prompt */}
          <div>
            <label className="font-semibold text-gray-800">Prompt Text</label>
            <textarea
              className="input mt-2 w-full h-40"
              placeholder="Enter the prompt you want to reuse…"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          {/* Create Button */}
          <button
            onClick={createTemplate}
            disabled={creating}
            className="btn btn-primary"
          >
            {creating ? "Saving…" : "Save Template"}
          </button>
        </div>
      </div>

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
