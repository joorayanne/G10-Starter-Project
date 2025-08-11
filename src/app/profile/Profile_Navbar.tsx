"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import logo from '../../../public/images/logo.png'

const navLinks = [{ name: "Dashboard", href: "#" }];

export default function ProfileNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <nav className="flex items-center justify-between w-full px-4 sm:px-8 py-4 bg-white border-b border-gray-200">
      <Link href="/profile" className="flex items-center space-x-2">
        <Image
          src={logo}
          width={120}
          height={24}
          className="sm:w-[120px] sm:h-[24px]"
          alt="A2SV Logo"
        />
      </Link>

      <div className="hidden sm:flex items-center space-x-6">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={(e) => {
              e.preventDefault();
              router.back();
            }}
            className={`text-sm font-medium ${
              pathname === "/dashboard" 
                ? "text-black border-b-2 border-black pb-1"
                : "text-gray-600 hover:text-black"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-gray-700">
        <Link href="/profile" className="hover:underline text-indigo-600 hidden sm:inline">
          Your Profile
        </Link>
        <span className="text-gray-400 hidden sm:inline">|</span>
        <span className="truncate max-w-[80px] sm:max-w-none">
          {status === "authenticated" ? session?.user?.name || "User" : "User"}
        </span>
        <span className="text-gray-400 hidden sm:inline">|</span>
        <button
          onClick={() => signOut({ callbackUrl: "/signin" })}
          className="hover:underline text-gray-700"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
