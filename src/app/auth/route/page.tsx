
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


function LoadingRedirect() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
      <h1 className="text-xl font-semibold text-gray-700">
        Authenticating...
      </h1>
      <p className="text-gray-500">Please wait while we direct you.</p>
    </div>
  );
}

export default function AuthRouterPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    
    if (status === "authenticated") {
      const userRole = session.user?.role;

      const roleToPathMap: Record<string, string> = {
        admin: "/admin",
        manager: "/Manager-side",
        applicant: "/applicant-routes/welcome", 
        reviewer: "/Reviewee",
      };

      const destination = userRole ? roleToPathMap[userRole] : null;

      if (destination) {
        
        router.replace(destination);
      } else {
        router.replace("/");
      }
    }
    
    else if (status === "unauthenticated") {
        router.replace("/signin");
    }
  }, [status, session, router]);

  return <LoadingRedirect />;
}