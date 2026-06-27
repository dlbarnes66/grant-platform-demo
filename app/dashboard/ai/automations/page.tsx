"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AutomationsPage() {
  const [loading, setLoading] = useState(true);
  const [automations, setAutomations] = useState<any[]>([]);

  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [trigger, setTrigger] = useState("daily");
  const [action, setAction] = useState("search_grants");

  const load = async () => {
    const res = await fetch("/api/ai/automations");
    const data = await res.json();
    setAutomations(data || []);
    setLoading(false);
  };

  const createAutomation = async () => {
    if (!name) {
      alert("Please enter an automation name.");
      return;
    }

    setCreating(true);

    const res = await fetch("/api/ai/automations/create", {
      method: "POST",
      body: JSON.stringify({ name, trigger, action }),
    });

    const data = await res.json();
    setCreating(false);

    if (data.error) {
      alert(data.error);
      return;
    }

    setName("");
    load();
  };

  const deleteAutomation = async (id: string) => {
    if (!confirm("Delete this automation?")) return;

    await fetch("/api/ai/automations/delete", {
      method: "POST",
      body: JSON.stringify({ id }),
    });

    load();
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-muted text-lg py-20">
        Loading automations…
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Automation Builder</h1>
        <p className="text-muted mt-2">
          Create automated workflows for searching, analyzing, and generating proposals.
        </p>
      </div>

      {/* Existing Automations */}
      <div className="card">
        <h2 className="section-title">Your Automations</h2>

        {automations.length === 0 ? (
          <p className="text-muted mt-2">No automations created yet.</p>
        ) : (
          <div className="mt-6 space-y-4">
            {automations.map((a) => (
              <div
                key={a.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div>
                  <p className="font-semibold text-gray-900">{a.name}</p>
                  <p className="text-muted text-sm">
                    Trigger: {a.trigger} • Action: {a.action}
                  </p>
                </div>

                <button
                  onClick={() => deleteAutomation(a.id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Automation */}
      <div className="card">
        <h2 className="section-title">Create New Automation</h2>

        <div className="mt-6 space-y-6">

          {/* Name */}
          <div>
            <label className="font-semibold text-gray-800">Automation Name</label>
            <input
              type="text"
              className="input mt-2 w-full"
              placeholder="e.g., Weekly Grant Search"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Trigger */}
          <div>
            <label className="font-semibold text-gray-800">Trigger</label>
            <select
              className="input mt-2 w-full"
              value={trigger}
              onChange={(e) => setTrigger(e.target.value)}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="on_demand">On Demand</option>
            </select>
          </div>

          {/* Action */}
          <div>
            <label className="font-semibold text-gray-800">Action</label>
            <select
              className="input mt-2 w-full"
              value={action}
              onChange={(e) => setAction(e.target.value)}
            >
              <option value="search_grants">Search Grants</option>
              <option value="analyze_grants">Analyze Grants</option>
              <option value="generate_proposal">Generate Proposal</option>
              <option value="email_summary">Email Summary</option>
            </select>
          </div>

          {/* Create Button */}
          <button
            onClick={createAutomation}
            disabled={creating}
            className="btn btn-primary"
          >
            {creating ? "Creating…" : "Create Automation"}
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 flex gap-4">
        <Link href="/dashboard/ai" className="btn btn-secondary">
          Back to AI Tools
        </Link>

        <Link href="/dashboard" className="btn btn-success">
          Dashboard Home
        </Link>
      </div>
    </div>
  );
}
