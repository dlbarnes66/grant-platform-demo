"use client";

import Link from "next/link";
import Card from "@/components/ui/Card";
import {
  UserIcon,
  BellIcon,
  CreditCardIcon,
  KeyIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  BuildingOfficeIcon,
  ClipboardDocumentListIcon,
  ServerIcon,
  PuzzlePieceIcon,
  LinkIcon,
  CodeBracketIcon,
  SparklesIcon,
  LifebuoyIcon,
  ScaleIcon,
  SwatchIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";

const settings = [
  {
    title: "Account",
    description: "Manage your personal profile and login details.",
    href: "/dashboard/settings/account",
    icon: UserIcon,
  },
  {
    title: "Notifications",
    description: "Control email and in‑app notifications.",
    href: "/dashboard/settings/notifications",
    icon: BellIcon,
  },
  {
    title: "Billing",
    description: "View your plan, invoices, and payment methods.",
    href: "/dashboard/settings/billing",
    icon: CreditCardIcon,
  },
  {
    title: "API Keys",
    description: "Generate and manage API keys for integrations.",
    href: "/dashboard/settings/api-keys",
    icon: KeyIcon,
  },
  {
    title: "Team",
    description: "Invite members and manage team access.",
    href: "/dashboard/settings/team",
    icon: UserGroupIcon,
  },
  {
    title: "Roles & Permissions",
    description: "Define custom roles and access levels.",
    href: "/dashboard/settings/roles",
    icon: ShieldCheckIcon,
  },
  {
    title: "Organization",
    description: "Update organization name, logo, and details.",
    href: "/dashboard/settings/organization",
    icon: BuildingOfficeIcon,
  },
  {
    title: "Audit Logs",
    description: "Track user activity and security events.",
    href: "/dashboard/settings/audit-logs",
    icon: ClipboardDocumentListIcon,
  },
  {
    title: "System Status",
    description: "Monitor workers, queues, and uptime.",
    href: "/dashboard/settings/system-status",
    icon: ServerIcon,
  },
  {
    title: "Integrations",
    description: "Connect Slack, Zapier, Google Drive, and more.",
    href: "/dashboard/settings/integrations",
    icon: PuzzlePieceIcon,
  },
  {
    title: "Webhooks",
    description: "Configure webhook URLs, secrets, and events.",
    href: "/dashboard/settings/webhooks",
    icon: LinkIcon,
  },
  {
    title: "Developer Docs",
    description: "API documentation, SDKs, and examples.",
    href: "/dashboard/settings/developers",
    icon: CodeBracketIcon,
  },
  {
    title: "Changelog",
    description: "See what’s new and improved.",
    href: "/dashboard/settings/changelog",
    icon: SparklesIcon,
  },
  {
    title: "Support",
    description: "Help articles, FAQs, and contact support.",
    href: "/dashboard/settings/support",
    icon: LifebuoyIcon,
  },
  {
    title: "Legal & Compliance",
    description: "Terms, privacy policy, and compliance docs.",
    href: "/dashboard/settings/legal",
    icon: ScaleIcon,
  },
  {
    title: "Branding & Theme",
    description: "Customize colors, fonts, and appearance.",
    href: "/dashboard/settings/branding",
    icon: SwatchIcon,
  },
  {
    title: "Data Export & Import",
    description: "Export your data or import configuration.",
    href: "/dashboard/settings/data",
    icon: ArrowDownTrayIcon,
  },
];

export default function SettingsIndexPage() {
  return (
    <div className="p-6 space-y-8 max-w-5xl">
      <h1 className="text-3xl font-bold text-brandBlue">Settings</h1>
      <p className="text-gray-600">
        Manage your account, organization, billing, integrations, and more.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {settings.map((item) => (
          <Link key={item.href} href={item.href}>
            <Card className="p-6 hover:shadow-lg transition cursor-pointer h-full">
              <div className="flex items-center gap-4">
                <item.icon className="w-8 h-8 text-brandBlue" />
                <div>
                  <h3 className="font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
