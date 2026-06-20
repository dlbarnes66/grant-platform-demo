"use client";

import SettingsHeader from "@/components/settings/SettingsHeader";
import SettingsBreadcrumbs from "@/components/settings/SettingsBreadcrumbs";

export default function SettingsPageShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <SettingsHeader title={title} />

      {/* Breadcrumbs */}
      <SettingsBreadcrumbs />

      {/* Page Content */}
      <div className="bg-white p-6 rounded-xl shadow-sm border space-y-6">
        {children}
      </div>
    </div>
  );
}
