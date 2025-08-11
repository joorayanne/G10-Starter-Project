import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";

interface ReviewerProps {
  success: boolean;
  data: {
    id: string;
    full_name: string;
    email: string;
    role: string;
    profile_picture_url: string | null;
  };
  message: string;
}

const RevieweeHeader: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [reviewersName, setReviewersName] = useState<ReviewerProps>({
    success: true,
    data: {
      id: "b1e4f95d-8309-4ded-a5f3-ed9da7caa55d",
      full_name: "Full Name",
      email: "valid@email.format",
      role: "applicant",
      profile_picture_url: null,
    },
    message: "Profile fetched successfully.",
  });

  const { data: session } = useSession();

  useEffect(() => {
    const fetchReviewerInfo = async () => {
      if (!session) return; // Ensure session exists
      try {
        const res = await fetch(
          "https://a2sv-application-platform-backend-team10.onrender.com/profile/me",
          {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        );
        // You can handle the response here
        const data = await res.json();
        setReviewersName(data);
      } catch (err) {
        // Handle error
        console.error("Failed to load the revieweers data", err);
      }
    };
    fetchReviewerInfo();
  }, [session]);
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2 md:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image src="/image/logo.png"
          width={120}
          height={24} alt="A2SV Logo" className="h-7 w-auto" />
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
            {reviewersName.data.full_name}
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
