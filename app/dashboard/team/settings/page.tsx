"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function TeamSettingsPage() {
  const [team, setTeam] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [teamName, setTeamName] = useState("");
  const [billingEmail, setBillingEmail] = useState("");

  useEffect(() => {
    const loadTeam = async () => {
      const res = await fetch("/api/team/settings");
      const data = await res.json();

      setTeam(data);
      setTeamName(data.name || "");
      setBillingEmail(data.billingEmail || "");
      setLoading(false);
    };

    loadTeam();
  }, []);

  const saveSettings = async () => {
    setSaving(true);

    await fetch("/api/team/settings", {
      method: "POST",
      body: JSON.stringify({
        name: teamName,
        billingEmail,
      }),
    });

    setSaving(false);
    alert("Team settings updated!");
  };

  if (loading) {
    return (
      <div className="text-center text-muted text-lg py-20">
        Loading team settings…
      </div>
    );
  }

  if (!team) {
    return (
      <div className="text-center text-red-600 text-lg py-20">
        Team settings not found.
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Team Settings</h1>
        <p className="text-muted mt-2">
          Manage your organization’s name, billing email, and configuration.
        </p>
      </div>

      {/* Team Settings */}
      <div className="card">
        <h2 className="section-title">Organization Details</h2>

        <div className="mt-6 space-y-6">

          {/* Team Name */}
          <div>
            <label className="font-semibold text-gray-800">Team Name</label>
            <input
              type="text"
              className="input mt-2 w-full"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
          </div>

          {/* Billing Email */}
          <div>
            <label className="font-semibold text-gray-800">Billing Email</label>
            <input
              type="email"
              className="input mt-2 w-full"
              value={billingEmail}
              onChange={(e) => setBillingEmail(e.target.value)}
            />
            <p className="text-muted text-sm mt-1">
              Invoices and payment notifications will be sent here.
            </p>
          </div>

          {/* Save Button */}
          <button
            onClick={saveSettings}
            disabled={saving}
            className="btn btn-primary mt-4"
          >
            {saving ? "Saving…" : "Save Settings"}
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="card border-red-300">
        <h2 className="section-title text-red-600">Danger Zone</h2>

        <p className="text-muted mt-2">
          Deleting your organization will permanently remove all team members,
          saved grants, searches, and settings.
        </p>

        <button
          onClick={() => {
            if (confirm("Are you sure you want to delete your organization?")) {
              fetch("/api/team/delete", { method: "POST" });
              window.location.href = "/";
            }
          }}
          className="btn btn-danger mt-6"
        >
          Delete Organization
        </button>
      </div>

      {/* Footer */}
      <div className="mt-12 flex gap-4">
        <Link href="/dashboard/team" className="btn btn-secondary">
          Back to Team
        </Link>

        <Link href="/dashboard" className="btn btn-success">
          Dashboard Home
        </Link>
      </div>
    </div>
  );
}
