"use client";

import { useState, useRef } from "react";

export default function IndexPage() {
  const [url, setUrl] = useState("");
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const resultRef = useRef(null);

  const scrollToResult = () => {
    resultRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrape = async () => {
    if (!url.trim()) return;

    setLoading(true);
    setError("");
    setPage(null);

    try {
      const res = await fetch("/api/index", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) {
        setError("Failed to scrape the page. Try another URL.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setPage(data);
      setLoading(false);

      setTimeout(scrollToResult, 200);
    } catch (err) {
      setError("Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Index Grant Page</h1>

      {/* Input Box */}
      <div className="bg-white shadow p-4 rounded space-y-3">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter a grant URL to scrape..."
          className="w-full border p-3 rounded"
        />

        <button
          onClick={handleScrape}
          disabled={loading}
          className={`px-4 py-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Scraping..." : "Scrape URL"}
        </button>

        {error && <p className="text-red-600 text-sm">{error}</p>}
      </div>

      <div ref={resultRef} />

      {/* Loading */}
      {loading && (
        <p className="text-gray-600 text-sm">Extracting content…</p>
      )}

      {/* Result */}
      {page && (
        <div className="bg-white shadow p-6 rounded space-y-4 border">
          <h2 className="text-xl font-semibold">{page.title}</h2>

          <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
            {page.content}
          </div>

          <a
            href={url}
            target="_blank"
            className="text-blue-600 underline mt-3 inline-block"
          >
            Open Original Page →
          </a>
        </div>
      )}
    </div>
  );
}
