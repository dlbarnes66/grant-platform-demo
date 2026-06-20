"use client";

import { useEffect, useState } from "react";
import Card, { CardHeader } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import {
  ArrowPathIcon,
  SparklesIcon,
  WrenchScrewdriverIcon,
  BugAntIcon,
} from "@heroicons/react/24/outline";

export default function ChangelogPage() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [entries, setEntries] = useState<any[]>([]);

  async function load() {
    const res = await fetch("/api/changelog");
    const data = await res.json();
    setEntries(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function refresh() {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }

  const tagBadge = (tag: string) => {
    switch (tag) {
      case "new":
        return (
          <Badge variant="success" className="flex items-center gap-1">
            <SparklesIcon className="w-4 h-4" /> New
          </Badge>
        );
      case "improved":
        return (
          <Badge variant="warning" className="flex items-center gap-1">
            <WrenchScrewdriverIcon className="w-4 h-4" /> Improved
          </Badge>
        );
      case "fixed":
        return (
          <Badge variant="danger" className="flex items-center gap-1">
            <BugAntIcon className="w-4 h-4" /> Fixed
          </Badge>
        );
      default:
        return <Badge variant="info">{tag}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <Card className="py-10 text-center">
          <p className="text-gray-600">Loading changelog…</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-10 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brandBlue">Changelog</h1>

        <Button
          variant="outline"
          loading={refreshing}
          onClick={refresh}
          className="flex items-center gap-2"
        >
          <ArrowPathIcon className="w-4 h-4" />
          Refresh
        </Button>
      </div>

      {entries.length === 0 && (
        <Card className="py-10 text-center">
          <p className="text-gray-500">No changelog entries yet.</p>
        </Card>
      )}

      {entries.map((entry) => (
        <Card key={entry.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">
                Version {entry.version}
              </h2>

              <p className="text-gray-500 text-sm">
                {new Date(entry.date).toLocaleDateString()}
              </p>
            </div>
          </CardHeader>

          <div className="p-4 space-y-4">
            {entry.items.map((item: any, idx: number) => (
              <div key={idx} className="flex items-start gap-3">
                {tagBadge(item.type)}

                <p className="text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
