"use client";

import { SessionProvider } from "next-auth/react";
import { ProfileProvider } from "@/contexts/ProfileContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ProfileProvider>{children}</ProfileProvider>
    </SessionProvider>
  );
}
