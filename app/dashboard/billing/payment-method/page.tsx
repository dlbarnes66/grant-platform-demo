"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function PaymentMethodPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [cardBrand, setCardBrand] = useState("");
  const [last4, setLast4] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/billing/payment-method");
      const data = await res.json();

      setCardBrand(data.cardBrand);
      setLast4(data.last4);
      setExpMonth(data.expMonth);
      setExpYear(data.expYear);

      setLoading(false);
    };

    load();
  }, []);

  const updatePaymentMethod = async () =>  
  {
    setSaving(true);

    const res = await fetch("/api/billing/payment-method/update", {
      method: "POST",
      body: JSON.stringify({
        cardBrand,
        last4,
        expMonth,
        expYear,
      }),
    });

    const data = await res.json();
    setSaving(false);

    if (data.error) {
      alert(data.error);
      return;
    }

    alert("Payment method updated successfully!");
  };

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
            Update your credit or debit card used for billing.
          </p>
        </div>

        <Link href="/dashboard/billing" className="btn btn-secondary">
          Back to Billing
        </Link>
      </div>

      {/* Card */}
      <div className="card">
        <h2 className="section-title">Current Card</h2>

        <div className="mt-6 space-y-6">

          {/* Card Brand */}
          <div>
            <label className="font-semibold text-gray-800">Card Brand</label>
            <input
              type="text"
              className="input mt-2 w-full"
              value={cardBrand}
              onChange={(e) => setCardBrand(e.target.value)}
            />
          </div>

          {/* Last 4 */}
          <div>
            <label className="font-semibold text-gray-800">Last 4 Digits</label>
            <input
              type="text"
              className="input mt-2 w-full"
              value={last4}
              onChange={(e) => setLast4(e.target.value)}
            />
          </div>

          {/* Expiration */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="font-semibold text-gray-800">Exp Month</label>
              <input
                type="text"
                className="input mt-2 w-full"
                value={expMonth}
                onChange={(e) => setExpMonth(e.target.value)}
              />
            </div>

            <div className="w-1/2">
              <label className="font-semibold text-gray-800">Exp Year</label>
              <input
                type="text"
                className="input mt-2 w-full"
                value={expYear}
                onChange={(e) => setExpYear(e.target.value)}
              />
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={updatePaymentMethod}
            disabled={saving}
            className="btn btn-primary mt-6"
          >
            {saving ? "Saving…" : "Save Payment Method"}
          </button>
        </div>
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
