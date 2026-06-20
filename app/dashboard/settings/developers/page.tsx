"use client";

import { useState, useEffect } from "react";
import Card, { CardHeader } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import {
  CodeBracketIcon,
  BookOpenIcon,
  KeyIcon,
  ServerIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

export default function DeveloperDocsPage() {
  const [loading, setLoading] = useState(true);
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/api-keys/default");
      const data = await res.json();
      setApiKey(data.key || "");
      setLoading(false);
    }
    load();
  }, []);

  function copy(text: string) {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard");
  }

  if (loading) {
    return (
      <div className="p-6">
        <Card className="py-10 text-center">
          <p className="text-gray-600">Loading developer documentation…</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-10 max-w-4xl">
      <h1 className="text-2xl font-bold text-brandBlue">Developer Documentation</h1>

      {/* Overview */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <BookOpenIcon className="w-5 h-5 text-brandBlue" />
            Overview
          </h2>
        </CardHeader>

        <div className="p-4 space-y-4 text-gray-700">
          <p>
            Use the GrantForge API to search grants, fetch details, manage saved
            grants, and receive real‑time webhook notifications.
          </p>

          <p>
            All requests must include your API key in the{" "}
            <code className="bg-gray-100 px-2 py-1 rounded">Authorization</code>{" "}
            header.
          </p>
        </div>
      </Card>

      {/* Authentication */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <KeyIcon className="w-5 h-5 text-brandBlue" />
            Authentication
          </h2>
        </CardHeader>

        <div className="p-4 space-y-4">
          <p className="text-gray-700">Include your API key in every request:</p>

          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`Authorization: Bearer ${apiKey || "YOUR_API_KEY"}`}
          </pre>

          <Button variant="outline" onClick={() => copy(apiKey)}>
            Copy API Key
          </Button>
        </div>
      </Card>

      {/* Example Request */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <ServerIcon className="w-5 h-5 text-brandBlue" />
            Example Request
          </h2>
        </CardHeader>

        <div className="p-4 space-y-4">
          <p className="text-gray-700">Search for grants:</p>

          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`curl -X POST https://api.grantforge.com/v1/search \\
  -H "Authorization: Bearer ${apiKey || "YOUR_API_KEY"}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "small business funding"
  }'`}
          </pre>
        </div>
      </Card>

      {/* SDK */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <CodeBracketIcon className="w-5 h-5 text-brandBlue" />
            JavaScript / TypeScript SDK
          </h2>
        </CardHeader>

        <div className="p-4 space-y-4">
          <p className="text-gray-700">Install the SDK:</p>

          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
npm install grantforge
          </pre>

          <p className="text-gray-700">Usage:</p>

          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`import GrantForge from "grantforge";

const client = new GrantForge({
  apiKey: "${apiKey || "YOUR_API_KEY"}",
});

const results = await client.search("veteran-owned business");
console.log(results);`}
          </pre>
        </div>
      </Card>

      {/* Webhook Example */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800">
            Webhook Example
          </h2>
        </CardHeader>

        <div className="p-4 space-y-4">
          <p className="text-gray-700">Example webhook payload:</p>

          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`{
  "event": "grant.found",
  "timestamp": 1713459200,
  "data": {
    "id": "grant_123",
    "title": "Small Business Innovation Grant",
    "amount": "$50,000"
  }
}`}
          </pre>
        </div>
      </Card>

      {/* Error Codes */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800">
            Error Codes
          </h2>
        </CardHeader>

        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-700">401 — Invalid API Key</span>
            <Badge variant="danger">Auth</Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-700">429 — Rate Limit Exceeded</span>
            <Badge variant="warning">Throttle</Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-700">500 — Server Error</span>
            <Badge variant="danger">Server</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}
