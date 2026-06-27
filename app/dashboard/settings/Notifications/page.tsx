"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function NotificationSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [prefs, setPrefs] = useState({
    emailGrantMatches: true,
    emailAutomations: true,
    emailSystem: true,

    inappGrantMatches: true,
    inappAutomations: true,
    inappAIJobs: true,
    inappSystem: true,
  });

  const load = async () => {
    const res = await fetch("/api/settings/notifications");
    const data = await res.json();
    setPrefs(data);
    setLoading(false);
  };

  const save = async () => {
    setSaving(true);

    const res = await fetch("/api/settings/notifications/update", {
      method: "POST",
      body: JSON.stringify(prefs),
    });

    const data = await res.json();
    setSaving(false);

    if (data.error) {
      alert(data.error);
      return;
    }

    alert("Notification preferences updated!");
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-muted text-lg py-20">
        Loading notification settings…
      </div>
    );
  }

  const toggle = (key: string) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Notification Settings</h1>
        <p className="text-muted mt-2">
          Control how you receive alerts about grants, automations, and system activity.
        </p>
      </div>

      {/* Email Notifications */}
      <div className="card">
        <h2 className="section-title">Email Notifications</h2>

        <div className="mt-6 space-y-4">

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={prefs.emailGrantMatches}
              onChange={() => toggle("emailGrantMatches")}
              className="w-5 h-5"
            />
            <span className="text-gray-800">Grant Match Alerts</span>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={prefs.emailAutomations}
              onChange={() => toggle("emailAutomations")}
              className="w-5 h-5"
            />
            <span className="text-gray-800">Automation Run Alerts</span>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={prefs.emailSystem}
              onChange={() => toggle("emailSystem")}
              className="w-5 h-5"
            />
            <span className="text-gray-800">System Updates</span>
          </label>
        </div>
      </div>

      {/* In-App Notifications */}
      <div className="card">
        <h2 className="section-title">In‑App Notifications</h2>

        <div className="mt-6 space-y-4">

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={prefs.inappGrantMatches}
              onChange={() => toggle("inappGrantMatches")}
              className="w-5 h-5"
            />
            <span className="text-gray-800">Grant Match Alerts</span>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={prefs.inappAutomations}
              onChange={() => toggle("inappAutomations")}
              className="w-5 h-5"
            />
            <span className="text-gray-800">Automation Run Alerts</span>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={prefs.inappAIJobs}
              onChange={() => toggle("inappAIJobs")}
              className="w-5 h-5"
            />
            <span className="text-gray-800">AI Job Completion Alerts</span>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={prefs.inappSystem}
              onChange={() => toggle("inappSystem")}
              className="w-5 h-5"
            />
            <span className="text-gray-800">System Messages</span>
          </label>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={save}
        disabled={saving}
        className="btn btn-primary"
      >
        {saving ? "Saving…" : "Save Preferences"}
      </button>

      {/* Footer */}
      <div className="mt-12 flex gap-4">
        <Link href="/dashboard/notifications" className="btn btn-secondary">
          Back to Notifications
        </Link>

        <Link href="/dashboard" className="btn btn-success">
          Dashboard Home
        </Link>
      </div>
    </div>
  );
}
