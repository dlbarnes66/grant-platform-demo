"use client";

import { useEffect, useState } from "react";
import Card, { CardHeader, CardFooter } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  ClockIcon,
  DocumentArrowUpIcon,
  DocumentArrowDownIcon,
} from "@heroicons/react/24/outline";

export default function DataExportImportPage() {
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [importing, setImporting] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/data/history");
      const data = await res.json();
      setHistory(data);
      setLoading(false);
    }
    load();
  }, []);

  async function exportData() {
    setExporting(true);
    const res = await fetch("/api/data/export", { method: "POST" });
    const blob = await res.blob();

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "grantforge-export.json";
    a.click();

    setExporting(false);
  }

  async function handleImport() {
    if (!file) return;

    setImporting(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/data/import", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setImporting(false);

    if (data.success) {
      alert("Import completed successfully!");
      setPreview(null);
      setFile(null);
    } else {
      alert("Import failed: " + data.error);
    }
  }

  async function previewFile(f: File) {
    const text = await f.text();
    try {
      const json = JSON.parse(text);
      setPreview(json);
    } catch {
      setPreview({ error: "Invalid JSON file" });
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <Card className="py-10 text-center">
          <p className="text-gray-600">Loading data tools…</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-10 max-w-4xl">
      <h1 className="text-2xl font-bold text-brandBlue">
        Data Export & Import
      </h1>

      {/* EXPORT */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <ArrowDownTrayIcon className="w-5 h-5 text-brandBlue" />
            Export Your Data
          </h2>
        </CardHeader>

        <div className="p-4 space-y-4">
          <p className="text-gray-700">
            Download a complete export of your account data, including saved
            grants, searches, preferences, and settings.
          </p>

          <Button
            fullWidth
            loading={exporting}
            onClick={exportData}
            className="flex items-center gap-2"
          >
            <DocumentArrowDownIcon className="w-4 h-4" />
            Download Export File
          </Button>
        </div>
      </Card>

      {/* EXPORT HISTORY */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <ClockIcon className="w-5 h-5 text-brandBlue" />
            Export History
          </h2>
        </CardHeader>

        <div className="divide-y">
          {history.length === 0 && (
            <p className="text-gray-500 p-4">No exports yet.</p>
          )}

          {history.map((item) => (
            <div
              key={item.id}
              className="p-4 flex items-center justify-between"
            >
              <div>
                <p className="font-medium text-gray-800">
                  Export #{item.id}
                </p>
                <p className="text-gray-500 text-sm">
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>

              <Badge variant="info">JSON</Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* IMPORT */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <ArrowUpTrayIcon className="w-5 h-5 text-brandBlue" />
            Import Configuration
          </h2>
        </CardHeader>

        <div className="p-4 space-y-6">
          <input
            type="file"
            accept="application/json"
            onChange={(e) => {
              const f = e.target.files?.[0] || null;
              setFile(f);
              if (f) previewFile(f);
            }}
            className="w-full border rounded-lg p-2"
          />

          {preview && (
            <div className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
              <pre className="text-gray-700">
                {JSON.stringify(preview, null, 2)}
              </pre>
            </div>
          )}

          <Button
            fullWidth
            loading={importing}
            onClick={handleImport}
            disabled={!file}
            className="flex items-center gap-2"
          >
            <DocumentArrowUpIcon className="w-4 h-4" />
            Import Data
          </Button>
        </div>
      </Card>
    </div>
  );
}

