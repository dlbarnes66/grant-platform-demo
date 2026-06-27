"use client";

import Link from "next/link";

export default function SettingsHubPage() {
  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-muted mt-2">
          Manage your profile, notifications, and security preferences.
        </p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Profile */}
        <div className="card hover-card">
          <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
          <p className="text-muted mt-2">
            Update your name, organization, and job title.
          </p>
          <Link href="/dashboard/settings/profile" className="btn btn-secondary mt-6 w-full text-center">
            Edit Profile
          </Link>
        </div>

        {/* Notifications */}
        <div className="card hover-card">
          <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
          <p className="text-muted mt-2">
            Choose which alerts and updates you want to receive.
          </p>
          <Link href="/dashboard/settings/notifications" className="btn btn-secondary mt-6 w-full text-center">
            Notification Settings
          </Link>
        </div>

        {/* Security */}
        <div className="card hover-card">
          <h2 className="text-lg font-semibold text-gray-900">Password & Security</h2>
          <p className="text-muted mt-2">
            Change your password and review security options.
          </p>
          <Link href="/dashboard/settings/security" className="btn btn-secondary mt-6 w-full text-center">
            Security Settings
          </Link>
        </div>

        {/* Billing (Placeholder) */}
        <div className="card opacity-60">
          <h2 className="text-lg font-semibold text-gray-900">Billing & Subscription</h2>
          <p className="text-muted mt-2">
            Manage your plan and payment details. (Coming soon)
          </p>
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
