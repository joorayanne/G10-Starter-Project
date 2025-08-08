"use client";

import { useEffect, useState } from "react";
import EvaluatedInfo from "./EvaluatedInfo";
import { z } from "zod";
import { useParams } from "next/navigation";
import Link from "next/link";

interface applicantProps {
  applicant_name: string;
  codeforces_handle: string;
  country: string;
  degree: string;
  essay_about_you: string;
  essay_why_a2sv: string;
  id: string;
  leetcode_handle: string;
  resume_url: string | File;
  school: string;
  status: "pending" | "accepted" | "rejected" | "pending_review";
  student_id: string;
  submitted_at: string;
  updated_at: string;
}

const RevieweeDetail = () => {
  const { application_id } = useParams();
  const [applicant, setApplicant] = useState<applicantProps>({
    applicant_name: "",
    codeforces_handle: "",
    country: "",
    degree: "",
    essay_about_you: "",
    essay_why_a2sv: "",
    id: "",
    leetcode_handle: "",
    resume_url: "",
    school: "",
    status: "pending",
    student_id: "",
    submitted_at: "",
    updated_at: "",
  });
  const reviewSchema = z.object({
    activity_check_notes: z.string().min(1, "Required"),
    resume_score: z.number().min(0).max(10),
    essay_why_a2sv_score: z.number().min(0).max(10),
    essay_about_you_score: z.number().min(0).max(10),
    technical_interview_score: z.number().min(0).max(10),
    behavioral_interview_score: z.number().min(0).max(10),
    interview_notes: z.string().min(1, "Required"),
  });

  // Load from localStorage if available
  const [reviewData, setReviewData] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`reviewData-${application_id}`);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // Convert string numbers to numbers for scores
          return {
            ...parsed,
            resume_score: Number(parsed.resume_score ?? 0),
            essay_why_a2sv_score: Number(parsed.essay_why_a2sv_score ?? 0),
            essay_about_you_score: Number(parsed.essay_about_you_score ?? 0),
            technical_interview_score: Number(
              parsed.technical_interview_score ?? 0
            ),
            behavioral_interview_score: Number(
              parsed.behavioral_interview_score ?? 0
            ),
          };
        } catch {
          // fallback to default
        }
      }
    }
    return {
      activity_check_notes: "",
      resume_score: 0,
      essay_why_a2sv_score: 0,
      essay_about_you_score: 0,
      technical_interview_score: 0,
      behavioral_interview_score: 0,
      interview_notes: "",
    };
  });

  // Save to localStorage on change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        `reviewData-${application_id}`,
        JSON.stringify(reviewData)
      );
    }
  }, [reviewData, application_id]);

  // Validation state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhNDNmOTExMy1lZjM5LTQ4OWItYWJlZi1mOTliMzAxMWU1OWYiLCJleHAiOjE3NTQ2NDM1MDIsInR5cGUiOiJhY2Nlc3MifQ.GxZ88GKNZPQYX4s1sSA43V-i3riQb_HrX6T0L7ww40c"; // Replace with secure method (env/localStorage/etc.)

  useEffect(() => {
    const fetchApplicant = async () => {
      try {
        const res = await fetch(
          `https://a2sv-application-platform-backend-team10.onrender.com/reviews/${application_id}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        const data = await res.json();
        setApplicant(data.data.applicant_details);
      } catch (err) {
        console.error("Failed to load applicant data:", err);
      }
    };
    fetchApplicant();
  }, [application_id]);

  console.log("Applicant Data:", applicant);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value =
      e.target.type === "number" ? Number(e.target.value) : e.target.value;
    setReviewData({ ...reviewData, [e.target.name]: value });
  };

  const handleSubmit = async () => {
    // Validate before submit lala
    const result = reviewSchema.safeParse(reviewData);
    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) fieldErrors[String(err.path[0])] = err.message;
      });
      setErrors(fieldErrors);
      alert("Please fix validation errors before submitting.");
      return;
    } else {
      setErrors({});
    }
    try {
      const res = await fetch(
        `https://a2sv-application-platform-backend-team10.onrender.com/reviews/${application_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(reviewData),
        }
      );
      const result = await res.json();
      console.log("Review submitted:", result);
      alert("Review successfully submitted!");
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("Failed to submit review");
    }
  };

  if (!applicant) return <p>Loading...</p>;

  // Conditional rendering based on applicant.status
  const isEvaluated =
    applicant.status === "accepted" || applicant.status === "rejected";

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col">
      {/* Header Bar */}
      <header className="w-full bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-2">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src="/image/aastu-footer-logo.svg"
              alt="A2SV Logo"
              className="h-7 w-auto"
            />
            <span className="font-bold text-xl text-[#1A4D8C] tracking-tight">
              A2SV
            </span>
          </div>
          {/* Navigation & Profile */}
          <nav className="flex items-center gap-6">
            <Link href="/Reviewee">
              <span className="text-xs font-medium text-[#222] border-b-2 border-indigo-400 pb-0.5">
                Dashboard
              </span>
            </Link>
            <Link href="#" className="text-xs text-indigo-600 hover:underline">
              Your Profile
            </Link>
            <span className="text-xs text-gray-700">Jane Reviewer</span>
            <button className="text-xs text-gray-500 hover:text-red-500 transition">
              Logout
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center bg-[#F7F8FA] py-8">
        <div className="w-full max-w-6xl">
          <Link
            href="/Reviewee"
            className="mb-2 text-xs text-indigo-600 hover:underline inline-block"
          >
            &larr; Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold mb-6">
            Review: {applicant.applicant_name}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-2 border-dotted border-blue-300 rounded-xl p-6 bg-white shadow-lg">
            {/* Applicant Profile */}
            <div className="bg-white rounded-xl shadow-md p-6 flex-1">
              <h2 className="font-semibold mb-4 text-lg">Applicant Profile</h2>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-4">
                <div>
                  <span className="block text-xs text-gray-500">School</span>
                  <span className="block text-sm text-gray-800 font-medium">
                    {applicant.school}
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-gray-500">
                    Degree Program
                  </span>
                  <span className="block text-sm text-gray-800 font-medium">
                    {applicant.degree}
                  </span>
                </div>
              </div>
              <div className="mb-4">
                <span className="block text-xs text-gray-500 mb-1">
                  Coding Profiles
                </span>
                <div className="flex gap-4 text-xs">
                  <a
                    className="text-blue-600 hover:underline"
                    href={applicant.leetcode_handle}
                    target="_blank"
                  >
                    LeetCode
                  </a>
                  <a
                    className="text-blue-600 hover:underline"
                    href={applicant.codeforces_handle}
                    target="_blank"
                  >
                    Codeforces
                  </a>
                </div>
              </div>
              <div className="mb-2">
                <span className="block text-xs text-gray-500 mb-1">
                  Essay 1: Tell us about yourself?
                </span>
                <span className="block text-sm text-gray-800">
                  {applicant.essay_about_you}
                </span>
              </div>
              <div className="mb-2">
                <span className="block text-xs text-gray-500 mb-1">
                  Essay 2: Why do you want to Join us?
                </span>
                <span className="block text-sm text-gray-800">
                  {applicant.essay_why_a2sv}
                </span>
              </div>
              <div className="mt-2">
                <span className="block text-xs text-gray-500 mb-1">Resume</span>
                <a
                  href={
                    typeof applicant.resume_url === "string"
                      ? applicant.resume_url
                      : applicant.resume_url instanceof File
                      ? URL.createObjectURL(applicant.resume_url)
                      : ""
                  }
                  className="text-blue-600 underline text-xs"
                  target="_blank"
                >
                  View Resume.pdf
                </a>
              </div>
            </div>

            {/* Conditional: EvaluatedInfo or Evaluation Form */}
            {isEvaluated ? (
              <EvaluatedInfo
                reviewData={reviewData}
                status={applicant.status}
              />
            ) : (
              <div className="bg-white rounded-xl shadow-md p-6 flex-1">
                <h2 className="font-semibold mb-4 text-lg">Evaluation Form</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                >
                  <label className="block mb-3 text-sm font-medium text-gray-700">
                    Activity Check Notes:
                    <textarea
                      name="activity_check_notes"
                      value={reviewData.activity_check_notes}
                      onChange={handleChange}
                      className={`w-full border border-gray-300 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                        errors.activity_check_notes ? "border-red-500" : ""
                      }`}
                      rows={3}
                    />
                    {errors.activity_check_notes && (
                      <span className="text-xs text-red-500">
                        {errors.activity_check_notes}
                      </span>
                    )}
                  </label>
                  <div className="flex gap-4 mb-3">
                    <label className="flex-1 text-sm font-medium text-gray-700">
                      Resume Score:
                      <input
                        type="number"
                        name="resume_score"
                        value={reviewData.resume_score}
                        onChange={handleChange}
                        min={0}
                        max={10}
                        className={`w-full border border-gray-300 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                          errors.resume_score ? "border-red-500" : ""
                        }`}
                      />
                      {errors.resume_score && (
                        <span className="text-xs text-red-500">
                          {errors.resume_score}
                        </span>
                      )}
                    </label>
                    <label className="flex-1 text-sm font-medium text-gray-700">
                      Essay "Why A2SV" Score:
                      <input
                        type="number"
                        name="essay_why_a2sv_score"
                        value={reviewData.essay_why_a2sv_score}
                        onChange={handleChange}
                        min={0}
                        max={10}
                        className={`w-full border border-gray-300 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                          errors.essay_why_a2sv_score ? "border-red-500" : ""
                        }`}
                      />
                      {errors.essay_why_a2sv_score && (
                        <span className="text-xs text-red-500">
                          {errors.essay_why_a2sv_score}
                        </span>
                      )}
                    </label>
                  </div>
                  <div className="flex gap-4 mb-3">
                    <label className="flex-1 text-sm font-medium text-gray-700">
                      Essay "About You" Score:
                      <input
                        type="number"
                        name="essay_about_you_score"
                        value={reviewData.essay_about_you_score}
                        onChange={handleChange}
                        min={0}
                        max={10}
                        className={`w-full border border-gray-300 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                          errors.essay_about_you_score ? "border-red-500" : ""
                        }`}
                      />
                      {errors.essay_about_you_score && (
                        <span className="text-xs text-red-500">
                          {errors.essay_about_you_score}
                        </span>
                      )}
                    </label>
                    <label className="flex-1 text-sm font-medium text-gray-700">
                      Technical Interview Score:
                      <input
                        type="number"
                        name="technical_interview_score"
                        value={reviewData.technical_interview_score}
                        onChange={handleChange}
                        min={0}
                        max={10}
                        className={`w-full border border-gray-300 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                          errors.technical_interview_score
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      {errors.technical_interview_score && (
                        <span className="text-xs text-red-500">
                          {errors.technical_interview_score}
                        </span>
                      )}
                    </label>
                  </div>
                  <div className="flex gap-4 mb-3">
                    <label className="flex-1 text-sm font-medium text-gray-700">
                      Behavioral Interview Score:
                      <input
                        type="number"
                        name="behavioral_interview_score"
                        value={reviewData.behavioral_interview_score}
                        onChange={handleChange}
                        min={0}
                        max={10}
                        className={`w-full border border-gray-300 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                          errors.behavioral_interview_score
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      {errors.behavioral_interview_score && (
                        <span className="text-xs text-red-500">
                          {errors.behavioral_interview_score}
                        </span>
                      )}
                    </label>
                  </div>
                  <label className="block mb-3 text-sm font-medium text-gray-700">
                    Interview Notes:
                    <textarea
                      name="interview_notes"
                      value={reviewData.interview_notes}
                      onChange={handleChange}
                      className={`w-full border border-gray-300 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                        errors.interview_notes ? "border-red-500" : ""
                      }`}
                      rows={2}
                    />
                    {errors.interview_notes && (
                      <span className="text-xs text-red-500">
                        {errors.interview_notes}
                      </span>
                    )}
                  </label>
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 mt-4 rounded hover:bg-indigo-700 font-semibold shadow"
                  >
                    Save & Submit Review
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevieweeDetail;
