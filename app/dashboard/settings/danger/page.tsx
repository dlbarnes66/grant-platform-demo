"use client";

import { useState } from "react";
import Link from "next/link";

export default function DangerZonePage() {
  const [confirmText, setConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);

  const deleteAccount = async () => {
    if (confirmText !== "DELETE") {
      alert('You must type "DELETE" to confirm.');
      return;
    }

    if (!confirm("This action is permanent. Are you absolutely sure?")) return;

    setDeleting(true);

    const res = await fetch("/api/settings/delete-account", {
      method: "POST",
    });

    const data = await res.json();
    setDeleting(false);

    if (data.error) {
      alert(data.error);
      return;
    }

    // Redirect to goodbye page or homepage
    window.location.href = "/goodbye";
  };

  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-red-600">Danger Zone</h1>
        <p className="text-muted mt-2">
          Permanently delete your account and all associated data.
        </p>
      </div>

      {/* Warning Card */}
      <div className="card border border-red-300">
        <h2 className="section-title text-red-600">Delete Account</h2>

        <div className="mt-6 space-y-6">

          <p className="text-gray-800">
            This action is <strong>permanent</strong> and cannot be undone.
          </p>

          <ul className="text-gray-700 list-disc ml-6 space-y-1">
            <li>Your profile and login will be removed</li>
            <li>All saved grants and searches will be deleted</li>
            <li>Your AI history and documents will be erased</li>
            <li>Your organization’s data will be permanently removed</li>
          </ul>

          <p className="text-red-600 font-semibold mt-4">
            To confirm, type <code>DELETE</code> below:
          </p>

          <input
            type="text"
            className="input mt-2 w-full"
            placeholder="Type DELETE to confirm"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
          />

          <button
            onClick={deleteAccount}
            disabled={deleting}
            className="btn btn-danger mt-6"
          >
            {deleting ? "Deleting…" : "Delete My Account"}
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 flex gap-4">
        <Link href="/dashboard/settings" className="btn btn-secondary">
          Back to Settings
        </Link>

        <Link href="/dashboard" className="btn btn-success">
          Dashboard Home
        </Link>
      </div>
    </div>
  );
}
