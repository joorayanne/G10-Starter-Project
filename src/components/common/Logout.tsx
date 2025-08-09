"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton({ className }: { className?: string }) {
  const handleLogout = async () => {
    await signOut({ redirect: false });
    window.location.href = "/";  
  };

  return (
    <button
      onClick={handleLogout}
      className={`hover:underline text-gray-700 ${className || ""}`}
    >
      Logout
    </button>
  );
}
