"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface Applicant {
  applicant_name: string;
  school: string;
  degree: string;
  github_handle: string;
  leetcode_handle: string;
  codeforces_handle: string;
  essay_about_you: string;
  essay_why_a2sv: string;
  resume_url: string;
}

interface ReviewData {
  activity_check_notes: string;
  resume_score: number;
  essay_why_a2sv_score: number;
  essay_about_you_score: number;
  technical_interview_score: number;
  behavioral_interview_score: number;
  interview_notes: string;
}

const RevieweeDetail = () => {
  const { application_id } = useParams();
  const [applicant, setApplicant] = useState<Applicant | null>(null);
  const [reviewData, setReviewData] = useState<ReviewData>({
    activity_check_notes: "",
    resume_score: 0,
    essay_why_a2sv_score: 0,
    essay_about_you_score: 0,
    technical_interview_score: 0,
    behavioral_interview_score: 0,
    interview_notes: "",
  });

  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZWU4NTdmOS0xZGRhLTQ2OTAtYTE0MS03NDU4NmRiMjNhYTEiLCJleHAiOjE3NTQ1NTY2MjAsInR5cGUiOiJhY2Nlc3MifQ.ysKLlpdJ4UjKfFb1Nj-e065GgfFN2ZAjUiSvJBUF9zA"; // Replace with secure method (env/localStorage/etc.)

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
    setReviewData({ ...reviewData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
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

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col">
      {/* Header Bar */}
      <header className="w-full bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-2">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image
              src="/image/aastu-footer-logo.svg"
              alt="A2SV Logo"
              height={100}
              width={100}
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
                    href={applicant.github_handle}
                    target="_blank"
                  >
                    GitHub
                  </a>
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
                  href={applicant.resume_url}
                  className="text-blue-600 underline text-xs"
                  target="_blank"
                >
                  View Resume.pdf
                </a>
              </div>
            </div>

            {/* Evaluation Form */}
            <div className="bg-white rounded-xl shadow-md p-6 flex-1">
              <h2 className="font-semibold mb-4 text-lg">Evaluation Form</h2>
              <label className="block mb-3 text-sm font-medium text-gray-700">
                Activity Check Notes:
                <textarea
                  name="activity_check_notes"
                  value={reviewData.activity_check_notes}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  rows={3}
                />
              </label>
              <div className="flex gap-4 mb-3">
                <label className="flex-1 text-sm font-medium text-gray-700">
                  Resume Score:
                  <input
                    type="number"
                    name="resume_score"
                    value={reviewData.resume_score}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </label>
                <label className="flex-1 text-sm font-medium text-gray-700">
                  Essay Score:
                  <input
                    type="number"
                    name="essay_why_a2sv_score"
                    value={reviewData.essay_why_a2sv_score}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </label>
              </div>
              <button
                onClick={handleSubmit}
                className="w-full bg-indigo-600 text-white py-2 mt-4 rounded hover:bg-indigo-700 font-semibold shadow"
              >
                Save & Submit Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevieweeDetail;