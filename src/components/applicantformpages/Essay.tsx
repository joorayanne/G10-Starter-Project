"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

interface EssayData {
  essay_about_you: string;
  essay_why_a2sv: string;
  resume: FileList;
  country: string;
}

const Essay: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EssayData>();

  const onSubmit: SubmitHandler<EssayData> = async (essayData) => {
    try {
      const personalInfo = JSON.parse(localStorage.getItem("personalInfo") || "{}");
      const codingProfiles = JSON.parse(localStorage.getItem("codingProfiles") || "{}");
      const token = localStorage.getItem("token");
      const cycleId = localStorage.getItem("activeCycleId");

      if (!token) {
        throw new Error("No authentication token found. Please log in.");
      }
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
      router.push("/applicant-routes/application-sucess");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error submitting application:", error.message);
        if (error.message.includes("409") || error.message.includes("already submitted")) {
          alert("You have already submitted an application for this cycle. Please contact support if you need to update it.");
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
    <>
      <header className="flex justify-around bg-white shadow-gray-400">
        <Image
          className="p-3"
          src="/images/logo.png"
          alt="A2SV"
          width={100}
          height={100}
        />
        <div className="flex justify-between gap-x-7 p-3">
          <p>John Doe</p>
          <Link
            href="/"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("role");
            }}
            className="px-2"
          >
            Logout
          </Link>
        </div>
      </header>

      <section className="bg-white shadow-neutral-500 w-1/2 my-10 mx-64">
        <h1 className="text-center font-bold text-2xl">Application Form</h1>
        <Image
          src="/images/Background2.png"
          alt=""
          className="my-3 mx-3"
          width={600}
          height={100}
        />
        <div className="flex justify-evenly my-3">
          <p className="text-blue-600">
            <span className="inline-flex items-center justify-center bg-gray-400 w-5 h-5 rounded-full mt-1 text-white">
              1
            </span>{" "}
            Personal Info
          </p>
          <p className="text-blue-600">
            <span className="inline-flex items-center justify-center bg-gray-400 w-5 h-5 rounded-full mt-1 text-white">
              2
            </span>{" "}
            Coding Profiles
          </p>
          <p>
            <span className="inline-flex items-center justify-center bg-blue-600 w-5 h-5 rounded-full mt-1 text-white">
              3
            </span>{" "}
            Essay and Resume
          </p>
        </div>
        <hr className="text-gray-400 mt-5" />
        <form onSubmit={handleSubmit(onSubmit)} className="mx-5 mt-5">
          <h2 className="my-3">Essay and Resume</h2>

          <label htmlFor="essay_about_you">Tell us about yourself</label>
          <textarea
            id="essay_about_you"
            rows={4}
            className="border p-2 w-full my-3"
            {...register("essay_about_you", { required: "This field is required" })}
          />
          {errors.essay_about_you?.message && (
            <p className="text-red-500 text-sm">{errors.essay_about_you.message}</p>
          )}

          <label htmlFor="essay_why_a2sv">Why do you want to join us?</label>
          <textarea
            id="essay_why_a2sv"
            rows={4}
            className="border p-2 w-full my-3"
            {...register("essay_why_a2sv", { required: "This field is required" })}
          />
          {errors.essay_why_a2sv?.message && (
            <p className="text-red-500 text-sm">{errors.essay_why_a2sv.message}</p>
          )}

          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            className="border-b-1 w-full my-3"
            {...register("country", { required: "Country is required" })}
          />
          {errors.country?.message && (
            <p className="text-red-500 text-sm">{errors.country.message}</p>
          )}

          <label htmlFor="resume">Resume</label>
          <input
            type="file"
            id="resume"
            className="my-3"
            accept=".pdf,.doc,.docx"
            {...register("resume", { required: "Please upload your resume" })}
          />
          {errors.resume?.message && (
            <p className="text-red-500 text-sm">{errors.resume.message}</p>
          )}

          <div className="flex justify-between my-5 bg-gray-50 w-full h-14 rounded-sm border-t-1 border-t-gray-200 border-b-1 border-b-gray-200">
            <button
              onClick={() => router.back()}
              type="button"
              className="m-3 bg-gray-200 w-20 rounded-md h-8"
            >
              Back
            </button>
            <button type="submit" className="m-3 bg-blue-600 w-40 rounded-md text-white h-8">
              Submit
            </button>
          </div>
        </form>
      </section>

      <footer className="mt-40 bg-blue-950 h-36 flex items-center justify-center">
        <p className="text-white text-center my-5">2025 A2SV. All rights reserved</p>
      </footer>
    </>
  );
};

export default Essay;