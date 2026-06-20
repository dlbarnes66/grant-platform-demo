"use client";

import { useState, useEffect } from "react";
import Card, { CardHeader, CardFooter } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import {
  LifebuoyIcon,
  MagnifyingGlassIcon,
  EnvelopeIcon,
  QuestionMarkCircleIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

export default function SupportCenterPage() {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/support/articles");
      const data = await res.json();
      setArticles(data);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = articles.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase())
  );

  async function sendMessage() {
    if (!message.trim()) return;

    setSending(true);
    await fetch("/api/support/contact", {
      method: "POST",
      body: JSON.stringify({ message }),
    });
    setSending(false);
    setMessage("");
    alert("Your message has been sent!");
  }

  if (loading) {
    return (
      <div className="p-6">
        <Card className="py-10 text-center">
          <p className="text-gray-600">Loading support center…</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-10 max-w-4xl">
      <h1 className="text-2xl font-bold text-brandBlue">Support Center</h1>

      {/* Search */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <MagnifyingGlassIcon className="w-5 h-5 text-brandBlue" />
            Search Help Articles
          </h2>
        </CardHeader>

        <div className="p-4">
          <Input
            placeholder="Search for help…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </Card>

      {/* Help Articles */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <QuestionMarkCircleIcon className="w-5 h-5 text-brandBlue" />
            Help Articles
          </h2>
        </CardHeader>

        <div className="divide-y">
          {filtered.length === 0 && (
            <p className="text-gray-500 p-4">No articles found.</p>
          )}

          {filtered.map((article) => (
            <div key={article.id} className="p-4 space-y-1">
              <p className="font-medium text-gray-800">{article.title}</p>
              <p className="text-gray-600 text-sm">{article.summary}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Contact Support */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <EnvelopeIcon className="w-5 h-5 text-brandBlue" />
            Contact Support
          </h2>
        </CardHeader>

        <div className="p-4 space-y-4">
          <textarea
            className="w-full border rounded-lg p-3 h-32 focus:ring-brandBlue/40 focus:border-brandBlue"
            placeholder="Describe your issue…"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <Button fullWidth loading={sending} onClick={sendMessage}>
            Send Message
          </Button>
        </div>
      </Card>

      {/* Live Chat Placeholder */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <ChatBubbleLeftRightIcon className="w-5 h-5 text-brandBlue" />
            Live Chat (Coming Soon)
          </h2>
        </CardHeader>

        <div className="p-4">
          <p className="text-gray-600">
            We’re working on adding real‑time chat support for faster help.
          </p>
        </div>
      </Card>
    </div>
  );
}
