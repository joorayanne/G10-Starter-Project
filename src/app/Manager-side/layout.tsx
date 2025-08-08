// app/Manager-side/layout.tsx
import React from "react";
import Navbar from "@/components/Manager/Manager-Nav";
import Footer from "@/components/common/footer";

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen md:px-16 px-6 py-8 ">{children}</main>
      <Footer />
    </>
  );
}
