"use client";

import { useState } from "react";
import Link from "next/link";

export default function GrantSearchPage() {
  const [query, setQuery] = useState("");
  const [state, setState] = useState("");
  const [category, setCategory] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    setLoading(true);

    const res = await fetch("/api/grants/search", {
      method: "POST",
      body: JSON.stringify({ query, state, category }),
    });

    const data = await res.json();
    setResults(data.results);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">
        Grant Search Engine
      </h1>

      {/* Search Bar */}
      <div className="bg-white p-6 rounded-xl shadow-sm border mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search grants (e.g. youth programs)"
            className="border p-3 rounded-lg"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <select
            className="border p-3 rounded-lg"
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            <option value="">All States</option>
            <option value="AL">Alabama</option>
            <option value="GA">Georgia</option>
            <option value="FL">Florida</option>
            <option value="MS">Mississippi</option>
          </select>

          <select
            className="border p-3 rounded-lg"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="education">Education</option>
            <option value="health">Health</option>
            <option value="community">Community</option>
            <option value="technology">Technology</option>
          </select>
        </div>

        <button
          onClick={handleSearch}
          className="mt-4 bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition"
        >
          {loading ? "Searching..." : "Search Grants"}
        </button>
      </div>

      {/* Results */}
      <div>
        {results.length === 0 && !loading && (
          <p className="text-gray-500">No results yet. Try searching above.</p>
        )}

        <div className="grid grid-cols-1 gap-4">
          {results.map((grant) => (
            <div
              key={grant.id}
              className="bg-white p-6 rounded-xl shadow-sm border"
            >
              <h2 className="text-xl font-bold text-blue-900">
                {grant.title}
              </h2>
              <p className="text-gray-600 mt-1">{grant.funder}</p>
              <p className="text-gray-500 mt-2">
                Amount: <span className="font-semibold">${grant.amount}</span>
              </p>
              <p className="text-gray-500">
                Deadline: <span className="font-semibold">{grant.deadline}</span>
              </p>

              <div className="mt-4 flex gap-4">
                <Link
                  href={`/grants/${grant.id}`}
                  className="text-blue-700 font-medium hover:underline"
                >
                  View Details →
                </Link>

                <button className="text-yellow-600 font-medium hover:underline">
                  ⭐ Save
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
