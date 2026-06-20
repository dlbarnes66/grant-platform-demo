"use client";

import { useEffect, useState } from "react";
import Card, { CardHeader, CardFooter } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import {
  LinkIcon,
  KeyIcon,
  ArrowPathIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

export default function WebhooksManagementPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);

  const [config, setConfig] = useState({
    url: "",
    secret: "",
    events: {
      grantFound: true,
      jobCompleted: true,
      applicationUpdated: true,
    },
  });

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/webhooks");
      const data = await res.json();
      setConfig(data);
      setLoading(false);
    }
    load();
  }, []);

  function toggleEvent(key: keyof typeof config.events) {
    setConfig((prev) => ({
      ...prev,
      events: { ...prev.events, [key]: !prev.events[key] },
    }));
  }

  async function save() {
    setSaving(true);
    await fetch("/api/webhooks", {
      method: "PUT",
      body: JSON.stringify(config),
    });
    setSaving(false);
    alert("Webhook settings updated!");
  }

  async function rotateSecret() {
    const res = await fetch("/api/webhooks/secret", { method: "POST" });
    const data = await res.json();
    setConfig((prev) => ({ ...prev, secret: data.secret }));
  }

  async function testWebhook() {
    setTesting(true);
    await fetch("/api/webhooks/test", { method: "POST" });
    setTesting(false);
    alert("Test webhook sent!");
  }

  if (loading) {
    return (
      <div className="p-6">
        <Card className="text-center py-10">
          <p className="text-gray-600">Loading webhook settings…</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 max-w-3xl">
      <h1 className="text-2xl font-bold text-brandBlue">Webhooks</h1>

      {/* Webhook URL */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <LinkIcon className="w-5 h-5 text-brandBlue" />
            Webhook URL
          </h2>
        </CardHeader>

        <div className="p-4 space-y-4">
          <Input
            label="Webhook URL"
            placeholder="https://yourapp.com/webhooks/grants"
            value={config.url}
            onChange={(e) => setConfig({ ...config, url: e.target.value })}
          />

          <p className="text-gray-500 text-sm">
            This URL will receive POST requests when events occur.
          </p>
        </div>
      </Card>

      {/* Secret Key */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <KeyIcon className="w-5 h-5 text-brandBlue" />
            Signing Secret
          </h2>
        </CardHeader>

        <div className="p-4 space-y-4">
          <code className="px-3 py-2 bg-gray-100 rounded text-gray-700 block">
            {config.secret || "No secret generated"}
          </code>

          <Button variant="outline" onClick={rotateSecret}>
            Rotate Secret
          </Button>

          <p className="text-gray-500 text-sm">
            Use this secret to verify webhook signatures.
          </p>
        </div>
      </Card>

      {/* Event Subscriptions */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800">
            Event Subscriptions
          </h2>
        </CardHeader>

        <div className="p-4 space-y-4">
          {[
            { key: "grantFound", label: "Grant Found" },
            { key: "jobCompleted", label: "Job Completed" },
            { key: "applicationUpdated", label: "Application Updated" },
          ].map((event) => (
            <label
              key={event.key}
              className="flex items-center justify-between cursor-pointer"
            >
              <span className="text-gray-700">{event.label}</span>
              <input
                type="checkbox"
                checked={config.events[event.key as keyof typeof config.events]}
                onChange={() =>
                  toggleEvent(event.key as keyof typeof config.events)
                }
                className="w-5 h-5 accent-brandBlue"
              />
            </label>
          ))}
        </div>
      </Card>

      {/* Actions */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800">
            Actions
          </h2>
        </CardHeader>

        <div className="p-4 space-y-4">
          <Button
            fullWidth
            variant="outline"
            loading={testing}
            onClick={testWebhook}
            className="flex items-center gap-2"
          >
            <PaperAirplaneIcon className="w-4 h-4" />
            Send Test Webhook
          </Button>

          <Button fullWidth loading={saving} onClick={save}>
            Save Webhook Settings
          </Button>
        </div>
      </Card>
    </div>
  );
}
