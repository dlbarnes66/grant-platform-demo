"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function PaymentHistoryPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPayments = async () => {
      const res = await fetch("/api/billing/history");
      const data = await res.json();
      setPayments(data || []);
      setLoading(false);
    };

    loadPayments();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-muted text-lg py-20">
        Loading payment history…
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Payment History</h1>
        <p className="text-muted mt-2">
          View all past invoices and transactions.
        </p>
      </div>

      {/* Payment List */}
      <div className="card">
        <h2 className="section-title">Transactions</h2>

        {payments.length === 0 ? (
          <p className="text-muted mt-2">No payments found.</p>
        ) : (
          <div className="mt-6 space-y-4">
            {payments.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div>
                  <p className="font-semibold text-gray-900">{p.date}</p>
                  <p className="text-muted text-sm">{p.description}</p>
                </div>

                <div className="text-right">
                  <p className="font-semibold">{p.amount}</p>
                  <p className="text-muted text-sm">{p.status}</p>
                </div>
              </div>
            ))}
          </div>
        )}
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
