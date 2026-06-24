"use client";

import { ClerkProvider, useAuth, useClerk } from "@clerk/nextjs";
import { useEffect } from "react";

function IdleLogoutWrapper({ children }) {
  const { isSignedIn } = useAuth();   // ✅ FIXED
  const { signOut } = useClerk();

  useEffect(() => {
    if (!isSignedIn) return;

    let timeout;

    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        signOut({ redirectUrl: "/sign-in" });
      }, 4 * 60 * 60 * 1000); // 4 hours
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);
    window.addEventListener("scroll", resetTimer);

    resetTimer();

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("scroll", resetTimer);
    };
  }, [isSignedIn, signOut]);

  return <>{children}</>;
}

export function Providers({ children }) {
  return (
    <ClerkProvider>
      <IdleLogoutWrapper>{children}</IdleLogoutWrapper>
    </ClerkProvider>
  );
}
