"use client";
import { ProfileProvider } from "@/contexts/ProfileContext";
import { SessionProvider } from "next-auth/react";
import React from "react";
interface Props {
children: React.ReactNode;
}

export default function Providers({ children }: Props) {
return <SessionProvider> <ProfileProvider>{children}</ProfileProvider></SessionProvider>;
}