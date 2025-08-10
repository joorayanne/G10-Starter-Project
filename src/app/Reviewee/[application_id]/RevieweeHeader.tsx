import React, { useState } from "react";
import Link from "next/link";

const RevieweeHeader: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2 md:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/image/logo.png" alt="A2SV Logo" className="h-7 w-auto" />
        </div>
        {/* Hamburger Icon (Mobile) */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 focus:outline-none"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span
            className={`block w-6 h-0.5 bg-gray-700 mb-1 transition-all ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-gray-700 mb-1 transition-all ${
              menuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-gray-700 transition-all ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>
        {/* Navigation & Profile */}
        <nav
          className={`flex-col md:flex-row md:flex items-start md:items-center gap-2 md:gap-6 absolute   md:static top-24 w-full md:w-auto bg-white md:bg-transparent shadow md:shadow-none z-20 transition-all duration-200 ${
            menuOpen ? "flex" : "hidden"
          } md:flex`}
        >
          <Link
            href="#"
            className="text-xs text-indigo-600 hover:underline block md:inline"
          >
            Your Profile
          </Link>
          <span className="text-xs text-gray-700 block md:inline">
            Jane Reviewer
          </span>
          <button className="text-xs text-gray-500 hover:text-red-500 transition block md:inline">
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default RevieweeHeader;
