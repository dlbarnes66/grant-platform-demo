"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProfileSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    title: "",
    organization: "",
  });

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/settings/profile");
      const data = await res.json();
      setProfile(data);
      setLoading(false);
    };

    load();
  }, []);

  const update = async () => {
    setSaving(true);

    const res = await fetch("/api/settings/profile/update", {
      method: "POST",
      body: JSON.stringify(profile),
    });

    const data = await res.json();
    setSaving(false);

    if (data.error) {
      alert(data.error);
      return;
    }

    alert("Profile updated successfully!");
  };

  if (loading) {
    return (
      <div className="text-center text-muted text-lg py-20">
        Loading profile…
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <p className="text-muted mt-2">
          Manage your personal information and account details.
        </p>
      </div>

      {/* Profile Card */}
      <div className="card">
        <h2 className="section-title">Your Information</h2>

        <div className="mt-6 space-y-6">

          {/* Name */}
          <div>
            <label className="font-semibold text-gray-800">Full Name</label>
            <input
              type="text"
              className="input mt-2 w-full"
              value={profile.name}
              onChange={(e) =>
                setProfile({ ...profile, name: e.target.value })
              }
            />
          </div>

          {/* Email */}
          <div>
            <label className="font-semibold text-gray-800">Email</label>
            <input
              type="email"
              className="input mt-2 w-full"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
            />
            <p className="text-muted text-sm mt-1">
              Your login email. Changing this may require verification.
            </p>
          </div>

          {/* Title */}
          <div>
            <label className="font-semibold text-gray-800">Job Title</label>
            <input
              type="text"
              className="input mt-2 w-full"
              value={profile.title}
              onChange={(e) =>
                setProfile({ ...profile, title: e.target.value })
              }
            />
          </div>

          {/* Organization */}
          <div>
            <label className="font-semibold text-gray-800">Organization</label>
            <input
              type="text"
              className="input mt-2 w-full"
              value={profile.organization}
              onChange={(e) =>
                setProfile({ ...profile, organization: e.target.value })
              }
            />
          </div>

          {/* Save Button */}
          <button
            onClick={update}
            disabled={saving}
            className="btn btn-primary mt-6"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 flex gap-4">
        <Link href="/dashboard/settings/security" className="btn btn-secondary">
          Security Settings
        </Link>

        <Link href="/dashboard" className="btn btn-success">
          Dashboard Home
        </Link>
      </div>
    </div>
  );
}
