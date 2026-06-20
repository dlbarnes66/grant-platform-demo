"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

export default function SearchHistoryPage() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/search-history");
      const data = await res.json();
      setHistory(data);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-brandBlue">Search History</h1>

      {loading && (
        <Card className="text-center py-10">
          <p className="text-gray-600">Loading search history…</p>
        </Card>
      )}

      {!loading && history.length === 0 && (
        <Card className="text-center py-10">
          <p className="text-gray-500">No searches yet.</p>
        </Card>
      )}

      <div className="space-y-3">
        {history.map((item) => (
          <Card key={item.id} className="flex items-center justify-between">
            <div>
              <p className="text-gray-800 font-medium">{item.query}</p>
              <p className="text-gray-500 text-sm">
                {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>
            <Badge variant="info">{item.resultCount} results</Badge>
          </Card>
        ))}
      </div>
    </div>
  );
}
