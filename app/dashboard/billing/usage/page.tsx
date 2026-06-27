"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BillingUsagePage() {
  const [loading, setLoading] = useState(true);
  const [usage, setUsage] = useState<any>(null);

  const load = async () => {
    const res = await fetch("/api/billing/usage");
    const data = await res.json();
    setUsage(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-muted text-lg py-20">
        Loading usage data…
      </div>
    );
  }

  const percent = (used: number, limit: number) =>
    Math.min(100, Math.round((used / limit) * 100));

  return (
    <div className="space-y-10">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Usage</h1>
          <p className="text-muted mt-2">
            Track your AI usage, automations, and team seats.
          </p>
        </div>

        <Link href="/dashboard/billing" className="btn btn-secondary">
          Back to Billing
        </Link>
      </div>

      {/* AI Tokens */}
      <div className="card">
        <h2 className="section-title">AI Token Usage</h2>

        <div className="mt-6">
          <p className="font-semibold text-gray-900">
            {usage.tokens.used} / {usage.tokens.limit} tokens
          </p>

          <div className="w-full bg-gray-200 h-3 rounded mt-3">
            <div
              className="bg-blue-600 h-3 rounded"
              style={{ width: `${percent(usage.tokens.used, usage.tokens.limit)}%` }}
            />
          </div>

          <p className="text-muted text-sm mt-2">
            Resets on {usage.tokens.resetsOn}
          </p>
        </div>
      </div>

      {/* Automations */}
      <div className="card">
        <h2 className="section-title">Automation Runs</h2>

        <div className="mt-6">
          <p className="font-semibold text-gray-900">
            {usage.automations.used} / {usage.automations.limit} runs
          </p>

          <div className="w-full bg-gray-200 h-3 rounded mt-3">
            <div
              className="bg-purple-600 h-3 rounded"
              style={{
                width: `${percent(
                  usage.automations.used,
                  usage.automations.limit
                )}%`,
              }}
            />
          </div>

          <p className="text-muted text-sm mt-2">
            Resets on {usage.automations.resetsOn}
          </p>
        </div>
      </div>

      {/* Seats */}
      <div className="card">
        <h2 className="section-title">Team Seats</h2>

        <div className="mt-6">
          <p className="font-semibold text-gray-900">
            {usage.seats.used} / {usage.seats.limit} seats
          </p>

          <div className="w-full bg-gray-200 h-3 rounded mt-3">
            <div
              className="bg-green-600 h-3 rounded"
              style={{
                width: `${percent(usage.seats.used, usage.seats.limit)}%`,
              }}
            />
          </div>

          <p className="text-muted text-sm mt-2">
            Manage seats in your team settings.
          </p>
        </div>
      </div>

      {/* Overages */}
      {usage.overages && usage.overages.length > 0 && (
        <div className="card">
          <h2 className="section-title">Overages</h2>

          <div className="mt-6 space-y-4">
            {usage.overages.map((o: any) => (
              <div
                key={o.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div>
                  <p className="font-semibold text-gray-900">{o.type}</p>
                  <p className="text-muted text-sm mt-1">{o.date}</p>
                </div>

                <p className="font-semibold text-red-600">${o.amount}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-12 flex gap-4">
        <Link href="/dashboard/billing" className="btn btn-secondary">
          Back to Billing
        </Link>

        <Link href="/dashboard" className="btn btn-success">
          Dashboard Home
        </Link>
      </div>
    </div>
  );
}
