import Link from "next/link";
import React from "react";
import Image from "next/image";

const NavBar = () => {
  return (
    <header className="w-full py-2 md:py-3 px-6 md:px-20 flex items-center justify-around bg-[#F3F4F6]">
      <div className="h-10 w-auto flex items-center">
        <Image
          src="/images/logo.png"
          alt="A2SV Logo"
          layout="intrinsic"
          width={120}
          height={24}
        />
      </div>

        
      <nav className="space-x-8">
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
    </header>
  );
};

export default NavBar;
