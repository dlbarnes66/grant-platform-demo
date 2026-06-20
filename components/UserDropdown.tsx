"use client";

import { UserButton, useUser } from "@clerk/nextjs";

export default function UserDropdown() {
  const { user } = useUser();

  return (
    <div className="flex items-center gap-3">
      {/* User Name (optional) */}
      {user && (
        <span className="hidden md:block text-gray-700 font-medium">
          {user.firstName || user.username || "User"}
        </span>
      )}

      {/* Clerk User Dropdown */}
      <UserButton
        appearance={{
          elements: {
            avatarBox: "w-10 h-10 border border-gray-300 shadow-sm",
            userButtonPopoverCard: "shadow-lg border rounded-lg",
            userButtonPopoverFooter: "hidden",
          },
        }}
        afterSignOutUrl="/sign-in"
      />
    </div>
  );
}
