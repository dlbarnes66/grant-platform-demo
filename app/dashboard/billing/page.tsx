"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BillingOverviewPage() {
  const [loading, setLoading] = useState(true);
  const [billing, setBilling] = useState<any>(null);

  const load = async () => {
    const res = await fetch("/api/billing/overview");
    const data = await res.json();
    setBilling(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-muted text-lg py-20">
        Loading billing information…
      </div>
    );
  }

  const plan = billing.plan;

  return (
    <div className="space-y-10">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Billing & Subscription</h1>
          <p className="text-muted mt-2">
            Manage your plan, payment methods, and billing history.
          </p>
        </div>

        <Link href="/dashboard" className="btn btn-success">
          Dashboard Home
        </Link>
      </div>

      {/* Current Plan */}
      <div className="card">
        <h2 className="section-title">Current Plan</h2>

        <div className="mt-6 flex items-center justify-between">
          <div>
            <p className="text-xl font-bold text-gray-900">{plan.name}</p>
            <p className="text-muted mt-1">
              Renews on {plan.renewsOn}
            </p>
            <p className="text-gray-700 mt-2">
              {plan.description}
            </p>
          </div>

          <Link href="/dashboard/billing/upgrade" className="btn btn-primary">
            Change Plan
          </Link>
        </div>
      </div>

      {/* Usage Summary */}
      <div className="card">
        <h2 className="section-title">Usage Summary</h2>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-700 font-semibold">AI Tokens Used</p>
            <p className="text-3xl font-bold mt-2">{billing.usage.tokens}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-700 font-semibold">Automations</p>
            <p className="text-3xl font-bold mt-2">{billing.usage.automations}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-700 font-semibold">Team Seats</p>
            <p className="text-3xl font-bold mt-2">
              {billing.usage.seatsUsed} / {billing.usage.seatsTotal}
            </p>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="card">
        <h2 className="section-title">Payment Method</h2>

        <div className="mt-6 flex items-center justify-between">
          <div>
            <p className="font-semibold text-gray-900">
              {billing.payment.brand} ending in {billing.payment.last4}
            </p>
            <p className="text-muted text-sm mt-1">
              Expires {billing.payment.exp}
            </p>
          </div>

          <Link href="/dashboard/billing/payment" className="btn btn-secondary">
            Update Payment Method
          </Link>
        </div>
      </div>

      {/* Billing History */}
      <div className="card">
        <h2 className="section-title">Billing History</h2>

        {billing.invoices.length === 0 ? (
          <p className="text-muted mt-2">No invoices yet.</p>
        ) : (
          <div className="mt-6 space-y-4">
            {billing.invoices.map((inv: any) => (
              <div
                key={inv.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div>
                  <p className="font-semibold text-gray-900">
                    {inv.date}
                  </p>
                  <p className="text-muted text-sm">
                    {inv.description}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <p className="font-semibold text-gray-900">${inv.amount}</p>

                  <Link
                    href={`/dashboard/billing/invoice/${inv.id}`}
                    className="btn btn-secondary btn-sm"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-12 flex gap-4">
        <Link href="/dashboard/billing/upgrade" className="btn btn-primary">
          Change Plan
        </Link>

        <Link href="/dashboard/billing/payment" className="btn btn-secondary">
          Update Payment Method
        </Link>
      </div>
    </div>
  );
}
