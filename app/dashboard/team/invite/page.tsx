"use client";

import { useState } from "react";
import Link from "next/link";

export default function InviteTeamMemberPage() {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  const sendInvite = async () => {
    if (!email) {
      alert("Please enter an email.");
      return;
    }

    setSending(true);

    const res = await fetch("/api/team/invite", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setSending(false);

    if (data.error) {
      alert(data.error);
      return;
    }

    alert("Invitation sent!");
    setEmail("");
  };

  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Invite a Team Member</h1>
        <p className="text-muted mt-2">
          Add collaborators to your organization.
        </p>
      </div>

      {/* Invite Card */}
      <div className="card">
        <h2 className="section-title">Send Invitation</h2>

        <p className="text-muted mt-2">
          Enter the email address of the person you want to invite.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            className="input w-full"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            onClick={sendInvite}
            disabled={sending}
            className="btn btn-primary"
          >
            {sending ? "Sending…" : "Send Invite"}
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 flex gap-4">
        <Link href="/dashboard/team" className="btn btn-secondary">
          Back to Team
        </Link>

        <Link href="/dashboard" className="btn btn-success">
          Dashboard Home
        </Link>
      </div>
    </div>
  );
}
