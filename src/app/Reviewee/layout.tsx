'use client';
import React from "react";
import Footer from "@/components/common/footer";
import RevieweeHeader from "./RevieweeHeader";

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <RevieweeHeader/>
       <main className="min-h-screen md:px-16 px-6 py-8 ">{children}</main>
      <Footer />
    </div>
  );
}
