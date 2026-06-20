"use client";

import { useEffect, useState } from "react";
import Card, { CardHeader } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import {
  ShieldCheckIcon,
  DocumentTextIcon,
  LockClosedIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";

export default function LegalCompliancePage() {
  const [loading, setLoading] = useState(true);
  const [legal, setLegal] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/legal");
      const data = await res.json();
      setLegal(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <Card className="py-10 text-center">
          <p className="text-gray-600">Loading legal documents…</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-10 max-w-4xl">
      <h1 className="text-2xl font-bold text-brandBlue">Legal & Compliance</h1>

      {/* Terms of Service */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <DocumentTextIcon className="w-5 h-5 text-brandBlue" />
            Terms of Service
          </h2>
        </CardHeader>

        <div className="p-4 space-y-4">
          <p className="text-gray-700">{legal.tos.summary}</p>

          <p className="text-gray-500 text-sm">
            Last updated: {new Date(legal.tos.updatedAt).toLocaleDateString()}
          </p>

          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => window.open(legal.tos.url, "_blank")}
          >
            <ArrowDownTrayIcon className="w-4 h-4" />
            Download Terms of Service
          </Button>
        </div>
      </Card>

      {/* Privacy Policy */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <LockClosedIcon className="w-5 h-5 text-brandBlue" />
            Privacy Policy
          </h2>
        </CardHeader>

        <div className="p-4 space-y-4">
          <p className="text-gray-700">{legal.privacy.summary}</p>

          <p className="text-gray-500 text-sm">
            Last updated: {new Date(legal.privacy.updatedAt).toLocaleDateString()}
          </p>

          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => window.open(legal.privacy.url, "_blank")}
          >
            <ArrowDownTrayIcon className="w-4 h-4" />
            Download Privacy Policy
          </Button>
        </div>
      </Card>

      {/* Data Processing Agreement */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <ShieldCheckIcon className="w-5 h-5 text-brandBlue" />
            Data Processing Agreement (DPA)
          </h2>
        </CardHeader>

        <div className="p-4 space-y-4">
          <p className="text-gray-700">{legal.dpa.summary}</p>

          <p className="text-gray-500 text-sm">
            Last updated: {new Date(legal.dpa.updatedAt).toLocaleDateString()}
          </p>

          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => window.open(legal.dpa.url, "_blank")}
          >
            <ArrowDownTrayIcon className="w-4 h-4" />
            Download DPA
          </Button>
        </div>
      </Card>
    </div>
  );
}
