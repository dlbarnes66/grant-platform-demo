"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function SavedSearchesPage() {
  const [saved, setSaved] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/saved-searches");
      const data = await res.json();
      setSaved(data);
      setLoading(false);
    }
    load();
  }, []);

  async function runSaved(id: string) {
    await fetch(`/api/saved-searches/${id}/run`, { method: "POST" });
    alert("Search started.");
  }

  async function removeSaved(id: string) {
    await fetch(`/api/saved-searches/${id}`, { method: "DELETE" });
    setSaved((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-brandBlue">Saved Searches</h1>

      {loading && (
        <Card className="text-center py-10">
          <p className="text-gray-600">Loading saved searches…</p>
        </Card>
      )}

      {!loading && saved.length === 0 && (
        <Card className="text-center py-10">
          <p className="text-gray-500">No saved searches yet.</p>
        </Card>
      )}

      <div className="space-y-3">
        {saved.map((s) => (
          <Card key={s.id} className="flex items-center justify-between">
            <div>
              <p className="text-gray-800 font-medium">{s.name}</p>
              <p className="text-gray-500 text-sm">{s.query}</p>
            </div>

            <div className="flex items-center gap-3">
              <Badge variant="info">{s.frequency || "Manual"}</Badge>
              <Button size="sm" variant="outline" onClick={() => runSaved(s.id)}>
                Run
              </Button>
              <Button size="sm" variant="danger" onClick={() => removeSaved(s.id)}>
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
