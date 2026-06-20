"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateJobPage() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitJob() {
    if (!text.trim()) return;

    setLoading(true);

    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!res.ok) {
      console.error("Failed to create job:", await res.text());
      setLoading(false);
      return;
    }

    const data = await res.json();
    router.push(`/jobs/${data.job.id}`);
  }

  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">Create a New Job</h1>

      <textarea
        className="w-full border rounded p-3 h-40"
        placeholder="Paste your grant text or prompt here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={submitJob}
        disabled={loading}
        className="px-6 py-3 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {loading ? "Submitting…" : "Submit Job"}
      </button>

      <div>
        <a href="/jobs" className="text-blue-600 underline">
          View All Jobs
        </a>
      </div>
    </div>
  );
}
