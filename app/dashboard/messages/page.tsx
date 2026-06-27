"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function MessagesPage() {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);

  const load = async () => {
    const res = await fetch("/api/messages");
    const data = await res.json();
    setMessages(data || []);
    setLoading(false);
  };

  const markRead = async (id: string) => {
    await fetch("/api/messages/read", {
      method: "POST",
      body: JSON.stringify({ id }),
    });

    load();
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-muted text-lg py-20">
        Loading messages…
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
          <p className="text-muted mt-2">
            View system messages, AI summaries, and important updates.
          </p>
        </div>
      </div>

      {/* Messages List */}
      <div className="card">
        <h2 className="section-title">Inbox</h2>

        {messages.length === 0 ? (
          <p className="text-muted mt-2">No messages yet.</p>
        ) : (
          <div className="mt-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start justify-between border-b pb-4 cursor-pointer ${
                  !msg.read ? "bg-blue-50" : ""
                }`}
                onClick={() => {
                  setSelected(msg);
                  if (!msg.read) markRead(msg.id);
                }}
              >
                <div>
                  <p className="font-semibold text-gray-900">{msg.title}</p>
                  <p className="text-gray-700 mt-1 line-clamp-1">
                    {msg.preview}
                  </p>
                  <p className="text-muted text-xs mt-1">{msg.timestamp}</p>
                </div>

                {!msg.read && (
                  <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
                    New
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-3xl max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900">
              {selected.title}
            </h2>

            <p className="text-muted mt-1 text-sm">{selected.timestamp}</p>

            <div className="mt-6 whitespace-pre-wrap text-gray-800">
              {selected.body}
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setSelected(null)}
                className="btn btn-secondary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-12 flex gap-4">
        <Link href="/dashboard" className="btn btn-success">
          Dashboard Home
        </Link>
      </div>
    </div>
  );
}
