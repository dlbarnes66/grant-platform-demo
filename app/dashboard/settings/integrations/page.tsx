"use client";

import { useEffect, useState } from "react";
import Card, { CardHeader, CardFooter } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import {
  LinkIcon,
  BoltIcon,
  CloudIcon,
  ArrowPathIcon,
  BellAlertIcon,
} from "@heroicons/react/24/outline";

export default function IntegrationsPage() {
  const [loading, setLoading] = useState(true);
  const [integrations, setIntegrations] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);

  async function load() {
    const res = await fetch("/api/integrations");
    const data = await res.json();
    setIntegrations(data);
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

  async function connect(service: string) {
    const res = await fetch(`/api/integrations/${service}/connect`, {
      method: "POST",
    });
    const data = await res.json();
    window.location.href = data.url;
  }

  async function disconnect(service: string) {
    await fetch(`/api/integrations/${service}/disconnect`, {
      method: "POST",
    });
    await load();
  }

  const statusBadge = (connected: boolean) => (
    <Badge variant={connected ? "success" : "danger"}>
      {connected ? "Connected" : "Not Connected"}
    </Badge>
  );

  if (loading) {
    return (
      <div className="p-6">
        <Card className="text-center py-10">
          <p className="text-gray-600">Loading integrations…</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-brandBlue">Integrations</h1>

      <div className="flex justify-end">
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

      {/* Slack */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <BellAlertIcon className="w-5 h-5 text-brandBlue" />
            Slack
          </h2>
        </CardHeader>

        <div className="p-4 flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-800">Slack Notifications</p>
            <p className="text-gray-500 text-sm">
              Send grant alerts and job updates to your Slack workspace.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {statusBadge(integrations.slack.connected)}

            {integrations.slack.connected ? (
              <Button
                variant="danger"
                size="sm"
                onClick={() => disconnect("slack")}
              >
                Disconnect
              </Button>
            ) : (
              <Button size="sm" onClick={() => connect("slack")}>
                Connect
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Zapier */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <BoltIcon className="w-5 h-5 text-brandBlue" />
            Zapier
          </h2>
        </CardHeader>

        <div className="p-4 flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-800">Zapier Automation</p>
            <p className="text-gray-500 text-sm">
              Automate workflows with thousands of apps.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {statusBadge(integrations.zapier.connected)}

            {integrations.zapier.connected ? (
              <Button
                variant="danger"
                size="sm"
                onClick={() => disconnect("zapier")}
              >
                Disconnect
              </Button>
            ) : (
              <Button size="sm" onClick={() => connect("zapier")}>
                Connect
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Google Drive */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <CloudIcon className="w-5 h-5 text-brandBlue" />
            Google Drive
          </h2>
        </CardHeader>

        <div className="p-4 flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-800">Google Drive Sync</p>
            <p className="text-gray-500 text-sm">
              Save grant documents and application drafts to Drive.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {statusBadge(integrations.googleDrive.connected)}

            {integrations.googleDrive.connected ? (
              <Button
                variant="danger"
                size="sm"
                onClick={() => disconnect("googleDrive")}
              >
                Disconnect
              </Button>
            ) : (
              <Button size="sm" onClick={() => connect("googleDrive")}>
                Connect
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Webhooks */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <LinkIcon className="w-5 h-5 text-brandBlue" />
            Webhooks
          </h2>
        </CardHeader>

        <div className="p-4 space-y-4">
          <p className="text-gray-700">
            Receive real‑time updates when grants are found, jobs complete, or
            applications change status.
          </p>

          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-800">Webhook URL</p>

            <code className="px-3 py-1 bg-gray-100 rounded text-gray-700">
              {integrations.webhooks.url || "Not configured"}
            </code>
          </div>

          <CardFooter>
            <Button
              fullWidth
              variant="outline"
              onClick={() => connect("webhooks")}
            >
              Configure Webhooks
            </Button>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
}
