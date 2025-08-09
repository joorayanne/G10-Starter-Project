"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
interface Props {
children: React.ReactNode;
}
// This is a client component that wraps your app with the SessionProvider
export default function Providers({ children }: Props) {
return <SessionProvider>{children}</SessionProvider>;
}