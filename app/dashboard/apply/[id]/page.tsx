"use client";

import { useState, useEffect } from "react";
import Card, { CardHeader, CardFooter } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function SubmitApplicationPage({ params }: any) {
  const [grant, setGrant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    orgName: "",
    contact: "",
    summary: "",
  });

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/grants/${params.id}`);
      const data = await res.json();
      setGrant(data);
      setLoading(false);
    }
    load();
  }, [params.id]);

  async function submit() {
    await fetch("/api/applications", {
      method: "POST",
      body: JSON.stringify({
        grantId: params.id,
        ...form,
      }),
    });
    alert("Application submitted!");
  }

  if (loading) {
    return (
      <div className="p-6">
        <Card className="text-center py-10">
          <p className="text-gray-600">Loading grant…</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-brandBlue">
        Apply for {grant.title}
      </h1>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800">
            Application Form
          </h2>
        </CardHeader>

        <div className="space-y-4">
          <Input
            label="Organization Name"
            value={form.orgName}
            onChange={(e) => setForm({ ...form, orgName: e.target.value })}
          />

          <Input
            label="Contact Email"
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
          />

          <div>
            <label className="text-sm font-medium text-gray-700">
              Project Summary
            </label>
            <textarea
              className="w-full mt-1 p-3 border rounded-lg focus:ring-brandBlue/40 focus:border-brandBlue"
              rows={6}
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
            />
          </div>
        </div>

        <CardFooter className="mt-6">
          <Button fullWidth onClick={submit}>
            Submit Application
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
