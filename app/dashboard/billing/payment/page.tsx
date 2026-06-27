"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function PaymentMethodPage() {
  const [loading, setLoading] = useState(true);
  const [payment, setPayment] = useState<any>(null);
  const [updating, setUpdating] = useState(false);

  const load = async () => {
    const res = await fetch("/api/billing/payment");
    const data = await res.json();
    setPayment(data);
    setLoading(false);
  };

  const updateCard = async () => {
    setUpdating(true);

    const res = await fetch("/api/billing/payment/update", {
      method: "POST",
    });

    const data = await res.json();
    setUpdating(false);

    if (data.error) {
      alert(data.error);
      return;
    }

    if (data.url) {
      window.location.href = data.url; // Stripe-hosted update page
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-muted text-lg py-20">
        Loading payment method…
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payment Method</h1>
          <p className="text-muted mt-2">
            Manage your saved card used for subscription billing.
          </p>
        </div>

        <Link href="/dashboard/billing" className="btn btn-secondary">
          Back to Billing
        </Link>
      </div>

      {/* Current Card */}
      <div className="card">
        <h2 className="section-title">Current Card</h2>

        <div className="mt-6 flex items-center justify-between">
          <div>
            <p className="font-semibold text-gray-900">
              {payment.brand} ending in {payment.last4}
            </p>

            <p className="text-muted text-sm mt-1">
              Expires {payment.exp}
            </p>
          </div>

          <button
            onClick={updateCard}
            disabled={updating}
            className="btn btn-primary"
          >
            {updating ? "Redirecting…" : "Update Card"}
          </button>
        </div>
      </div>

      {/* Billing Safety Info */}
      <div className="card">
        <h2 className="section-title">Security & Billing</h2>

        <p className="text-gray-700 mt-4">
          Your payment information is securely managed by our PCI‑compliant
          billing provider. We never store full card numbers on our servers.
        </p>
      </div>

      {/* Footer */}
      <div className="mt-12 flex gap-4">
        <Link href="/dashboard/billing" className="btn btn-secondary">
          Back to Billing
        </Link>

        <Link href="/dashboard" className="btn btn-success">
          Dashboard Home
        </Link>
      </div>
    </div>
  );
}
