"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BillingUpgradePage() {
  const [loading, setLoading] = useState(true);
  const [plans, setPlans] = useState<any[]>([]);
  const [current, setCurrent] = useState<string>("");

  const load = async () => {
    const res = await fetch("/api/billing/plans");
    const data = await res.json();

    setPlans(data.plans || []);
    setCurrent(data.current || "");
    setLoading(false);
  };

  const changePlan = async (planId: string) => {
    const res = await fetch("/api/billing/upgrade", {
      method: "POST",
      body: JSON.stringify({ planId }),
    });

    const data = await res.json();

    if (data.error) {
      alert(data.error);
      return;
    }

    if (data.url) {
      window.location.href = data.url; // Stripe Checkout or Billing Portal
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-muted text-lg py-20">
        Loading plans…
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Change Your Plan</h1>
        <p className="text-muted mt-2">
          Compare plans and choose the one that fits your needs.
        </p>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div key={plan.id} className="card flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{plan.name}</h2>
              <p className="text-muted mt-1">{plan.description}</p>

              <p className="text-4xl font-bold mt-6">
                ${plan.price}
                <span className="text-base text-muted">/mo</span>
              </p>

              <ul className="mt-6 space-y-2 text-gray-700">
                {plan.features.map((f: string, idx: number) => (
                  <li key={idx}>• {f}</li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              {plan.id === current ? (
                <button className="btn btn-secondary w-full" disabled>
                  Current Plan
                </button>
              ) : (
                <button
                  onClick={() => changePlan(plan.id)}
                  className="btn btn-primary w-full"
                >
                  Switch to {plan.name}
                </button>
              )}
            </div>
          </div>
        ))}
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
