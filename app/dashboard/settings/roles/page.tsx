"use client";

import { useEffect, useState } from "react";
import Card, { CardHeader, CardFooter } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import {
  ShieldCheckIcon,
  ShieldExclamationIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

export default function RolesPermissionsPage() {
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState<any[]>([]);
  const [newRole, setNewRole] = useState("");
  const [saving, setSaving] = useState(false);

  const PERMISSIONS = [
    { key: "view_grants", label: "View Grants" },
    { key: "edit_grants", label: "Edit Grants" },
    { key: "manage_team", label: "Manage Team" },
    { key: "manage_billing", label: "Manage Billing" },
    { key: "run_searches", label: "Run Searches" },
    { key: "view_jobs", label: "View Jobs" },
  ];

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/roles");
      const data = await res.json();
      setRoles(data);
      setLoading(false);
    }
    load();
  }, []);

  function togglePermission(roleId: string, perm: string) {
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
  }

  async function save() {
    setSaving(true);
    await fetch("/api/roles", {
      method: "PUT",
      body: JSON.stringify(roles),
    });
    setSaving(false);
    alert("Roles updated!");
  }

  async function addRole() {
    if (!newRole.trim()) return;

    const res = await fetch("/api/roles", {
      method: "POST",
      body: JSON.stringify({ name: newRole }),
    });

    const data = await res.json();
    setRoles((prev) => [...prev, data]);
    setNewRole("");
  }

  async function deleteRole(id: string) {
    await fetch(`/api/roles/${id}`, { method: "DELETE" });
    setRoles((prev) => prev.filter((r) => r.id !== id));
  }

  if (loading) {
    return (
      <div className="p-6">
        <Card className="text-center py-10">
          <p className="text-gray-600">Loading roles & permissions…</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-brandBlue">Roles & Permissions</h1>

      {/* Add New Role */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <PlusIcon className="w-5 h-5 text-brandBlue" />
            Add New Role
          </h2>
        </CardHeader>

        <div className="space-y-4">
          <Input
            label="Role Name"
            placeholder="e.g., Grant Reviewer"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
          />
        </div>

        <CardFooter className="mt-6">
          <Button fullWidth onClick={addRole}>
            Create Role
          </Button>
        </CardFooter>
      </Card>

      {/* Roles List */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <ShieldCheckIcon className="w-5 h-5 text-brandBlue" />
            Manage Roles
          </h2>
        </CardHeader>

        <div className="space-y-6">
          {roles.length === 0 && (
            <p className="text-gray-500">No roles created yet.</p>
          )}

          {roles.map((role) => (
            <div
              key={role.id}
              className="border p-4 rounded-lg space-y-4 bg-white"
            >
              {/* Role Header */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">{role.name}</p>
                  <Badge variant="info">
                    {role.permissions.length} permissions
                  </Badge>
                </div>

                {role.name !== "Owner" && (
                  <button
                    onClick={() => deleteRole(role.id)}
                    className="text-red-600 hover:text-red-700 transition"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Permissions */}
              <div className="grid md:grid-cols-2 gap-3">
                {PERMISSIONS.map((perm) => (
                  <label
                    key={perm.key}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={role.permissions.includes(perm.key)}
                      onChange={() => togglePermission(role.id, perm.key)}
                      className="w-5 h-5 accent-brandBlue"
                    />
                    <span className="text-gray-700">{perm.label}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <CardFooter className="mt-6">
          <Button fullWidth loading={saving} onClick={save}>
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
