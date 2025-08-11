// app/auth/route/page.tsx

"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// A simple loading component to show while redirecting.
// This prevents any layout shift or content flash.
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
    // We only want to run this logic when the session has been confirmed.
    if (status === "authenticated") {
      const userRole = session.user?.role;

      const roleToPathMap: Record<string, string> = {
        admin: "/admin",
        manager: "/Manager-side",
        applicant: "/applicant-routes/welcome", // An example dashboard path
        reviewer: "/Reviewee",
      };

      const destination = userRole ? roleToPathMap[userRole] : null;

      if (destination) {
        // Use router.replace() to redirect. This prevents the user from
        // clicking the "back" button and returning to this routing page.
        router.replace(destination);
      } else {
        // If the user has a role not in our map or no role,
        // send them to the homepage as a fallback.
        router.replace("/");
      }
    }
    // If the status is 'unauthenticated' after loading, something went wrong.
    // Send them back to the sign-in page.
    else if (status === "unauthenticated") {
        router.replace("/signin");
    }
  }, [status, session, router]);

  // Render the loading component until the useEffect hook redirects the user.
  return <LoadingRedirect />;
}