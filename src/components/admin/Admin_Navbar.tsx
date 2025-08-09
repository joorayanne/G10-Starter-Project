"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from '../../../public/images/logo.png'
import { useProfile } from "@/contexts/ProfileContext";
import { FaBars, FaTimes } from "react-icons/fa";


const navLinks = [
  { name: "Dashboard", href: "/admin" },
  { name: "Users", href: "/admin/users" },
  { name: "Cycles", href: "/admin/cycles" },
  { name: "Analytics", href: "/admin/analytics" },
];

interface NavbarProps {
  currentPage?: string; // Optional prop to override the active page
}

export default function AdminNavbar({ currentPage }: NavbarProps) {
  const pathname = usePathname();

  const { profileData } = useProfile();
  const [menuOpen, setMenuOpen] = useState(false);


  return (

    <nav className="w-full bg-white border-b border-gray-200 px-4 md:px-10 py-2">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/admin" className="flex items-center space-x-2">
          <Image src={logo} width={120} height={24} alt="A2SV Logo" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-7">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-[16px] font-medium ${
                pathname === link.href
                  ? "text-black underline underline-offset-8"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>


        {/* Desktop Profile Menu */}
        <div className="hidden md:flex items-center space-x-4 text-[16px] text-gray-700">
          <Link
            href="/profile"
            className="hover:underline text-indigo-600"

          >
            Your Profile
          </Link>
          <span className="text-gray-400">|</span>
          <Link href="/logout" className="hover:underline text-gray-700">
            Logout
          </Link>
        </div>
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-gray-700"
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>


      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="flex flex-col mt-3 space-y-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-[16px] font-medium ${
                pathname === link.href
                  ? "text-black underline underline-offset-8"
                  : "text-gray-600 hover:text-black"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
            <Link
              href="/profile"
              className="hover:underline text-indigo-600"
              onClick={() => setMenuOpen(false)}
            >
              Your Profile
            </Link>
            <Link
              href="/logout"
              className="hover:underline text-gray-700"
              onClick={() => setMenuOpen(false)}
            >
              Logout
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
