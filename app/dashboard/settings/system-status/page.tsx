"use client";

import { useEffect, useState } from "react";
import Card, { CardHeader } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import {
  ServerIcon,
  ClockIcon,
  BoltIcon,
  QueueListIcon,
  ArrowPathIcon,
  CircleStackIcon, // ✅ Replaces DatabaseIcon
} from "@heroicons/react/24/outline";

export default function SystemStatusPage() {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);

  async function load() {
    try {
      const res = await fetch("/api/system-status");
      const data = await res.json();
      setStatus(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function refresh() {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }

  if (loading) {
    return (
      <div className="p-6">
        <Card className="text-center py-10">
          <p className="text-gray-600">Loading system status…</p>
        </Card>
      </div>
    );
  }

  const healthBadge = (ok: boolean) => (
    <Badge variant={ok ? "success" : "danger"}>
      {ok ? "Healthy" : "Issue"}
    </Badge>
  );

  return (
    <div className="p-6 space-y-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-brandBlue">System Status</h1>

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

      {/* Worker Status */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <BoltIcon className="w-5 h-5 text-brandBlue" />
            Worker Status
          </h2>
        </CardHeader>

        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-800">Worker Health</p>
            {healthBadge(status.worker.healthy)}
          </div>

          <div className="flex items-center justify-between">
            <p className="text-gray-700">Last Heartbeat</p>
            <p className="text-gray-600">
              {new Date(status.worker.lastHeartbeat).toLocaleString()}
            </p>
          </div>
        </div>
      </Card>

      {/* Queue Status */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <QueueListIcon className="w-5 h-5 text-brandBlue" />
            Queue Status
          </h2>
        </CardHeader>

        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-800">Pending Jobs</p>
            <Badge variant="info">{status.queue.pending}</Badge>
          </div>

          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-800">Active Jobs</p>
            <Badge variant="warning">{status.queue.active}</Badge>
          </div>
        </div>
      </Card>

      {/* API Status */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <ServerIcon className="w-5 h-5 text-brandBlue" />
            API Status
          </h2>
        </CardHeader>

        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-800">API Health</p>
            {healthBadge(status.api.healthy)}
          </div>

          <div className="flex items-center justify-between">
            <p className="text-gray-700">Latency</p>
            <p className="text-gray-600">{status.api.latency} ms</p>
          </div>
        </div>
      </Card>

      {/* Database Status */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <CircleStackIcon className="w-5 h-5 text-brandBlue" /> {/* ✅ FIXED */}
            Database Status
          </h2>
        </CardHeader>

        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-800">DB Health</p>
            {healthBadge(status.db.healthy)}
          </div>

          <div className="flex items-center justify-between">
            <p className="text-gray-700">Connections</p>
            <p className="text-gray-600">{status.db.connections}</p>
          </div>
        </div>
      </Card>

      {/* Uptime */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <ClockIcon className="w-5 h-5 text-brandBlue" />
            Uptime
          </h2>
        </CardHeader>

        <div className="p-4">
          <p className="text-gray-700">
            {status.uptime.hours} hours, {status.uptime.minutes} minutes
          </p>
        </div>
      </Card>
    </div>
  );
}
