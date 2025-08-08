"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Cycle } from "@/types/cycle";

interface ActiveCycleResponse {
  success: boolean;
  data: {
    cycles: Cycle[];
    total_count: number;
    page: number;
    limit: number;
  };
  message: string;
}

const Welcome = () => {
  const router = useRouter();
  const [activeCycle, setActiveCycle] = useState<Cycle | null>(null);

  useEffect(() => {
    const fetchAndSetActiveCycle = async () => {
      const token = localStorage.getItem("token");
      console.log("Token available:", !!token);

      try {
        // Fetch active cycles
        const res = await fetch(
          "https://a2sv-application-platform-backend-team10.onrender.com/cycles/active/",
          {
            cache: "no-store",
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );
        console.log("Fetch response status (active cycles):", res.status);
        if (!res.ok) {
          const errorText = await res.text();
          console.error("Active cycles fetch error details:", errorText);
          throw new Error(`HTTP error! status: ${res.status} - ${errorText}`);
        }
        const data: ActiveCycleResponse = await res.json();
        console.log("Fetch response data (active cycles):", JSON.stringify(data, null, 2));

        if (data.success && Array.isArray(data.data.cycles) && data.data.cycles.length > 0) {
          const activeCycleFromList = data.data.cycles[0]; // Use the first active cycle
          const cycleId = activeCycleFromList.id.toString();
          localStorage.setItem("activeCycleId", cycleId);
          console.log("Default active cycle set:", cycleId);

          // Fetch detailed cycle data
          const cycleRes = await fetch(
            `https://a2sv-application-platform-backend-team10.onrender.com/cycles/${activeCycleFromList.id}/`,
            {
              cache: "no-store",
              headers: token ? { Authorization: `Bearer ${token}` } : {},
            }
          );
          if (cycleRes.ok) {
            const cycleData = await cycleRes.json();
            console.log("Fetch response data (detailed cycle):", JSON.stringify(cycleData, null, 2));
            if (cycleData.success && cycleData.data) {
              setActiveCycle(cycleData.data);
            } else {
              console.log("No valid detailed cycle data:", cycleData.message);
            }
          } else {
            const errorText = await cycleRes.text();
            console.error("Detailed cycle fetch error:", errorText);
          }
        } else {
          console.log("No active cycles available:", data.message);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Fetch error (active cycles):", error.message);
        } else {
          console.error("Unexpected error (active cycles):", error);
        }
      }

      // Fallback to stored cycleId if no active cycle was set and it exists
      const savedCycleId = localStorage.getItem("activeCycleId");
      if (savedCycleId && !activeCycle) {
        console.log("Falling back to saved cycleId:", savedCycleId);
        try {
          const res = await fetch(
            `https://a2sv-application-platform-backend-team10.onrender.com/cycles/${savedCycleId}/`,
            {
              cache: "no-store",
              headers: token ? { Authorization: `Bearer ${token}` } : {},
            }
          );
          console.log("Fetch response status (saved cycle):", res.status);
          if (!res.ok) {
            const errorText = await res.text();
            console.error("Saved cycle fetch error details:", errorText);
            throw new Error(`HTTP error! status: ${res.status} - ${errorText}`);
          }
          const data = await res.json();
          console.log("Fetch response data (saved cycle):", JSON.stringify(data, null, 2));
          if (data.success && data.data) {
            setActiveCycle(data.data);
          }
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error("Fetch error (saved cycle):", error.message);
          } else {
            console.error("Unexpected error (saved cycle):", error);
          }
        }
      }
    };

    fetchAndSetActiveCycle();
  }, []);

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
                No active cycle available. Please contact an administrator to create or activate a
                cycle.
              </p>
            )}
          </div>

          <div className="flex-col">
            <div className="bg-white shadow-neutral-600 rounded-md w-72">
              <h2 className="font-bold ml-7 mt-5 mb-2">Complete Your Profile</h2>
              <p className="text-blue-600 font-bold rounded-full w-32 text-center bg-blue-300 ml-7 mb-2">75% Complete</p>
              <Image
                src="/images/Background1.png"
                alt="bar"
                width={250}
                height={300}
                className="mx-5"
              />
              <Link href="/profile" className="mx-10 text-blue-500 font-bold">Go to Profile</Link>
            </div>

            <div className="bg-white shadow-neutral-600 rounded-md w-72 mb-3 ">
              <h2 className="ml-5 mt-5 mb-3 font-bold">Application CheckList</h2>
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