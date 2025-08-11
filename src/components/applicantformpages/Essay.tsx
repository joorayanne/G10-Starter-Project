"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/common/NavBar";
import Footer from "@/components/common/footer";
import Logout from "@/components/common/Logout";

interface EssayData {
  essay_about_you: string;
  essay_why_a2sv: string;
  resume: FileList;
  country: string;
}

const Essay: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EssayData>();

  const onSubmit: SubmitHandler<EssayData> = async (essayData) => {
    if (status === "loading") return; // Prevent submission during session load

    try {
      if (status !== "authenticated" || !session?.accessToken) {
        console.log("Session status:", status, "Session:", session); // Debug session state
        throw new Error("Please log in to submit your application.");
      }

      const token = session.accessToken;
      const personalInfo = JSON.parse(localStorage.getItem("personalInfo") || "{}");
      const codingProfiles = JSON.parse(localStorage.getItem("codingProfiles") || "{}");
      const cycleId = localStorage.getItem("activeCycleId");

      if (!cycleId) {
        throw new Error("No active cycle selected. Please select a cycle.");
      }

      const formData = new FormData();
      formData.append("essay_about_you", essayData.essay_about_you);
      formData.append("essay_why_a2sv", essayData.essay_why_a2sv);
      if (essayData.resume && essayData.resume.length > 0) {
        formData.append("resume", essayData.resume[0]);
      }

      for (const [key, value] of Object.entries({ ...personalInfo, ...codingProfiles })) {
        if (value) formData.append(key, value as string);
      }

      formData.append("country", essayData.country);
      formData.append("cycle_id", cycleId);

      // Check for existing application
      const statusRes = await fetch(
        "https://a2sv-application-platform-backend-team10.onrender.com/applications/my-status/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        }
      );
      const statusData = await statusRes.json();
      if (statusRes.ok && statusData.success && statusData.data) {
        throw new Error("You have already submitted an application for this cycle.");
      }

      const response = await fetch(
        "https://a2sv-application-platform-backend-team10.onrender.com/applications/",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const contentType = response.headers.get("content-type");
      const rawText = await response.text();

      if (!response.ok) {
        console.error("Non-OK response body:", rawText);
        throw new Error(`Submission failed: ${response.status} - ${rawText}`);
      }

      if (!contentType?.includes("application/json")) {
        console.error("Expected JSON response but got:", rawText);
        throw new SyntaxError("Expected JSON response, received HTML instead.");
      }

      alert("Application submitted successfully!");
      localStorage.clear();
      router.push("/applicant-routes/application-success");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error submitting application:", error.message);
        if (error.message.includes("409") || error.message.includes("already submitted")) {
          alert(
            "You have already submitted an application for this cycle. Please contact support if you need to update it."
          );
        } else if (error.message.includes("401") || error.message.includes("log in")) {
          alert("Authentication error. Please log in again.");
          router.push("/signin?callbackUrl=/applicant-routes/essay"); // Redirect with callback
        } else {
          alert(`Submission failed. Please try again. Error: ${error.message}`);
        }
      } else {
        console.error("Unexpected error:", error);
        alert("Submission failed due to an unexpected error. Please try again.");
      }
    }
  };

  return (
    <div className="pb-40">
      <header className='flex justify-around bg-white shadow-gray-400'>
                <Image className='p-3' src="/images/logo.png" alt="A2SV" width={100} height={100} />
                <div className='flex justify-between gap-x-7 p-3'>
                    <p>Applicant</p>
                    <Link href='/applicant-routes/logout' className='px-2'>Logout</Link>
                </div>
            </header>
      <section className="bg-white shadow-md w-full max-w-2xl mx-auto my-10 p-6 rounded-lg mb-80">
        <h1 className="text-center font-bold text-2xl mb-6">Application Form</h1>
        <Image
          src="/images/Background2.png"
          alt="Background"
          className="my-4 mx-auto"
          width={600}
          height={100}
        />
        <div className="flex justify-around mb-6">
          <p className="text-blue-600">
            <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-400 rounded-full text-white mr-2">
              1
            </span>
            Personal Info
          </p>
          <p className="text-blue-600">
            <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-400 rounded-full text-white mr-2">
              2
            </span>
            Coding Profiles
          </p>
          <p>
            <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full text-white mr-2">
              3
            </span>
            Essay and Resume
          </p>
        </div>
        <hr className="border-gray-300 mb-6" />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <h2 className="text-xl font-semibold mb-4">Essay and Resume</h2>

          <div>
            <label htmlFor="essay_about_you" className="block text-gray-700 font-medium mb-1">
              Tell us about yourself
            </label>
            <textarea
              id="essay_about_you"
              rows={4}
              className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("essay_about_you", { required: "This field is required" })}
            />
            {errors.essay_about_you?.message && (
              <p className="text-red-500 text-sm mt-1">{errors.essay_about_you.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="essay_why_a2sv" className="block text-gray-700 font-medium mb-1">
              Why do you want to join us?
            </label>
            <textarea
              id="essay_why_a2sv"
              rows={4}
              className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("essay_why_a2sv", { required: "This field is required" })}
            />
            {errors.essay_why_a2sv?.message && (
              <p className="text-red-500 text-sm mt-1">{errors.essay_why_a2sv.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="country" className="block text-gray-700 font-medium mb-1">
              Country
            </label>
            <input
              type="text"
              id="country"
              className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("country", { required: "Country is required" })}
            />
            {errors.country?.message && (
              <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="resume" className="block text-gray-700 font-medium mb-1">
              Resume
            </label>
            <input
              type="file"
              id="resume"
              className="border border-gray-300 p-2 w-full rounded-md focus:outline-none"
              accept=".pdf,.doc,.docx"
              {...register("resume", { required: "Please upload your resume" })}
            />
            {errors.resume?.message && (
              <p className="text-red-500 text-sm mt-1">{errors.resume.message}</p>
            )}
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={() => router.back()}
              type="button"
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </section>

      <Footer />
    </div>
  );
};

export default Essay;