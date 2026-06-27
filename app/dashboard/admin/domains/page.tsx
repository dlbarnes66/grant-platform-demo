"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DomainRestrictionsPage() {
  const [domains, setDomains] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [newDomain, setNewDomain] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadDomains = async () => {
      const res = await fetch("/api/admin/domains");
      const data = await res.json();
      setDomains(data || []);
      setLoading(false);
    };

    loadDomains();
  }, []);

  const addDomain = async () => {
    if (!newDomain) {
      alert("Please enter a domain.");
      return;
    }

    setSaving(true);

    const res = await fetch("/api/admin/domains/add", {
      method: "POST",
      body: JSON.stringify({ domain: newDomain }),
    });

    const data = await res.json();
    setSaving(false);

    if (data.error) {
      alert(data.error);
      return;
    }

    setNewDomain("");

    // Reload domains
    const updated = await fetch("/api/admin/domains");
    setDomains(await updated.json());
  };

  const removeDomain = async (domain: string) => {
    if (!confirm(`Remove domain restriction for ${domain}?`)) return;

    await fetch("/api/admin/domains/remove", {
      method: "POST",
      body: JSON.stringify({ domain }),
    });

    const updated = await fetch("/api/admin/domains");
    setDomains(await updated.json());
  };

  if (loading) {
    return (
      <div className="text-center text-muted text-lg py-20">
        Loading domain restrictions…
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Domain Restrictions</h1>
        <p className="text-muted mt-2">
          Control which email domains are allowed for team invites and signups.
        </p>
      </div>

      {/* Allowed Domains */}
      <div className="card">
        <h2 className="section-title">Allowed Domains</h2>

        {domains.length === 0 ? (
          <p className="text-muted mt-2">No domain restrictions set.</p>
        ) : (
          <div className="mt-6 space-y-4">
            {domains.map((d) => (
              <div
                key={d}
                className="flex items-center justify-between border-b pb-4"
              >
                <p className="font-semibold text-gray-900">{d}</p>

                <button
                  onClick={() => removeDomain(d)}
                  className="btn btn-danger btn-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Domain */}
      <div className="card">
        <h2 className="section-title">Add Allowed Domain</h2>

        <p className="text-muted mt-2">
          Only users with these domains will be allowed to join your organization.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            className="input w-full"
            placeholder="example.org"
            value={newDomain}
            onChange={(e) => setNewDomain(e.target.value)}
          />

          <button
            onClick={addDomain}
            disabled={saving}
            className="btn btn-primary"
          >
            {saving ? "Adding…" : "Add Domain"}
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 flex gap-4">
        <Link href="/dashboard/admin" className="btn btn-secondary">
          Back to Admin
        </Link>

        <Link href="/dashboard" className="btn btn-success">
          Dashboard Home
        </Link>
      </div>
    </div>
  );
}
