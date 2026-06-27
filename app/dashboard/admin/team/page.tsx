"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function TeamManagementPage() {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<any[]>([]);
  const [invites, setInvites] = useState<any[]>([]);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("member");
  const [sending, setSending] = useState(false);

  const loadTeam = async () => {
    const res = await fetch("/api/admin/team");
    const data = await res.json();

    setMembers(data.members || []);
    setInvites(data.invites || []);
    setLoading(false);
  };

  const sendInvite = async () => {
    if (!email) {
      alert("Please enter an email address.");
      return;
    }

    setSending(true);

    const res = await fetch("/api/admin/team/invite", {
      method: "POST",
      body: JSON.stringify({ email, role }),
    });

    const data = await res.json();
    setSending(false);

    if (data.error) {
      alert(data.error);
      return;
    }

    alert("Invitation sent!");
    setEmail("");
    loadTeam();
  };

  const removeMember = async (id: string) => {
    if (!confirm("Remove this team member?")) return;

    await fetch("/api/admin/team/remove", {
      method: "POST",
      body: JSON.stringify({ id }),
    });

    loadTeam();
  };

  const resendInvite = async (id: string) => {
    await fetch("/api/admin/team/resend", {
      method: "POST",
      body: JSON.stringify({ id }),
    });

    alert("Invitation resent!");
  };

  const revokeInvite = async (id: string) => {
    if (!confirm("Revoke this invitation?")) return;

    await fetch("/api/admin/team/revoke", {
      method: "POST",
      body: JSON.stringify({ id }),
    });

    loadTeam();
  };

  useEffect(() => {
    loadTeam();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-muted text-lg py-20">
        Loading team…
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
          <p className="text-muted mt-2">
            Manage team members, roles, and invitations.
          </p>
        </div>

        <Link href="/dashboard/admin" className="btn btn-secondary">
          Admin Home
        </Link>
      </div>

      {/* Current Members */}
      <div className="card">
        <h2 className="section-title">Team Members</h2>

        {members.length === 0 ? (
          <p className="text-muted mt-2">No team members yet.</p>
        ) : (
          <div className="mt-6 space-y-4">
            {members.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div>
                  <p className="font-semibold text-gray-900">{m.name}</p>
                  <p className="text-muted text-sm">{m.email}</p>
                  <p className="text-gray-700 text-sm mt-1">
                    Role: {m.role}
                  </p>
                </div>

                <button
                  onClick={() => removeMember(m.id)}
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
        <h2 className="section-title">Pending Invitations</h2>

        {invites.length === 0 ? (
          <p className="text-muted mt-2">No pending invites.</p>
        ) : (
          <div className="mt-6 space-y-4">
            {invites.map((inv) => (
              <div
                key={inv.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div>
                  <p className="font-semibold text-gray-900">{inv.email}</p>
                  <p className="text-muted text-sm">
                    Role: {inv.role} • Sent: {inv.sentAt}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => resendInvite(inv.id)}
                    className="btn btn-secondary btn-sm"
                  >
                    Resend
                  </button>

                  <button
                    onClick={() => revokeInvite(inv.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Revoke
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Invite Form */}
      <div className="card">
        <h2 className="section-title">Invite New Member</h2>

        <div className="mt-6 space-y-6">

          {/* Email */}
          <div>
            <label className="font-semibold text-gray-800">Email Address</label>
            <input
              type="email"
              className="input mt-2 w-full"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Role */}
          <div>
            <label className="font-semibold text-gray-800">Role</label>
            <select
              className="input mt-2 w-full"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>

          {/* Send Invite */}
          <button
            onClick={sendInvite}
            disabled={sending}
            className="btn btn-primary"
          >
            {sending ? "Sending…" : "Send Invitation"}
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 flex gap-4">
        <Link href="/dashboard/admin/roles" className="btn btn-secondary">
          Manage Roles
        </Link>

        <Link href="/dashboard" className="btn btn-success">
          Dashboard Home
        </Link>
      </div>
    </div>
  );
}
