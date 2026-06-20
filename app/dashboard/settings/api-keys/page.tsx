"use client";

import { useEffect, useState } from "react";
import Card, { CardHeader, CardFooter } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { ClipboardIcon, TrashIcon, KeyIcon } from "@heroicons/react/24/outline";

export default function ApiKeysPage() {
  const [loading, setLoading] = useState(true);
  const [keys, setKeys] = useState<any[]>([]);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/api-keys");
      const data = await res.json();
      setKeys(data);
      setLoading(false);
    }
    load();
  }, []);

  async function createKey() {
    setCreating(true);
    const res = await fetch("/api/api-keys", { method: "POST" });
    const data = await res.json();
    setKeys((prev) => [...prev, data]);
    setCreating(false);
  }

  async function revokeKey(id: string) {
    await fetch(`/api/api-keys/${id}`, { method: "DELETE" });
    setKeys((prev) => prev.filter((k) => k.id !== id));
  }

  function copy(text: string) {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard");
  }

  if (loading) {
    return (
      <div className="p-6">
        <Card className="text-center py-10">
          <p className="text-gray-600">Loading API keys…</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <h1 className="text-2xl font-bold text-brandBlue">API Keys</h1>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800">
            Manage API Keys
          </h2>
        </CardHeader>

        <div className="space-y-6">
          {/* Existing Keys */}
          {keys.length === 0 && (
            <p className="text-gray-500">No API keys created yet.</p>
          )}

          {keys.map((key) => (
            <div
              key={key.id}
              className="flex items-center justify-between border p-4 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <KeyIcon className="w-6 h-6 text-brandBlue" />

                <div>
                  <p className="font-medium text-gray-800">
                    {key.name || "API Key"}
                  </p>
                  <p className="text-gray-500 text-sm">
                    •••• •••• •••• {key.last4}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => copy(key.fullKey)}
                  className="text-gray-600 hover:text-brandBlue transition"
                >
                  <ClipboardIcon className="w-5 h-5" />
                </button>

                <button
                  onClick={() => revokeKey(key.id)}
                  className="text-red-600 hover:text-red-700 transition"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <CardFooter className="mt-6">
          <Button fullWidth loading={creating} onClick={createKey}>
            Generate New API Key
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
