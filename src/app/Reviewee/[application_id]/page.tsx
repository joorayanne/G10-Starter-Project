"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import RevieweeHeader from "./RevieweeHeader";
import ApplicantProfile from "./ApplicantProfile";
import EvaluationForm from "./EvaluationForm";
import EvaluatedInfo from "./EvaluatedInfo";
import { z } from "zod";
import { useParams } from "next/navigation";
import Link from "next/link";

interface ReviewData {
  activity_check_notes: string;
  resume_score: number;
  essay_why_a2sv_score: number;
  essay_about_you_score: number;
  technical_interview_score: number;
  behavioral_interview_score: number;
  interview_notes: string;
}

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
  const { data: session } = useSession();
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
  const [reviewData, setReviewData] = useState<ReviewData>(() => {
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

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchApplicant = async () => {
      if (!session?.accessToken) return;
      try {
        const res = await fetch(
          `https://a2sv-application-platform-backend-team10.onrender.com/reviews/${application_id}`,
          {
            headers: { Authorization: `Bearer ${session.accessToken}` },
          }
        );
        const data = await res.json();
        setApplicant(data.data.applicant_details);
      } catch (err) {
        console.error("Failed to load applicant data:", err);
      }
    };
    fetchApplicant();
  }, [application_id, session]);

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
            Authorization: `Bearer ${session?.accessToken ?? ""}`,
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
      <RevieweeHeader />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center bg-[#F7F8FA] py-4 sm:py-8 px-2 sm:px-0">
        <div className="w-full max-w-6xl">
          <Link
            href="/Reviewee"
            className="mb-2 text-xs text-indigo-600 hover:underline inline-block"
          >
            &larr; Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold mb-6 text-center sm:text-left">
            Review: {applicant.applicant_name}
          </h1>
          <div className="flex flex-col md:grid md:grid-cols-2 gap-4 sm:gap-8 border-2 border-dotted border-blue-300 rounded-xl p-2 sm:p-6 bg-white shadow-lg">
            {/* Applicant Profile */}
            <ApplicantProfile applicant={applicant} />

            {/* Conditional: EvaluatedInfo or EvaluationForm */}
            {isEvaluated ? (
              <EvaluatedInfo
                reviewData={reviewData}
                status={applicant.status}
              />
            ) : (
              <EvaluationForm
                reviewData={reviewData}
                errors={errors}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevieweeDetail;
