"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import GrantCard from "@/components/GrantCard";
import Button from "@/components/ui/Button";

export default function RecommendationsPage() {
  const [grants, setGrants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/recommendations");
      const data = await res.json();
      setGrants(data);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-brandBlue">Recommended Grants</h1>

      {loading && (
        <Card className="text-center py-10">
          <p className="text-gray-600">Loading recommendations…</p>
        </Card>
      )}

      {!loading && grants.length === 0 && (
        <Card className="text-center py-10">
          <p className="text-gray-500">
            No recommendations yet. Run searches and save grants to improve
            recommendations.
          </p>
        </Card>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {grants.map((g) => (
          <GrantCard
            key={g.id}
            id={g.id}
            title={g.title}
            summary={g.summary}
            amount={g.amount}
            deadline={g.deadline}
            category={g.category}
            onSave={() => console.log("save", g.id)}
            onCompare={() => console.log("compare", g.id)}
          />
        ))}
      </div>

      {!loading && grants.length > 0 && (
        <Button variant="outline">Refresh Recommendations</Button>
      )}
    </div>
  );
}
