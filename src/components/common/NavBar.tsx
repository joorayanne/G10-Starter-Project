import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Effect to handle clicks outside of the menu to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    // Add ref and z-index to the header
    <header
      ref={headerRef}
      className="relative z-50 w-full bg-[#F3F4F6] px-6 py-2 md:px-20 md:py-3"
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="h-10 w-auto">
          <Image
            src="/images/logo.png"
            alt="A2SV Logo"
            width={120}
            height={24}
            priority // Helps with LCP
          />
        </Link>

        {/* Hamburger Button - visible only on mobile */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            className="focus:outline-none"
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop Navigation - hidden on mobile */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="#" className="text-gray-700 hover:text-black">
            The Journey
          </Link>
          <Link href="#" className="text-gray-700 hover:text-black">
            About
          </Link>
          <Link href="#" className="text-gray-700 hover:text-black">
            Testimonials
          </Link>
          <Link
            href="/signin"
            className="px-6 py-2 bg-[#4F46E5] text-white rounded-md hover:bg-[#4338CA] transition"
          >
            Login
          </Link>
        </nav>
      </div>

      {/* Mobile Menu - Conditionally rendered */}
      {isMenuOpen && (
        <nav className="md:hidden left-0 top-full flex w-full flex-col items-center space-y-4 bg-[#F3F4F6] py-4 shadow-md">
          <Link
            href="#"
            className="text-gray-700 hover:text-black"
            onClick={() => setIsMenuOpen(false)}
          >
            The Journey
          </Link>
          <Link
            href="#"
            className="text-gray-700 hover:text-black"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="#"
            className="text-gray-700 hover:text-black"
            onClick={() => setIsMenuOpen(false)}
          >
            Testimonials
          </Link>
          <Link
            href="/signin"
            className="px-6 py-2 bg-[#4F46E5] text-white rounded-md hover:bg-[#4338CA] transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Login
          </Link>
        </nav>
      )}
    </header>
  );
};

export default NavBar;
