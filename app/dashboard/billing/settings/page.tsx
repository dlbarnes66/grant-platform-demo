"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BillingSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    billingEmail: "",
    companyName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    taxId: "",
  });

  const load = async () => {
    const res = await fetch("/api/billing/settings");
    const data = await res.json();
    setForm(data);
    setLoading(false);
  };

  const save = async () => {
    setSaving(true);

    const res = await fetch("/api/billing/settings/update", {
      method: "POST",
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setSaving(false);

    if (data.error) {
      alert(data.error);
      return;
    }

    alert("Billing settings updated!");
  };

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-muted text-lg py-20">
        Loading billing settings…
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Billing Settings</h1>
          <p className="text-muted mt-2">
            Update your billing email, address, and tax information.
          </p>
        </div>

        <Link href="/dashboard/billing" className="btn btn-secondary">
          Back to Billing
        </Link>
      </div>

      {/* Billing Email */}
      <div className="card">
        <h2 className="section-title">Billing Email</h2>

        <div className="mt-6">
          <label className="font-semibold text-gray-800">Email</label>
          <input
            type="email"
            className="input mt-2 w-full"
            value={form.billingEmail}
            onChange={(e) => update("billingEmail", e.target.value)}
          />
          <p className="text-muted text-sm mt-1">
            All invoices and billing notifications will be sent here.
          </p>
        </div>
      </div>

      {/* Company Info */}
      <div className="card">
        <h2 className="section-title">Company Information</h2>

        <div className="mt-6 space-y-6">

          <div>
            <label className="font-semibold text-gray-800">Company Name</label>
            <input
              type="text"
              className="input mt-2 w-full"
              value={form.companyName}
              onChange={(e) => update("companyName", e.target.value)}
            />
          </div>

          <div>
            <label className="font-semibold text-gray-800">Tax ID / EIN</label>
            <input
              type="text"
              className="input mt-2 w-full"
              value={form.taxId}
              onChange={(e) => update("taxId", e.target.value)}
            />
            <p className="text-muted text-sm mt-1">
              Optional — used for tax‑compliant invoices.
            </p>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="card">
        <h2 className="section-title">Billing Address</h2>

        <div className="mt-6 space-y-6">

          <div>
            <label className="font-semibold text-gray-800">Address Line 1</label>
            <input
              type="text"
              className="input mt-2 w-full"
              value={form.address1}
              onChange={(e) => update("address1", e.target.value)}
            />
          </div>

          <div>
            <label className="font-semibold text-gray-800">Address Line 2</label>
            <input
              type="text"
              className="input mt-2 w-full"
              value={form.address2}
              onChange={(e) => update("address2", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="font-semibold text-gray-800">City</label>
              <input
                type="text"
                className="input mt-2 w-full"
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
              />
            </div>

            <div>
              <label className="font-semibold text-gray-800">State</label>
              <input
                type="text"
                className="input mt-2 w-full"
                value={form.state}
                onChange={(e) => update("state", e.target.value)}
              />
            </div>

            <div>
              <label className="font-semibold text-gray-800">Postal Code</label>
              <input
                type="text"
                className="input mt-2 w-full"
                value={form.postalCode}
                onChange={(e) => update("postalCode", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-gray-800">Country</label>
            <input
              type="text"
              className="input mt-2 w-full"
              value={form.country}
              onChange={(e) => update("country", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={save}
        disabled={saving}
        className="btn btn-primary"
      >
        {saving ? "Saving…" : "Save Billing Settings"}
      </button>

      {/* Footer */}
      <div className="mt-12 flex gap-4">
        <Link href="/dashboard/billing" className="btn btn-secondary">
          Back to Billing
        </Link>

        <Link href="/dashboard" className="btn btn-success">
          Dashboard Home
        </Link>
      </div>
    </div>
  );
}
