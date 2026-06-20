"use client";

import { useEffect, useState } from "react";
import Card, { CardHeader, CardFooter } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import {
  SwatchIcon,
  SunIcon,
  MoonIcon,
  PhotoIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";

export default function BrandingThemeSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    primaryColor: "#1D4ED8",
    secondaryColor: "#FACC15",
    logoUrl: "",
    faviconUrl: "",
    font: "Inter",
    darkMode: false,
  });

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/branding");
      const data = await res.json();
      setForm(data);
      setLoading(false);
    }
    load();
  }, []);

  async function save() {
    setSaving(true);
    await fetch("/api/branding", {
      method: "PUT",
      body: JSON.stringify(form),
    });
    setSaving(false);
    alert("Branding settings updated!");
  }

  if (loading) {
    return (
      <div className="p-6">
        <Card className="py-10 text-center">
          <p className="text-gray-600">Loading branding settings…</p>
        </Card>
      </div>
    );
  }

  const fonts = ["Inter", "Roboto", "Open Sans", "Poppins", "Montserrat"];

  return (
    <div className="p-6 space-y-10 max-w-4xl">
      <h1 className="text-2xl font-bold text-brandBlue">
        Branding & Theme Settings
      </h1>

      {/* Colors */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <SwatchIcon className="w-5 h-5 text-brandBlue" />
            Colors
          </h2>
        </CardHeader>

        <div className="p-4 grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Primary Color
            </label>
            <input
              type="color"
              className="w-full h-12 border rounded-lg cursor-pointer"
              value={form.primaryColor}
              onChange={(e) =>
                setForm({ ...form, primaryColor: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Secondary Color
            </label>
            <input
              type="color"
              className="w-full h-12 border rounded-lg cursor-pointer"
              value={form.secondaryColor}
              onChange={(e) =>
                setForm({ ...form, secondaryColor: e.target.value })
              }
            />
          </div>
        </div>
      </Card>

      {/* Logo & Favicon */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <PhotoIcon className="w-5 h-5 text-brandBlue" />
            Logo & Favicon
          </h2>
        </CardHeader>

        <div className="p-4 space-y-6">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <img
              src={form.logoUrl || "/default-logo.png"}
              alt="Logo"
              className="w-20 h-20 object-contain border rounded-lg bg-white"
            />

            <Input
              label="Logo URL"
              value={form.logoUrl}
              onChange={(e) => setForm({ ...form, logoUrl: e.target.value })}
            />
          </div>

          {/* Favicon */}
          <div className="flex items-center gap-4">
            <img
              src={form.faviconUrl || "/default-favicon.png"}
              alt="Favicon"
              className="w-12 h-12 object-contain border rounded-lg bg-white"
            />

            <Input
              label="Favicon URL"
              value={form.faviconUrl}
              onChange={(e) => setForm({ ...form, faviconUrl: e.target.value })}
            />
          </div>
        </div>
      </Card>

      {/* Typography */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <AdjustmentsHorizontalIcon className="w-5 h-5 text-brandBlue" />
            Typography
          </h2>
        </CardHeader>

        <div className="p-4">
          <label className="text-sm font-medium text-gray-700">
            Font Family
          </label>

          <select
            className="mt-2 w-full border rounded-lg p-2 focus:ring-brandBlue/40 focus:border-brandBlue"
            value={form.font}
            onChange={(e) => setForm({ ...form, font: e.target.value })}
          >
            {fonts.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* Theme Mode */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            {form.darkMode ? (
              <MoonIcon className="w-5 h-5 text-brandBlue" />
            ) : (
              <SunIcon className="w-5 h-5 text-brandBlue" />
            )}
            Theme Mode
          </h2>
        </CardHeader>

        <div className="p-4 flex items-center justify-between">
          <p className="text-gray-700">
            Switch between light and dark mode for your dashboard.
          </p>

          <input
            type="checkbox"
            checked={form.darkMode}
            onChange={() => setForm({ ...form, darkMode: !form.darkMode })}
            className="w-5 h-5 accent-brandBlue"
          />
        </div>
      </Card>

      {/* Save */}
      <Card>
        <CardFooter>
          <Button fullWidth loading={saving} onClick={save}>
            Save Branding Settings
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
