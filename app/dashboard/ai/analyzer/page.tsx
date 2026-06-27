"use client";

import { useState } from "react";
import Link from "next/link";

export default function GrantAnalyzerPage() {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");

  const analyze = async () => {
    if (!text && !file) {
      alert("Please upload a file or paste grant text.");
      return;
    }

    setLoading(true);
    setOutput("");

    let body: any;

    if (file) {
      const form = new FormData();
      form.append("file", file);
      body = form;
    } else {
      body = JSON.stringify({ text });
    }

    const res = await fetch("/api/ai/analyzer", {
      method: "POST",
      body,
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
        <h1 className="text-3xl font-bold text-gray-900">Grant Analyzer</h1>
        <p className="text-muted mt-2">
          Upload a grant document or paste text to receive AI-powered insights.
        </p>
      </div>

      {/* Input Card */}
      <div className="card">
        <h2 className="section-title">Grant Input</h2>

        <div className="mt-6 space-y-6">

          {/* File Upload */}
          <div>
            <label className="font-semibold text-gray-800">Upload Grant PDF</label>
            <input
              type="file"
              accept="application/pdf"
              className="input mt-2 w-full"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <p className="text-muted text-sm mt-1">
              Optional — you can upload a PDF or paste text below.
            </p>
          </div>

          {/* Text Area */}
          <div>
            <label className="font-semibold text-gray-800">Paste Grant Text</label>
            <textarea
              className="input mt-2 w-full h-40"
              placeholder="Paste the grant description, eligibility, or requirements..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          {/* Analyze Button */}
          <button
            onClick={analyze}
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? "Analyzing…" : "Analyze Grant"}
          </button>
        </div>
      </div>

      {/* Output Card */}
      {output && (
        <div className="card">
          <h2 className="section-title">AI Insights</h2>

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
