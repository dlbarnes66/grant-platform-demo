"use client";

import { useEffect, useState } from "react";
import Card, { CardHeader, CardFooter } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Input from "@/components/ui/Input";
import {
  UserGroupIcon,
  UserMinusIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";

export default function TeamManagementPage() {
  const [loading, setLoading] = useState(true);
  const [team, setTeam] = useState<any[]>([]);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviting, setInviting] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/team");
      const data = await res.json();
      setTeam(data);
      setLoading(false);
    }
    load();
  }, []);

  async function invite() {
    if (!inviteEmail) return;
    setInviting(true);

    await fetch("/api/team/invite", {
      method: "POST",
      body: JSON.stringify({ email: inviteEmail }),
    });

    setInviteEmail("");
    setInviting(false);
    alert("Invite sent!");
  }

  async function removeMember(id: string) {
    await fetch(`/api/team/${id}`, { method: "DELETE" });
    setTeam((prev) => prev.filter((m) => m.id !== id));
  }

  if (loading) {
    return (
      <div className="p-6">
        <Card className="text-center py-10">
          <p className="text-gray-600">Loading team members…</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <h1 className="text-2xl font-bold text-brandBlue">Team Management</h1>

      {/* Invite Members */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <UserPlusIcon className="w-5 h-5 text-brandBlue" />
            Invite Team Member
          </h2>
        </CardHeader>

        <div className="space-y-4">
          <Input
            label="Email Address"
            placeholder="teammember@example.com"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
          />
        </div>

        <CardFooter className="mt-6">
          <Button fullWidth loading={inviting} onClick={invite}>
            Send Invite
          </Button>
        </CardFooter>
      </Card>

      {/* Team Members */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <UserGroupIcon className="w-5 h-5 text-brandBlue" />
            Team Members
          </h2>
        </CardHeader>

        <div className="space-y-4">
          {team.length === 0 && (
            <p className="text-gray-500">No team members yet.</p>
          )}

          {team.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between border p-4 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-800">{member.name}</p>
                <p className="text-gray-500 text-sm">{member.email}</p>
              </div>

              <div className="flex items-center gap-3">
                <Badge
                  variant={
                    member.role === "owner"
                      ? "danger"
                      : member.role === "admin"
                      ? "warning"
                      : "info"
                  }
                >
                  {member.role}
                </Badge>

                {member.role !== "owner" && (
                  <button
                    onClick={() => removeMember(member.id)}
                    className="text-red-600 hover:text-red-700 transition"
                  >
                    <UserMinusIcon className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
