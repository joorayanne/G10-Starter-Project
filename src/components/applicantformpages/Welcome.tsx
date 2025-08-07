"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Cycle } from "@/types/cycle";

interface ApplicationStatus {
  id: string;
  status: string;
  school: string;
  country: string;
  degree: string;
  submitted_at: string;
}

interface ApiResponse {
  success: boolean;
  data: ApplicationStatus | null;
  message: string;
}

interface CycleListResponse {
  success: boolean;
  data: Cycle[];
  message: string;
}

const Welcome = () => {
  const router = useRouter();
  const [activeCycle, setActiveCycle] = useState<Cycle | null>(null);
  const [applicationStatus, setApplicationStatus] = useState<ApplicationStatus | null>(null);
  const [noApplicationMessage, setNoApplicationMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchActiveCycle = async () => {
      const cycleId = localStorage.getItem("activeCycleId");
      console.log("Fetched cycleId from localStorage:", cycleId);
      if (cycleId) {
        try {
          const token = localStorage.getItem("token");
          const res = await fetch(
            `https://a2sv-application-platform-backend-team10.onrender.com/cycles/${cycleId}/`,
            {
              cache: "no-store",
              headers: token ? { Authorization: `Bearer ${token}` } : {},
            }
          );
          console.log("Fetch response status (cycle):", res.status);
          if (!res.ok) {
            const errorText = await res.text();
            console.error("Cycle fetch error details:", errorText);
            throw new Error(`HTTP error! status: ${res.status} - ${errorText}`);
          }
          const data = await res.json();
          console.log("Fetch response data (cycle):", JSON.stringify(data, null, 2));
          if (data.success && data.data) {
            setActiveCycle(data.data);
          } else {
            console.log("No valid cycle data:", data.message);
            // Try to set a default active cycle if the current one fails
            await setDefaultActiveCycle();
          }
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error("Fetch error (cycle):", error.message);
          } else {
            console.error("Unexpected error (cycle):", error);
          }
          // Fallback to default active cycle on error
          await setDefaultActiveCycle();
        }
      } else {
        console.log("No cycleId found in localStorage, setting default...");
        await setDefaultActiveCycle();
      }
    };

    const fetchApplicationStatus = async () => {
      const token = localStorage.getItem("token");
      console.log("Fetched token from localStorage:", token);
      if (token) {
        try {
          const res = await fetch(
            "https://a2sv-application-platform-backend-team10.onrender.com/applications/my-status/",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              cache: "no-store",
            }
          );
          console.log("Fetch response status (status):", res.status);
          if (!res.ok) {
            const errorText = await res.text();
            console.error("Status fetch error details:", errorText);
            if (res.status === 404) {
              console.log("No application status found, defaulting to 0% complete");
              setNoApplicationMessage("No application submitted yet.");
            }
            throw new Error(`HTTP error! status: ${res.status} - ${errorText}`);
          }
          const data: ApiResponse = await res.json();
          console.log("Fetch response data (status):", data);
          if (data.success && data.data) {
            setApplicationStatus(data.data);
            setNoApplicationMessage(null);
          } else {
            console.log("No valid application status:", data.message);
            setApplicationStatus(null);
            setNoApplicationMessage("Application data unavailable.");
          }
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error("Fetch error (status):", error.message);
          } else {
            console.error("Unexpected error (status):", error);
          }
          setApplicationStatus(null);
          setNoApplicationMessage("Failed to fetch application status.");
        }
      } else {
        console.log("No token found in localStorage");
        setApplicationStatus(null);
        setNoApplicationMessage("Please log in to view your status.");
      }
    };

    const setDefaultActiveCycle = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(
          "https://a2sv-application-platform-backend-team10.onrender.com/cycles/", // Adjust endpoint if needed
          {
            cache: "no-store",
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );
        console.log("Fetch response status (cycle list):", res.status);
        if (!res.ok) {
          const errorText = await res.text();
          console.error("Cycle list fetch error details:", errorText);
          throw new Error(`HTTP error! status: ${res.status} - ${errorText}`);
        }
        const data: CycleListResponse = await res.json();
        console.log("Fetch response data (cycle list):", JSON.stringify(data, null, 2));
        if (data.success && data.data && data.data.length > 0) {
          const activeCycle = data.data.find((cycle) => cycle.is_active);
          if (activeCycle) {
            localStorage.setItem("activeCycleId", activeCycle.id.toString());
            console.log("Default active cycle set:", activeCycle.id);
            // Re-fetch the active cycle with the new ID
            const cycleRes = await fetch(
              `https://a2sv-application-platform-backend-team10.onrender.com/cycles/${activeCycle.id}/`,
              {
                cache: "no-store",
                headers: token ? { Authorization: `Bearer ${token}` } : {},
              }
            );
            if (cycleRes.ok) {
              const cycleData = await cycleRes.json();
              if (cycleData.success && cycleData.data) {
                setActiveCycle(cycleData.data);
              }
            }
          } else {
            console.log("No active cycle found in the list");
          }
        } else {
          console.log("No cycle data available:", data.message);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Fetch error (cycle list):", error.message);
        } else {
          console.error("Unexpected error (cycle list):", error);
        }
      }
    };

    fetchActiveCycle();
    fetchApplicationStatus();
  }, []);

  // Calculate completion percentage based on status
  const getCompletionPercentage = (status: string | undefined) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return 100;
      case "interview":
        return 75;
      case "under review":
        return 50;
      case "applied":
        return 25;
      default:
        return 0;
    }
  };

  const completionPercentage = applicationStatus
    ? getCompletionPercentage(applicationStatus.status)
    : 0;

  return (
    <>
      <header className="flex justify-around bg-white shadow-gray-400">
        <div className="flex justify-between gap-x-36">
          <Image
            className="p-3"
            src="/images/logo.png"
            alt="A2SV"
            width={100}
            height={100}
          />
          <Link href="/" className="pt-4">
            Dashboard
          </Link>
        </div>

        <div className="flex justify-between p-3">
          <Link href="/" className="px-2">
            Your Profile
          </Link>
          <Link href="/" className="px-2">
            Applicant Name
          </Link>
          <Link href="/" className="px-2">
            Logout
          </Link>
        </div>
      </header>

      <section className="mx-20 my-6">
        <h1 className="text-4xl font-bold">Welcome John!</h1>
        <p className="font-extralight">Your journey to global tech career starts now</p>
      </section>

      <section className="mx-20 my-6">
        <div className="flex gap-x-40">
          <div className="w-3/5 bg-[linear-gradient(to_right,_#7455EF,_#893EEC)] rounded-lg h-48">
            {activeCycle ? (
              <>
                <h1 className="text-white text-2xl font-extrabold ml-5 mt-5 mb-2">
                  {activeCycle.name}
                </h1>
                <p className="text-white font-light ml-5">
                  It&apos;s time to submit your application and show us your
                  potential.
                </p>
                <button
                  onClick={() =>
                    router.push(
                      `/applicant-routes/personal-info?cycleId=${activeCycle.id}`
                    )
                  }
                  className="bg-white w-40 h-8 rounded-lg ml-5 text-purple-600 font-bold mt-10"
                >
                  Start Application
                </button>
              </>
            ) : (
              <p className="text-white ml-5 mt-5 flex items-center justify-center">
                No active cycle selected. Please select one from the Cycles
                page.
              </p>
            )}
          </div>

          <div className="flex-col">
            <div className="bg-white shadow-neutral-600 rounded-md w-72 mb-3 h-34">
              <h2 className="ml-5 mt-5 mb-3 font-bold">Complete Your Profile</h2>
              <p
                className="bg-blue-200 rounded-lg w-32 text-blue-600 font-bold ml-5 mb-2 relative"
                style={{ padding: "2px 4px" }}
              >
                {completionPercentage}% COMPLETE
                {noApplicationMessage && (
                  <span className="absolute top-full left-0 text-xs text-red-500 bg-white p-1 rounded">
                    {noApplicationMessage}
                  </span>
                )}
              </p>
              <Link href="/" className="text-blue-400 font-bold ml-5 mt-7">
                Go to Profile
              </Link>
            </div>

            <div className="bg-white shadow-neutral-600 rounded-md w-72">
              <h2 className="font-bold ml-7 mt-5">Application CheckList</h2>
              <ul className="ml-7 font-extralight">
                <li className="flex m-3">
                  <Image
                    width={10}
                    height={10}
                    src="/images/Vector.png"
                    alt="check"
                    className="size-4.5 mt-1 mr-1"
                  />{" "}
                  Create an account
                </li>
                <li className="flex m-3">
                  <Image
                    width={10}
                    height={10}
                    src="/images/Vector.png"
                    alt="check"
                    className="size-4.5 mt-1 mr-1"
                  />{" "}
                  Fill personal information
                </li>
                <li className="flex m-3">
                  <Image
                    width={10}
                    height={10}
                    src="/images/Vector.png"
                    alt="check"
                    className="size-4.5 mt-1 mr-1"
                  />{" "}
                  Submit coding profile
                </li>
                <li className="flex m-3">
                  <Image
                    width={10}
                    height={10}
                    src="/images/Vector.png"
                    alt="check"
                    className="size-4.5 mt-1 mr-1"
                  />{" "}
                  Write Essays
                </li>
                <li className="flex m-3">
                  <Image
                    width={10}
                    height={10}
                    src="/images/Vector.png"
                    alt="check"
                    className="size-4.5 mt-1 mr-1"
                  />{" "}
                  Upload Resume
                </li>
              </ul>
            </div>

            <div className="bg-white shadow-neutral-600 rounded-md w-72">
              <h2 className="font-bold ml-7 mt-5 mb-2">Helpful Resources</h2>
              <p className="text-purple-500 ml-7 mb-2">Tips for a Great Application</p>
              <p className="text-purple-500 ml-7">A2SV Problem Solving Guide</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
  export default Welcome;