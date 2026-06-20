"use client";

import { useEffect, useState } from "react";
import Card, { CardHeader, CardFooter } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function BillingSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [billing, setBilling] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/billing");
      const data = await res.json();
      setBilling(data);
      setLoading(false);
    }
    load();
  }, []);

  async function openPortal() {
    const res = await fetch("/api/billing/portal", { method: "POST" });
    const data = await res.json();
    window.location.href = data.url;
  }

  if (loading) {
    return (
      <div className="p-6">
        <Card className="text-center py-10">
          <p className="text-gray-600">Loading billing settings…</p>
        </Card>
      </div>
    );
  }

  const plan = billing?.plan || "Free";
  const status = billing?.status || "inactive";
  const payment = billing?.paymentMethod;

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-brandBlue">Billing Settings</h1>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800">
            Subscription
          </h2>
        </CardHeader>

        <div className="space-y-6">
          {/* Plan */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-800">Current Plan</p>
              <p className="text-gray-500 text-sm">
                {plan === "Free"
                  ? "You are using the free plan."
                  : `You are subscribed to the ${plan} plan.`}
              </p>
            </div>

            <Badge
              variant={
                status === "active"
                  ? "success"
                  : status === "past_due"
                  ? "warning"
                  : "danger"
              }
            >
              {status}
            </Badge>
          </div>

          {/* Payment Method */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-800">Payment Method</p>
              <p className="text-gray-500 text-sm">
                {payment
                  ? `${payment.brand.toUpperCase()} •••• ${payment.last4}`
                  : "No payment method on file"}
              </p>
            </div>
          </div>

          {/* Usage (optional) */}
          {billing?.usage && (
            <div>
              <p className="font-medium text-gray-800">Usage</p>
              <p className="text-gray-500 text-sm">
                {billing.usage.used} / {billing.usage.limit} searches this month
              </p>
            </div>
          )}
        </div>

        <CardFooter className="mt-6">
          <Button fullWidth onClick={openPortal}>
            Manage Billing
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
