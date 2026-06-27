"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AIToolsHubPage() {
  const [loading, setLoading] = useState(true);
  const [usage, setUsage] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/ai/usage");
      const data = await res.json();
      setUsage(data);
      setLoading(false);
    };

    load();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-muted text-lg py-20">
        Loading AI tools…
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI Tools</h1>
        <p className="text-muted mt-2">
          Generate proposals, analyze grants, and automate workflows using AI.
        </p>
      </div>

      {/* Usage Summary */}
      <div className="card">
        <h2 className="section-title">AI Usage Summary</h2>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-700 font-semibold">AI Requests</p>
            <p className="text-3xl font-bold mt-2">{usage.requests}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-700 font-semibold">Tokens Used</p>
            <p className="text-3xl font-bold mt-2">{usage.tokens}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-700 font-semibold">Automations</p>
            <p className="text-3xl font-bold mt-2">{usage.automations}</p>
          </div>
        </div>
      </div>

      {/* AI Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* Proposal Writer */}
        <Link href="/dashboard/ai/proposal" className="card hover:shadow-lg transition">
          <h2 className="text-xl font-bold text-gray-900">AI Proposal Writer</h2>
          <p className="text-muted mt-2">
            Generate full grant proposals using your saved data.
          </p>
        </Link>

        {/* Grant Analyzer */}
        <Link href="/dashboard/ai/analyzer" className="card hover:shadow-lg transition">
          <h2 className="text-xl font-bold text-gray-900">Grant Analyzer</h2>
          <p className="text-muted mt-2">
            Upload or paste grant text and get instant AI insights.
          </p>
        </Link>

        {/* Automation Builder */}
        <Link href="/dashboard/ai/automations" className="card hover:shadow-lg transition">
          <h2 className="text-xl font-bold text-gray-900">Automation Builder</h2>
          <p className="text-muted mt-2">
            Create automated workflows for searching, matching, and writing.
          </p>
        </Link>

        {/* Prompt Templates */}
        <Link href="/dashboard/ai/templates" className="card hover:shadow-lg transition">
          <h2 className="text-xl font-bold text-gray-900">Prompt Templates</h2>
          <p className="text-muted mt-2">
            Save and reuse custom AI prompts for your workflows.
          </p>
        </Link>

        {/* AI Job History */}
        <Link href="/dashboard/ai/history" className="card hover:shadow-lg transition">
          <h2 className="text-xl font-bold text-gray-900">AI Job History</h2>
          <p className="text-muted mt-2">
            View all AI tasks, outputs, and logs.
          </p>
        </Link>

        {/* Usage Logs */}
        <Link href="/dashboard/ai/usage" className="card hover:shadow-lg transition">
          <h2 className="text-xl font-bold text-gray-900">Usage Logs</h2>
          <p className="text-muted mt-2">
            Track token usage and request history.
          </p>
        </Link>
      </div>

      {/* Footer */}
      <div className="mt-12 flex gap-4">
        <Link href="/dashboard" className="btn btn-success">
          Dashboard Home
        </Link>
      </div>
    </div>
  );
}
