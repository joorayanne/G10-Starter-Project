import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from '../../../public/images/logo.png';
import LogoutButton from "@/components/common/Logout";

const RevieweeHeader: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
   
      <div className="w-full py-2 md:py-3 px-6 md:px-20 flex items-center justify-around bg-[#F3F4F6] shadow-md">
        {/* Logo */}
        <div className="flex items-center ">
          <Image
            src={logo}
            alt="A2SV Logo"
            width={120}
            height={24}
            className="h-7 w-auto"
          />
        </div>
        {/* Hamburger Icon (Mobile) */}
        
        {/* <button
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
        </button> */}
        

        <nav
          className={`flex-col md:flex-row md:flex items-start md:items-center gap-2 md:gap-6 absolute   md:static top-16 w-full md:w-auto bg-white md:bg-transparent shadow md:shadow-none z-20 transition-all duration-200 ${
            menuOpen ? "flex" : "hidden"
          } md:flex`}
        >
          <Link
            href="/Reviewee"
            className=" font-medium text-[#222] border-b-2 border-indigo-400 pb-0.5 block md:inline"
          >
            Dashboard
          </Link>
          <Link
            href="#"
            className=" text-indigo-600 hover:underline block md:inline"
          >
            Your Profile
          </Link>
          <LogoutButton className="text-gray-700 block md:inline hover:underline"/>
        </nav>
        
      </div>
    
  );
};

export default RevieweeHeader;
