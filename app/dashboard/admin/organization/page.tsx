"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrganizationSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [org, setOrg] = useState({
    name: "",
    domain: "",
    address: "",
    website: "",
  });

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/admin/organization");
      const data = await res.json();
      setOrg(data);
      setLoading(false);
    };

    load();
  }, []);

  const save = async () => {
    setSaving(true);

    const res = await fetch("/api/admin/organization/update", {
      method: "POST",
      body: JSON.stringify(org),
    });

    const data = await res.json();
    setSaving(false);

    if (data.error) {
      alert(data.error);
      return;
    }

    alert("Organization settings updated!");
  };

  if (loading) {
    return (
      <div className="text-center text-muted text-lg py-20">
        Loading organization settings…
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Organization Settings</h1>
        <p className="text-muted mt-2">
          Manage your organization’s profile and administrative details.
        </p>
      </div>

      {/* Organization Card */}
      <div className="card">
        <h2 className="section-title">Organization Profile</h2>

        <div className="mt-6 space-y-6">

          {/* Name */}
          <div>
            <label className="font-semibold text-gray-800">Organization Name</label>
            <input
              type="text"
              className="input mt-2 w-full"
              value={org.name}
              onChange={(e) => setOrg({ ...org, name: e.target.value })}
            />
          </div>

          {/* Domain */}
          <div>
            <label className="font-semibold text-gray-800">Primary Domain</label>
            <input
              type="text"
              className="input mt-2 w-full"
              value={org.domain}
              onChange={(e) => setOrg({ ...org, domain: e.target.value })}
            />
            <p className="text-muted text-sm mt-1">
              Used for email‑based auto‑verification and domain restrictions.
            </p>
          </div>

          {/* Address */}
          <div>
            <label className="font-semibold text-gray-800">Address</label>
            <input
              type="text"
              className="input mt-2 w-full"
              value={org.address}
              onChange={(e) => setOrg({ ...org, address: e.target.value })}
            />
          </div>

          {/* Website */}
          <div>
            <label className="font-semibold text-gray-800">Website</label>
            <input
              type="text"
              className="input mt-2 w-full"
              value={org.website}
              onChange={(e) => setOrg({ ...org, website: e.target.value })}
            />
          </div>

          {/* Save Button */}
          <button
            onClick={save}
            disabled={saving}
            className="btn btn-primary mt-6"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 flex gap-4">
        <Link href="/dashboard/admin/team" className="btn btn-secondary">
          Manage Team
        </Link>

        <Link href="/dashboard/admin" className="btn btn-success">
          Admin Home
        </Link>
      </div>
    </div>
  );
}
