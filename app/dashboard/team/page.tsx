"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function TeamOverviewPage() {
  const [team, setTeam] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [inviteEmail, setInviteEmail] = useState("");
  const [inviting, setInviting] = useState(false);

  useEffect(() => {
    const loadTeam = async () => {
      const res = await fetch("/api/team");
      const data = await res.json();
      setTeam(data);
      setLoading(false);
    };

    loadTeam();
  }, []);

  const sendInvite = async () => {
    if (!inviteEmail) {
      alert("Please enter an email.");
      return;
    }

    setInviting(true);

    const res = await fetch("/api/team/invite", {
      method: "POST",
      body: JSON.stringify({ email: inviteEmail }),
    });

    const data = await res.json();
    setInviting(false);

    if (data.error) {
      alert(data.error);
      return;
    }

    alert("Invitation sent!");
    setInviteEmail("");

    // Reload team data
    const updated = await fetch("/api/team");
    setTeam(await updated.json());
  };

  if (loading) {
    return (
      <div className="text-center text-muted text-lg py-20">
        Loading team…
      </div>
    );
  }

  if (!team) {
    return (
      <div className="text-center text-red-600 text-lg py-20">
        Team data not found.
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
        <p className="text-muted mt-2">
          Manage team members, roles, and invitations.
        </p>
      </div>

      {/* Seat Usage */}
      <div className="card">
        <h2 className="section-title">Seat Usage</h2>

        <p className="text-gray-800 mt-2">
          {team.members.length} of {team.seatLimit} seats used
        </p>

        <div className="w-full bg-gray-200 h-3 rounded mt-4">
          <div
            className="bg-blue-600 h-3 rounded"
            style={{
              width: `${(team.members.length / team.seatLimit) * 100}%`,
            }}
          />
        </div>

        <Link href="/dashboard/billing/upgrade" className="btn btn-primary mt-6">
          Upgrade for More Seats
        </Link>
      </div>

      {/* Team Members */}
      <div className="card">
        <h2 className="section-title">Team Members</h2>

        {team.members.length === 0 ? (
          <p className="text-muted mt-2">No team members yet.</p>
        ) : (
          <div className="mt-6 space-y-4">
            {team.members.map((m: any) => (
              <div
                key={m.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div>
                  <p className="font-semibold text-gray-900">{m.name}</p>
                  <p className="text-muted text-sm">{m.email}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-gray-700 text-sm">{m.role}</span>

                  {m.isOwner ? (
                    <span className="text-blue-600 font-semibold text-sm">
                      Owner
                    </span>
                  ) : (
                    <button
                      onClick={async () => {
                        if (!confirm("Remove this team member?")) return;

                        await fetch("/api/team/remove", {
                          method: "POST",
                          body: JSON.stringify({ userId: m.id }),
                        });

                        const updated = await fetch("/api/team");
                        setTeam(await updated.json());
                      }}
                      className="btn btn-danger btn-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pending Invites */}
      <div className="card">
        <h2 className="section-title">Pending Invitations</h2>

        {team.invites.length === 0 ? (
          <p className="text-muted mt-2">No pending invites.</p>
        ) : (
          <div className="mt-6 space-y-4">
            {team.invites.map((inv: any) => (
              <div
                key={inv.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div>
                  <p className="font-semibold text-gray-900">{inv.email}</p>
                  <p className="text-muted text-sm">Invitation sent</p>
                </div>

                <button
                  onClick={async () => {
                    await fetch("/api/team/invite/cancel", {
                      method: "POST",
                      body: JSON.stringify({ inviteId: inv.id }),
                    });

                    const updated = await fetch("/api/team");
                    setTeam(await updated.json());
                  }}
                  className="btn btn-danger btn-sm"
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Invite Form */}
      <div className="card">
        <h2 className="section-title">Invite a Team Member</h2>

        <p className="text-muted mt-2">
          Add collaborators to your organization.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            className="input w-full"
            placeholder="Email address"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
          />

          <button
            onClick={sendInvite}
            disabled={inviting}
            className="btn btn-primary"
          >
            {inviting ? "Sending…" : "Send Invite"}
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12">
        <Link href="/dashboard" className="text-muted underline">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
