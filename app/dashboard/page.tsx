"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const [usage, setUsage] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const usageRes = await fetch("/api/billing/usage");
      const profileRes = await fetch("/api/profile");

      setUsage(await usageRes.json());
      setProfile(await profileRes.json());
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-yellow-500 text-white p-8 rounded-b-2xl shadow-lg">
        <h1 className="text-3xl font-bold">
          Welcome back{profile?.orgName ? `, ${profile.orgName}` : ""} 👋
        </h1>
        <p className="text-white/80 mt-2">
          Here’s what’s happening across your grant workspace today.
        </p>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-10">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Plan */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-lg font-semibold text-gray-800">Current Plan</h2>
            <p className="text-2xl font-bold mt-2 text-blue-700">
              {profile?.planName || "Starter"}
            </p>
            <p className="text-gray-500 mt-1">
              Renews on {profile?.renewalDate || "—"}
            </p>
            <Link
              href="/billing"
              className="mt-4 inline-block text-blue-600 font-medium hover:underline"
            >
              Manage Billing →
            </Link>
          </div>

          {/* AI Jobs */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-lg font-semibold text-gray-800">AI Jobs</h2>
            <p className="text-2xl font-bold mt-2 text-blue-700">
              {usage?.aiJobs.used ?? 0} / {usage?.aiJobs.limit ?? 0}
            </p>
            <div className="w-full bg-gray-200 h-2 rounded mt-3">
              <div
                className="bg-blue-600 h-2 rounded"
                style={{
                  width: `${
                    ((usage?.aiJobs.used ?? 0) / (usage?.aiJobs.limit ?? 1)) *
                    100
                  }%`,
                }}
              />
            </div>
          </div>

          {/* Storage */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-lg font-semibold text-gray-800">Storage</h2>
            <p className="text-2xl font-bold mt-2 text-blue-700">
              {usage?.storage.used ?? 0}GB / {usage?.storage.limit ?? 0}GB
            </p>
            <div className="w-full bg-gray-200 h-2 rounded mt-3">
              <div
                className="bg-yellow-500 h-2 rounded"
                style={{
                  width: `${
                    ((usage?.storage.used ?? 0) /
                      (usage?.storage.limit ?? 1)) *
                    100
                  }%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link
              href="/search"
              className="bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition"
            >
              <p className="font-semibold text-blue-700">🔍 Start Grant Search</p>
              <p className="text-gray-500 text-sm mt-1">
                Find grants that match your organization.
              </p>
            </Link>

            <Link
              href="/assistant"
              className="bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition"
            >
              <p className="font-semibold text-blue-700">🤖 AI Assistant</p>
              <p className="text-gray-500 text-sm mt-1">
                Draft proposals or analyze grant fit.
              </p>
            </Link>

            <Link
              href="/saved"
              className="bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition"
            >
              <p className="font-semibold text-blue-700">⭐ Saved Grants</p>
              <p className="text-gray-500 text-sm mt-1">
                View grants you’ve bookmarked.
              </p>
            </Link>

            <Link
              href="/billing"
              className="bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition"
            >
              <p className="font-semibold text-blue-700">💳 Billing</p>
              <p className="text-gray-500 text-sm mt-1">
                Manage your subscription and invoices.
              </p>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <p className="text-gray-500">No recent activity yet.</p>
            <p className="text-gray-400 text-sm mt-1">
              (This will populate automatically as you use the platform.)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
