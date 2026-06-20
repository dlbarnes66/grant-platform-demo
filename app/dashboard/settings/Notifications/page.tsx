"use client";

import { useEffect, useState } from "react";
import Card, { CardHeader, CardFooter } from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function NotificationSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [settings, setSettings] = useState({
    emailAlerts: true,
    jobCompleted: true,
    newRecommendations: true,
    savedSearchMatches: true,
  });

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/notification-settings");
      const data = await res.json();
      setSettings(data);
      setLoading(false);
    }
    load();
  }, []);

  async function save() {
    setSaving(true);
    await fetch("/api/notification-settings", {
      method: "PUT",
      body: JSON.stringify(settings),
    });
    setSaving(false);
    alert("Notification settings updated!");
  }

  if (loading) {
    return (
      <div className="p-6">
        <Card className="text-center py-10">
          <p className="text-gray-600">Loading notification settings…</p>
        </Card>
      </div>
    );
  }

  function toggle(key: keyof typeof settings) {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-brandBlue">Notification Settings</h1>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800">
            Email Notifications
          </h2>
        </CardHeader>

        <div className="space-y-6">
          {/* Master Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-800">Enable All Email Alerts</p>
              <p className="text-gray-500 text-sm">
                Turn on or off all email notifications.
              </p>
            </div>

            <input
              type="checkbox"
              checked={settings.emailAlerts}
              onChange={() => toggle("emailAlerts")}
              className="w-5 h-5 accent-brandBlue"
            />
          </div>

          {/* Job Completed */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-800">Job Completed Alerts</p>
              <p className="text-gray-500 text-sm">
                Receive an email when a search or comparison job finishes.
              </p>
            </div>

            <input
              type="checkbox"
              checked={settings.jobCompleted}
              onChange={() => toggle("jobCompleted")}
              className="w-5 h-5 accent-brandBlue"
            />
          </div>

          {/* New Recommendations */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-800">New Recommendations</p>
              <p className="text-gray-500 text-sm">
                Get notified when new grants match your profile.
              </p>
            </div>

            <input
              type="checkbox"
              checked={settings.newRecommendations}
              onChange={() => toggle("newRecommendations")}
              className="w-5 h-5 accent-brandBlue"
            />
          </div>

          {/* Saved Search Matches */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-800">Saved Search Matches</p>
              <p className="text-gray-500 text-sm">
                Receive alerts when new grants match your saved searches.
              </p>
            </div>

            <input
              type="checkbox"
              checked={settings.savedSearchMatches}
              onChange={() => toggle("savedSearchMatches")}
              className="w-5 h-5 accent-brandBlue"
            />
          </div>
        </div>

        <CardFooter className="mt-6">
          <Button fullWidth loading={saving} onClick={save}>
            Save Notification Settings
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
