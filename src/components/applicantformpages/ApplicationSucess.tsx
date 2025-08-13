import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/common/footer";
import { useSession } from "next-auth/react";
import { User } from "@/types/users";

interface ApplicationStatus {
  id: string;
  status: string;
  school: string;
  country: string;
  degree: string;
  submitted_at: string; // ISO 8601 format, e.g., "2025-08-07T11:33:24.309Z"
}

interface StatusResponse {
  success: boolean;
  data: ApplicationStatus | null;
  message: string;
}

const ApplicationSucess = () => {
  const { data: session } = useSession();
    const user = session?.user as User | undefined;
    const fullName = user?.full_name || "Applicant";
  const [submittedDate, setSubmittedDate] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplicationStatus = async () => {
      const token = localStorage.getItem("token");
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
          if (!res.ok) {
            const errorText = await res.text();
            console.error("Status fetch error details:", errorText);
            return;
          }
          const data: StatusResponse = await res.json();
          console.log("Fetched status data:", JSON.stringify(data, null, 2));
          if (data.success && data.data && data.data.submitted_at) {
            // Parse and format the ISO date to "MMMM DD, YYYY"
            const date = new Date(data.data.submitted_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            });
            setSubmittedDate(date);
          } else {
            console.log("No valid submission date found:", data.message);
            setSubmittedDate("Date not available");
          }
        } catch (error) {
          console.error("Error fetching application status:", error);
          setSubmittedDate("Date not available");
        }
      } else {
        console.log("No token found in localStorage");
        setSubmittedDate("Date not available");
      }
    };

    fetchApplicationStatus();
  }, []);

  return (
    <div >
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

      <section className="mx-20 my-6 mb-80">
        <h1 className="text-4xl font-bold">Your Application Progress</h1>
        <p className="font-extralight">You are on your way! Here is a summary of your application progress</p>
      </section>

      <section className="my-4 mx-20">
        <div className="flex justify-between gap-x-5">
          <div className="w-2/3 bg-white shadow-neutral-600 rounded-md h-3/5">
            <h2 className="font-bold mx-10 my-5 text-md">Application Timeline</h2>
            <div className="flex">
              <Image
                className="my-3 bg-green-600 rounded-full w-8 h-8 mx-5 mt-5"
                src="/images/Component 1.png"
                alt="check"
                height={10}
                width={10}
              />
              <div className="flex-col">
                <p className="mt-3 font-bold">Application Submitted</p>
                <p className="my-1 text-gray-400 text-sm">
                  {submittedDate}
                </p>
                <p className="my-1 text-gray-400 text-sm">
                  Your application has been successfully submitted. We are excited to learn more
                  about you!
                </p>
              </div>
            </div>

            <div className="flex">
              <Image
                className="my-3 bg-blue-600 rounded-full w-8 h-8 mx-5 mt-5"
                src="/images/Component 2.png"
                alt="check"
                height={7}
                width={7}
              />
              <div className="flex-col">
                <p className="mt-3 font-bold">Under Review</p>
                <p className="my-1 text-gray-400 text-sm">Current Stage</p>
                <p className="my-1 text-gray-400 text-sm">
                  Our team is currently reviewing your application. This may take a few days. Thank
                  you for your patience!
                </p>
              </div>
            </div>

            <div className="flex">
              <Image
                className="my-3 bg-gray-600 rounded-full w-8 h-8 mx-5 mt-5"
                src="/images/Component 4.png"
                alt="check"
                height={10}
                width={10}
              />
              <div className="flex-col">
                <p className="mt-5 font-bold text-gray-400">Interview Stage</p>
              </div>
            </div>

            <div className="flex">
              <Image
                className="my-3 bg-blue-600 rounded-full w-8 h-8 mx-5 mt-5"
                src="/images/Component 4.png"
                alt="check"
                height={10}
                width={10}
              />
              <div className="flex-col">
                <p className="mt-5 font-bold text-gray-400">Decision Made</p>
              </div>
            </div>
          </div>

          <div className="flex-col w-1/3">
            <div className="bg-white rounded-md mb-4 w-full">
              <h2 className="mx-10 py-3 font-bold">Recent Activity</h2>
              <div className="flex items-center mx-5">
                <Image
                  className="my-3 bg-blue-600 rounded-full w-6 h-5 mx-3"
                  src="/images/Component 5.png"
                  alt="check"
                  height={8}
                  width={8}
                />
                <div className="flex-col">
                  <p className="mt-1 text-gray-400 text-sm">Application Submitted</p>
                  <p className="my-1 text-gray-400 text-sm">{submittedDate}</p>
                </div>
              </div>

              <div className="flex items-center mx-5">
                <Image
                  className="my-3 bg-blue-100 rounded-full w-6 h-5 mx-3"
                  src="/images/Component 3.png"
                  alt="check"
                  height={8}
                  width={8}
                />
                <div className="flex-col">
                  <p className="mt-1 text-gray-400 text-sm">Interview Scheduled</p>
                  <p className="my-1 text-gray-400 text-sm">November 3, 2026</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-md mb-4 w-full">
              <h2 className="mx-10 py-3 font-bold">Important Updates</h2>
              <p className="text-gray-400 mx-10 mb-2">
                There are no new updates this time. We will notify by email when your application
                status changes.
              </p>
            </div>

            <div className="bg-[linear-gradient(to_right,_#7455EF,_#893EEC)] w-full text-white">
              <h2 className="mx-10 py-3 font-bold">Get Ready For The Interview!</h2>
              <p className="mx-10 mb-2 text-white font-extralight">
                While you wait it is a great time to prepare. Practice your problem solving skills
                on platforms like Leetcode and Codeforces.
              </p>
              <p className="mx-10 font-bold">Read our interview prep guide</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />

      {/* Optional: Add a footer component if needed */}
    </div>
  );
};

export default ApplicationSucess;