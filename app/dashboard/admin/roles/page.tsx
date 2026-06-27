"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function RolesPage() {
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);

  const loadRoles = async () => {
    const res = await fetch("/api/admin/roles");
    const data = await res.json();
    setRoles(data || []);
    setLoading(false);
  };

  const togglePermission = (roleId: string, perm: string) => {
    setRoles((prev) =>
      prev.map((r) =>
        r.id === roleId
          ? {
              ...r,
              permissions: r.permissions.includes(perm)
                ? r.permissions.filter((p: string) => p !== perm)
                : [...r.permissions, perm],
            }
          : r
      )
    );
  };

  const saveRoles = async () => {
    setSaving(true);

    const res = await fetch("/api/admin/roles/update", {
      method: "POST",
      body: JSON.stringify({ roles }),
    });

    const data = await res.json();
    setSaving(false);

    if (data.error) {
      alert(data.error);
      return;
    }

    alert("Roles updated successfully!");
  };

  useEffect(() => {
    loadRoles();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-muted text-lg py-20">
        Loading roles…
      </div>
    );
  }

  const allPermissions = [
    "view_grants",
    "edit_grants",
    "manage_team",
    "manage_billing",
    "run_ai_tools",
    "view_reports",
    "admin_access",
  ];

  return (
    <div className="space-y-10">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Roles & Permissions</h1>
          <p className="text-muted mt-2">
            Control what each role in your organization can access.
          </p>
        </div>

        <Link href="/dashboard/admin" className="btn btn-secondary">
          Admin Home
        </Link>
      </div>

      {/* Roles */}
      <div className="card">
        <h2 className="section-title">Manage Roles</h2>

        <div className="mt-6 space-y-10">
          {roles.map((role) => (
            <div key={role.id} className="border-b pb-6">
              <h3 className="text-xl font-semibold text-gray-900">{role.name}</h3>
              <p className="text-muted text-sm mt-1">{role.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {allPermissions.map((perm) => (
                  <label key={perm} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={role.permissions.includes(perm)}
                      onChange={() => togglePermission(role.id, perm)}
                      className="w-5 h-5 accent-brandBlue"
                    />
                    <span className="text-gray-800">{perm.replace(/_/g, " ")}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={saveRoles}
          disabled={saving}
          className="btn btn-primary mt-8"
        >
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>

      {/* Footer */}
      <div className="mt-12 flex gap-4">
        <Link href="/dashboard/admin/audit" className="btn btn-secondary">
          View Audit Logs
        </Link>

        <Link href="/dashboard" className="btn btn-success">
          Dashboard Home
        </Link>
      </div>
    </div>
  );
}
