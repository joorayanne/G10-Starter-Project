"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Cycle } from "@/types/cycle";
import { useSession } from "next-auth/react";
import Footer from "@/components/common/footer";
import Logout from "@/components/common/Logout";
import { User } from "@/types/users";

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
  const { data: session } = useSession();
  const router = useRouter();
  const [activeCycle, setActiveCycle] = useState<Cycle | null>(null);

  // Safely cast the session user to your User interface
  const user = session?.user as User | undefined;
  const fullName = user?.full_name || "Applicant";

  useEffect(() => {
    let isMounted = true;

    const fetchAndSetActiveCycle = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch(
          "https://a2sv-application-platform-backend-team10.onrender.com/cycles/active/",
          {
            cache: "no-store",
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data: ActiveCycleResponse = await res.json();

        if (data.success && Array.isArray(data.data.cycles) && data.data.cycles.length > 0) {
          const activeCycleFromList = data.data.cycles[0];
          const cycleId = activeCycleFromList.id.toString();
          localStorage.setItem("activeCycleId", cycleId);

          const cycleRes = await fetch(
            `https://a2sv-application-platform-backend-team10.onrender.com/cycles/${activeCycleFromList.id}/`,
            {
              cache: "no-store",
              headers: token ? { Authorization: `Bearer ${token}` } : {},
            }
          );
          if (cycleRes.ok) {
            const cycleData = await cycleRes.json();
            if (cycleData.success && cycleData.data && isMounted) {
              setActiveCycle(cycleData.data);
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch active cycles or cycle details:", error);
      }
    };

    fetchAndSetActiveCycle();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className= "">
      <header className="flex justify-around bg-white shadow-gray-400  ">
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
          <Link href="/profile" className="px-2">
            Your Profile
          </Link>
          <Link href="/" className="px-2">
            {fullName}
          </Link>
          <Link href="/applicant-routes/logout" className="px-2">
            Logout
          </Link>
        </div>
      </header>

      <section className="mx-20 my-6 mb-10 ">
        <h1 className="text-4xl font-bold">Welcome {fullName}!</h1>
        <p className="font-extralight">Your journey to a global tech career starts now</p>
      </section>

      <section className="mx-20 my-6 mb-70">
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

            <div className="bg-white shadow-neutral-600 rounded-md w-72 mb-3">
              <h2 className="ml-5 mt-5 mb-3 font-bold">Application Checklist</h2>
              <ul className="ml-7 font-extralight">
                <li className="flex m-3">
                  <Image
                    width={10}
                    height={10}
                    src="/images/Vector.png"
                    alt="check"
                    className="size-4.5 mt-1 mr-1"
                  />
                  Create an account
                </li>
                <li className="flex m-3">
                  <Image
                    width={10}
                    height={10}
                    src="/images/Vector.png"
                    alt="check"
                    className="size-4.5 mt-1 mr-1"
                  />
                  Fill personal information
                </li>
                <li className="flex m-3">
                  <Image
                    width={10}
                    height={10}
                    src="/images/Vector.png"
                    alt="check"
                    className="size-4.5 mt-1 mr-1"
                  />
                  Submit coding profile
                </li>
                <li className="flex m-3">
                  <Image
                    width={10}
                    height={10}
                    src="/images/Vector.png"
                    alt="check"
                    className="size-4.5 mt-1 mr-1"
                  />
                  Write Essays
                </li>
                <li className="flex m-3">
                  <Image
                    width={10}
                    height={10}
                    src="/images/Vector.png"
                    alt="check"
                    className="size-4.5 mt-1 mr-1"
                  />
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

      <Footer />
    
    
    </div>
  );
};

export default Welcome;