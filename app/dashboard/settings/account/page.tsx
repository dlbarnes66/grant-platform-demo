"use client";

import { useState, useEffect } from "react";
import Card, { CardHeader, CardFooter } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function AccountSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    organization: "",
    email: "",
    avatarUrl: "",
  });

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/user");
      const data = await res.json();

      setForm({
        name: data.name || "",
        organization: data.organization || "",
        email: data.email || "",
        avatarUrl: data.avatarUrl || "",
      });

      setLoading(false);
    }

    load();
  }, []);

  async function save() {
    setSaving(true);

    await fetch("/api/user", {
      method: "PUT",
      body: JSON.stringify(form),
    });

    setSaving(false);
    alert("Account updated!");
  }

  if (loading) {
    return (
      <div className="p-6">
        <Card className="text-center py-10">
          <p className="text-gray-600">Loading account settings…</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-brandBlue">Account Settings</h1>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800">Profile</h2>
        </CardHeader>

        <div className="space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <img
              src={form.avatarUrl || "/default-avatar.png"}
              alt="Avatar"
              className="w-20 h-20 rounded-full border object-cover"
            />

            <div>
              <label className="text-sm font-medium text-gray-700">
                Avatar URL
              </label>
              <input
                className="mt-1 px-3 py-2 border rounded-lg w-64 focus:ring-brandBlue/40 focus:border-brandBlue"
                value={form.avatarUrl}
                onChange={(e) =>
                  setForm({ ...form, avatarUrl: e.target.value })
                }
              />
            </div>
          </div>

          {/* Name */}
          <Input
            label="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          {/* Organization */}
          <Input
            label="Organization"
            value={form.organization}
            onChange={(e) =>
              setForm({ ...form, organization: e.target.value })
            }
          />

          {/* Email (read-only) */}
          <Input
            label="Email"
            value={form.email}
            disabled
            helperText="Email is managed by your authentication provider."
          />
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
