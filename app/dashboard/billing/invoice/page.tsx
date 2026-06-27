"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function InvoiceHistoryPage() {
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/billing/invoices");
      const data = await res.json();
      setInvoices(data || []);
      setLoading(false);
    };

    load();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-muted text-lg py-20">
        Loading invoices…
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Invoice History</h1>
          <p className="text-muted mt-2">
            View and download all past invoices for your subscription.
          </p>
        </div>

        <Link href="/dashboard/billing" className="btn btn-secondary">
          Back to Billing
        </Link>
      </div>

      {/* Invoice List */}
      <div className="card">
        <h2 className="section-title">All Invoices</h2>

        {invoices.length === 0 ? (
          <p className="text-muted mt-2">No invoices found.</p>
        ) : (
          <div className="mt-6 space-y-4">
            {invoices.map((inv) => (
              <div
                key={inv.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div>
                  <p className="font-semibold text-gray-900">{inv.amount}</p>
                  <p className="text-muted text-sm">{inv.date}</p>
                  <p className="text-muted text-xs">{inv.status}</p>
                </div>

                <a
                  href={inv.url}
                  target="_blank"
                  className="btn btn-secondary btn-sm"
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-12">
        <Link href="/dashboard" className="btn btn-success">
          Dashboard Home
        </Link>
      </div>
    </div>
  );
}
