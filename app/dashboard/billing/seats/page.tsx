"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function SeatManagementPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [seats, setSeats] = useState<any[]>([]);
  const [invites, setInvites] = useState<any[]>([]);
  const [limit, setLimit] = useState(0);

  const [inviteEmail, setInviteEmail] = useState("");

  const load = async () => {
    const res = await fetch("/api/billing/seats");
    const data = await res.json();

    setSeats(data.seats || []);
    setInvites(data.invites || []);
    setLimit(data.limit || 0);

    setLoading(false);
  };

  const invite = async () => {
    if (!inviteEmail) {
      alert("Enter an email to invite.");
      return;
    }

    setSaving(true);

    const res = await fetch("/api/billing/seats/invite", {
      method: "POST",
      body: JSON.stringify({ email: inviteEmail }),
    });

    const data = await res.json();
    setSaving(false);

    if (data.error) {
      alert(data.error);
      return;
    }

    setInviteEmail("");
    load();
  };

  const removeSeat = async (id: string) => {
    if (!confirm("Remove this team member?")) return;

    await fetch("/api/billing/seats/remove", {
      method: "POST",
      body: JSON.stringify({ id }),
    });

    load();
  };

  const cancelInvite = async (id: string) => {
    await fetch("/api/billing/seats/cancel", {
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
        Loading seat management…
      </div>
    );
  }

  const used = seats.length + invites.length;
  const remaining = limit - used;

  return (
    <div className="space-y-10">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team Seats</h1>
          <p className="text-muted mt-2">
            Manage team members and seat usage for your subscription.
          </p>
        </div>

        <Link href="/dashboard/billing" className="btn btn-secondary">
          Back to Billing
        </Link>
      </div>

      {/* Seat Summary */}
      <div className="card">
        <h2 className="section-title">Seat Usage</h2>

        <p className="text-gray-800 mt-4 text-lg font-semibold">
          {used} / {limit} seats used
        </p>

        {remaining <= 0 && (
          <p className="text-red-600 mt-2">
            You have reached your seat limit. Remove a member or upgrade your plan.
          </p>
        )}
      </div>

      {/* Active Members */}
      <div className="card">
        <h2 className="section-title">Active Team Members</h2>

        {seats.length === 0 ? (
          <p className="text-muted mt-2">No active team members.</p>
        ) : (
          <div className="mt-6 space-y-4">
            {seats.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div>
                  <p className="font-semibold text-gray-900">{s.email}</p>
                  <p className="text-muted text-sm">{s.role}</p>
                </div>

                <button
                  onClick={() => removeSeat(s.id)}
                  className="btn btn-danger btn-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pending Invites */}
      <div className="card">
        <h2 className="section-title">Pending Invites</h2>

        {invites.length === 0 ? (
          <p className="text-muted mt-2">No pending invites.</p>
        ) : (
          <div className="mt-6 space-y-4">
            {invites.map((i) => (
              <div
                key={i.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div>
                  <p className="font-semibold text-gray-900">{i.email}</p>
                  <p className="text-muted text-sm">Invite sent {i.sent}</p>
                </div>

                <button
                  onClick={() => cancelInvite(i.id)}
                  className="btn btn-secondary btn-sm"
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Invite New Member */}
      <div className="card">
        <h2 className="section-title">Invite New Member</h2>

        <div className="mt-6 space-y-4">
          <input
            type="email"
            className="input w-full"
            placeholder="Enter email address…"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
          />

          <button
            onClick={invite}
            disabled={saving || remaining <= 0}
            className="btn btn-primary"
          >
            {saving ? "Sending…" : "Send Invite"}
          </button>

          {remaining <= 0 && (
            <p className="text-red-600 text-sm mt-2">
              No seats remaining — upgrade your plan to add more members.
            </p>
          )}
        </div>
      </div>

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
