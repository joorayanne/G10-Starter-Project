"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAccessToken } from "@/app/auth/authHelpers";
import logo from "../../../public/images/logo.png"

type Manager = {
  full_name: string;
};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  // const [manager, setManager] = useState<Manager | null>(null);

  // useEffect(() => {
  //   const token = getAccessToken();
  //   if (!token) return;

    
  //   const fetchManager = async () => {
  //     try {
  //       const res = await fetch(
  //         "https://a2sv-application-platform-backend-team10.onrender.com/manager/profile",
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //         }
  //       );

  //       const json = await res.json();
  //       if (json.success) {
  //         setManager(json.data);
  //       }
  //     } catch (err) {
  //       console.error("Error fetching manager profile:", err);
  //     }
  //   };

  //   fetchManager();
  // }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    router.push("/auth/signin");
  };

  const isDashboard = pathname === "/Manager-side";

  return (
    <nav className="w-full py-2  flex items-center justify-evenly px-10 border border-gray-200 shadow-lg bg-[#F3F4F6]">
      
      <div className="h-10 w-auto flex items-center">
        <Image
          src={logo}
          alt="A2SV Logo"
          layout="intrinsic"
          width={120}
          height={24}
        />

        { !(isDashboard) && (
          <button
            className="flex items-center text-gray-700 hover:text-blue-500 ml-4 text-sm md:text-base"
            onClick={() => router.push("/Manager-side")}
          >
            ← Back to Dashboard
          </button>
        )}
      </div>

      
      <div className="flex items-center space-x-4 text-sm md:text-base">
{/*         
        { manager ? 
        <Link href="/profile" className="text-blue-500 hover:underline">
            {manager.full_name}
        </Link>: */}
        <Link href="/profile" className="text-blue-500 hover:underline">
            Your Profile
        </Link>
        
        
        <button
          onClick={handleLogout}
          className="text-gray-500 hover:text-red-500"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
