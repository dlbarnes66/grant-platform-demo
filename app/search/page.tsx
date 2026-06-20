"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState([]);

  async function fetchHistory() {
    const res = await fetch("/api/search-history", {
      credentials: "include",
    });

    if (res.ok) {
      const data = await res.json();
      setHistory(data.history || []);
    }
  }

  async function submitSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;

    console.log("Submitting search:", query);

    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: query }),
      credentials: "include",   // ⭐ REQUIRED FOR CLERK AUTH
    });

    if (res.ok) {
      setQuery("");
      fetchHistory();
    } else {
      console.error("Search failed:", await res.text());
    }
  }

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold text-center">AI Grant Search</h1>

      {/* Search Bar */}
      <form
        onSubmit={submitSearch}
        className="max-w-xl mx-auto flex gap-3"
      >
        <input
          type="text"
          placeholder="Search for grants, keywords, agencies..."
          className="flex-1 px-4 py-3 border rounded-lg shadow-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow"
        >
          Search
        </button>
      </form>

      {/* Search History */}
      <div className="max-w-xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Recent Searches</h2>

        {history.length === 0 && (
          <p className="text-gray-600">No recent searches.</p>
        )}

        <div className="space-y-3">
          {history.map((item) => (
            <Link
              key={item.id}
              href={`/jobs/${item.jobId}`}
              className="block p-4 border rounded-lg hover:bg-gray-50"
            >
              <div className="font-medium">{item.query}</div>
              <div className="text-sm text-gray-600">
                {new Date(item.createdAt).toLocaleString()}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
