"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function GrantDetailPage() {
  const { id } = useParams();
  const [grant, setGrant] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/grants/search", {
        method: "POST",
        body: JSON.stringify({ query: "" }),
      });

      const data = await res.json();
      const found = data.results.find((g: any) => g.id === id);
      setGrant(found);
    }

    load();
  }, [id]);

  if (!grant) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading grant details…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Link
        href="/search"
        className="text-blue-700 font-medium hover:underline"
      >
        ← Back to Search
      </Link>

      <div className="max-w-4xl mx-auto mt-6 bg-white p-8 rounded-xl shadow-sm border">
        {/* Title */}
        <h1 className="text-3xl font-bold text-blue-900">{grant.title}</h1>
        <p className="text-gray-600 mt-2">{grant.funder}</p>

        {/* Key Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-gray-50 p-4 rounded-lg border">
            <p className="text-gray-500 text-sm">Amount</p>
            <p className="text-xl font-semibold text-blue-700">
              {grant.amount}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border">
            <p className="text-gray-500 text-sm">Deadline</p>
            <p className="text-xl font-semibold text-blue-700">
              {grant.deadline}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border">
            <p className="text-gray-500 text-sm">Category</p>
            <p className="text-xl font-semibold text-blue-700">
              {grant.category}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800">Summary</h2>
          <p className="text-gray-600 mt-2">
            This is a placeholder summary for the grant. In the real version,
            this will come from the grant database or external API. For now,
            this gives users a sense of what the grant is about.
          </p>
        </div>

        {/* Eligibility */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800">Eligibility</h2>
          <ul className="text-gray-600 mt-2 list-disc ml-6">
            <li>Nonprofit organizations</li>
            <li>501(c)(3) status recommended</li>
            <li>Must operate in the United States</li>
            <li>Category-specific requirements apply</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="mt-10 flex gap-4">
          <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition">
            ⭐ Save Grant
          </button>

          <button
            onClick={() => {
              const encoded = encodeURIComponent(JSON.stringify(grant));
              window.location.href = `/assistant?context=${encoded}`;
            }}
            className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition"
          >
            🤖 Analyze with AI
          </button>

          <a
            href="https://www.grants.gov"
            target="_blank"
            className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-black transition"
          >
            Apply Now →
          </a>
        </div>
      </div>
    </div>
  );
}
