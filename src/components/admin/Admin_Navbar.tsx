"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "../../../public/images/logo.png";
const navLinks = [
  { name: "Dashboard", href: "/admin" },
  { name: "Users", href: "/admin/users" },
  { name: "Cycles", href: "/admin/Cycles" },
  { name: "Analytics", href: "/admin/analytics" },
];

export default function AdminNavbar() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-around w-full px-8 py-4 bg-white border-b border-gray-200">
      {/* Logo */}
      <Link href="/admin" className="flex items-center space-x-2">
        <Image src='/images/logo.png' width={120} height={24} alt="A2SV Logo" />
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center space-x-6">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`text-sm font-medium ${
              pathname === link.href
                ? "text-black border-b-2 border-black pb-1"
                : "text-gray-600 hover:text-black"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Profile Menu */}
      <div className="flex items-center space-x-4 text-sm text-gray-700">
        <Link href="/profile" className="hover:underline text-indigo-600">
          Your Profile
        </Link>
        <span className="text-gray-400">|</span>
        <Link href="/logout" className="hover:underline text-gray-700">
          Logout
        </Link>
      </div>
    </nav>
  );
}
