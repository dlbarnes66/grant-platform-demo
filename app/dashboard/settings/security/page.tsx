"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function SecuritySettingsPage() {
  const [loading, setLoading] = useState(true);
  const [savingPassword, setSavingPassword] = useState(false);
  const [saving2FA, setSaving2FA] = useState(false);

  const [security, setSecurity] = useState({
    twoFactorEnabled: false,
  });

  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/settings/security");
      const data = await res.json();
      setSecurity(data);
      setLoading(false);
    };

    load();
  }, []);

  const updatePassword = async () => {
    if (!passwords.current || !passwords.newPass || !passwords.confirm) {
      alert("Please fill out all password fields.");
      return;
    }

    if (passwords.newPass !== passwords.confirm) {
      alert("New passwords do not match.");
      return;
    }

    setSavingPassword(true);

    const res = await fetch("/api/settings/security/password", {
      method: "POST",
      body: JSON.stringify(passwords),
    });

    const data = await res.json();
    setSavingPassword(false);

    if (data.error) {
      alert(data.error);
      return;
    }

    alert("Password updated successfully!");
    setPasswords({ current: "", newPass: "", confirm: "" });
  };

  const toggle2FA = async () => {
    setSaving2FA(true);

    const res = await fetch("/api/settings/security/2fa", {
      method: "POST",
      body: JSON.stringify({
        enable: !security.twoFactorEnabled,
      }),
    });

    const data = await res.json();
    setSaving2FA(false);

    if (data.error) {
      alert(data.error);
      return;
    }

    setSecurity({ twoFactorEnabled: !security.twoFactorEnabled });
    alert("Two‑factor authentication updated!");
  };

  if (loading) {
    return (
      <div className="text-center text-muted text-lg py-20">
        Loading security settings…
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Security</h1>
        <p className="text-muted mt-2">
          Manage your password, two‑factor authentication, and account protection.
        </p>
      </div>

      {/* Password Card */}
      <div className="card">
        <h2 className="section-title">Change Password</h2>

        <div className="mt-6 space-y-6">

          {/* Current Password */}
          <div>
            <label className="font-semibold text-gray-800">Current Password</label>
            <input
              type="password"
              className="input mt-2 w-full"
              value={passwords.current}
              onChange={(e) =>
                setPasswords({ ...passwords, current: e.target.value })
              }
            />
          </div>

          {/* New Password */}
          <div>
            <label className="font-semibold text-gray-800">New Password</label>
            <input
              type="password"
              className="input mt-2 w-full"
              value={passwords.newPass}
              onChange={(e) =>
                setPasswords({ ...passwords, newPass: e.target.value })
              }
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="font-semibold text-gray-800">Confirm New Password</label>
            <input
              type="password"
              className="input mt-2 w-full"
              value={passwords.confirm}
              onChange={(e) =>
                setPasswords({ ...passwords, confirm: e.target.value })
              }
            />
          </div>

          {/* Save Button */}
          <button
            onClick={updatePassword}
            disabled={savingPassword}
            className="btn btn-primary mt-6"
          >
            {savingPassword ? "Updating…" : "Update Password"}
          </button>
        </div>
      </div>

      {/* 2FA Card */}
      <div className="card">
        <h2 className="section-title">Two‑Factor Authentication</h2>

        <div className="mt-6 space-y-4">
          <p className="text-gray-800">
            Add an extra layer of security to your account.
          </p>

          <p className="text-muted text-sm">
            When enabled, you’ll be asked for a verification code at login.
          </p>

          <button
            onClick={toggle2FA}
            disabled={saving2FA}
            className={`btn ${
              security.twoFactorEnabled ? "btn-danger" : "btn-primary"
            } mt-4`}
          >
            {saving2FA
              ? "Updating…"
              : security.twoFactorEnabled
              ? "Disable Two‑Factor Authentication"
              : "Enable Two‑Factor Authentication"}
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 flex gap-4">
        <Link href="/dashboard/settings/sessions" className="btn btn-secondary">
          Manage Sessions
        </Link>

        <Link href="/dashboard" className="btn btn-success">
          Dashboard Home
        </Link>
      </div>
    </div>
  );
}
