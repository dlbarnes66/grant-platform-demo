"use client";

import { useEffect, useState } from "react";
import Card, { CardHeader, CardFooter } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function OrganizationProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    logoUrl: "",
    website: "",
    ein: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
  });

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/organization");
      const data = await res.json();

      setForm({
        name: data.name || "",
        logoUrl: data.logoUrl || "",
        website: data.website || "",
        ein: data.ein || "",
        address1: data.address1 || "",
        address2: data.address2 || "",
        city: data.city || "",
        state: data.state || "",
        zip: data.zip || "",
      });

      setLoading(false);
    }

    load();
  }, []);

  async function save() {
    setSaving(true);

    await fetch("/api/organization", {
      method: "PUT",
      body: JSON.stringify(form),
    });

    setSaving(false);
    alert("Organization profile updated!");
  }

  if (loading) {
    return (
      <div className="p-6">
        <Card className="text-center py-10">
          <p className="text-gray-600">Loading organization profile…</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 max-w-3xl">
      <h1 className="text-2xl font-bold text-brandBlue">Organization Profile</h1>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800">
            Organization Details
          </h2>
        </CardHeader>

        <div className="space-y-6">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <img
              src={form.logoUrl || "/default-org.png"}
              alt="Organization Logo"
              className="w-20 h-20 rounded-lg border object-cover bg-white"
            />

            <div>
              <label className="text-sm font-medium text-gray-700">
                Logo URL
              </label>
              <input
                className="mt-1 px-3 py-2 border rounded-lg w-64 focus:ring-brandBlue/40 focus:border-brandBlue"
                value={form.logoUrl}
                onChange={(e) =>
                  setForm({ ...form, logoUrl: e.target.value })
                }
              />
            </div>
          </div>

          {/* Name */}
          <Input
            label="Organization Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          {/* Website */}
          <Input
            label="Website"
            placeholder="https://example.org"
            value={form.website}
            onChange={(e) => setForm({ ...form, website: e.target.value })}
          />

          {/* EIN */}
          <Input
            label="EIN / Tax ID"
            placeholder="12-3456789"
            value={form.ein}
            onChange={(e) => setForm({ ...form, ein: e.target.value })}
          />

          {/* Address */}
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Address Line 1"
              value={form.address1}
              onChange={(e) => setForm({ ...form, address1: e.target.value })}
            />

            <Input
              label="Address Line 2"
              value={form.address2}
              onChange={(e) => setForm({ ...form, address2: e.target.value })}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <Input
              label="City"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />

            <Input
              label="State"
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
            />

            <Input
              label="ZIP Code"
              value={form.zip}
              onChange={(e) => setForm({ ...form, zip: e.target.value })}
            />
          </div>
        </div>

        <CardFooter className="mt-6">
          <Button fullWidth loading={saving} onClick={save}>
            Save Organization Profile
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
