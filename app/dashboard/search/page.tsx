"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import GrantCard from "@/components/GrantCard";
import Card from "@/components/ui/Card";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function runSearch() {
    setLoading(true);
    const res = await fetch("/api/search", {
      method: "POST",
      body: JSON.stringify({ query }),
    });
    const data = await res.json();
    setResults(data.results || []);
    setLoading(false);
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-brandBlue">Search Grants</h1>

      <div className="flex gap-3">
        <Input
          placeholder="Search for grants…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={runSearch} loading={loading}>
          Search
        </Button>
      </div>

      {loading && (
        <Card className="text-center py-10">
          <p className="text-gray-600">Searching…</p>
        </Card>
      )}

      {!loading && results.length === 0 && (
        <Card className="text-center py-10">
          <p className="text-gray-500">No results yet. Try searching above.</p>
        </Card>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((grant) => (
          <GrantCard
            key={grant.id}
            id={grant.id}
            title={grant.title}
            summary={grant.summary}
            amount={grant.amount}
            deadline={grant.deadline}
            category={grant.category}
            onSave={() => console.log("save", grant.id)}
            onCompare={() => console.log("compare", grant.id)}
          />
        ))}
      </div>
    </div>
  );
}
