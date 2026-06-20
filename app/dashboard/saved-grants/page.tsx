"use client";

import { useEffect, useState } from "react";
import GrantCard from "@/components/GrantCard";
import Card from "@/components/ui/Card";

export default function SavedGrantsPage() {
  const [saved, setSaved] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/saved-grants");
      const data = await res.json();
      setSaved(data);
      setLoading(false);
    }
    load();
  }, []);

  async function removeSaved(id: string) {
    await fetch(`/api/saved-grants/${id}`, { method: "DELETE" });
    setSaved((prev) => prev.filter((g) => g.id !== id));
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-brandBlue">Saved Grants</h1>

      {loading && (
        <Card className="text-center py-10">
          <p className="text-gray-600">Loading saved grants…</p>
        </Card>
      )}

      {!loading && saved.length === 0 && (
        <Card className="text-center py-10">
          <h2 className="text-lg font-semibold text-gray-700">
            You have no saved grants yet
          </h2>
          <p className="text-gray-500 mt-2">
            Save grants from the search results to view them here.
          </p>
        </Card>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {saved.map((item) => (
          <GrantCard
            key={item.id}
            id={item.grantId}
            title={item.grant.title}
            summary={item.grant.summary}
            amount={item.grant.amount}
            deadline={item.grant.deadline}
            category={item.grant.category}
            onSave={() => removeSaved(item.id)}
            saved={true}
          />
        ))}
      </div>
    </div>
  );
}
