"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const RevieweeDetail = () => {
  const { application_id } = useParams();
  const [applicant, setApplicant] = useState<any>(null);
  const [reviewData, setReviewData] = useState({
    activity_check_notes: "",
    resume_score: 0,
    essay_why_a2sv_score: 0,
    essay_about_you_score: 0,
    technical_interview_score: 0,
    behavioral_interview_score: 0,
    interview_notes: "",
  });

  const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZWU4NTdmOS0xZGRhLTQ2OTAtYTE0MS03NDU4NmRiMjNhYTEiLCJleHAiOjE3NTQ1NTY2MjAsInR5cGUiOiJhY2Nlc3MifQ.ysKLlpdJ4UjKfFb1Nj-e065GgfFN2ZAjUiSvJBUF9zA"; // Replace with secure method (env/localStorage/etc.)

  
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
    <div className="flex flex-col gap-4 p-8">
      <Link
        href="/Reviewee"
        className="mb-4 text-indigo-600 hover:underline self-start"
      >
        &larr; Back to Dashboard
      </Link>
      <h1 className="text-xl font-bold">Review: {applicant.applicant_name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Applicant Profile */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Applicant Profile</h2>
          <p>
            <strong>School:</strong> {applicant.school}
          </p>
          <p>
            <strong>Degree Program:</strong> {applicant.degree}
          </p>
        
          <p>
            <strong>LeetCode:</strong>{" "}
            <a
              className="text-blue-500"
              href={applicant.leetcode_handle}
              target="_blank"
            >
              LeetCode
            </a>
          </p>
          <p>
            <strong>Codeforces:</strong>{" "}
            <a
              className="text-blue-500"
              href={applicant.codeforces_handle}
              target="_blank"
            >
              Codeforces
            </a>
          </p>
          <p className="mt-3">
            <strong>Essay 1:</strong> {applicant.essay_about_you}
          </p>
          <p>
            <strong>Essay 2:</strong> {applicant.essay_why_a2sv}
          </p>
          <p className="mt-2">
            <strong>Resume:</strong>{" "}
            <a
              href={applicant.resume_url}
              className="text-blue-600 underline"
              target="_blank"
            >
              View Resume.pdf
            </a>
          </p>
        </div>

        {/* Evaluation Form */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Evaluation Form</h2>

          <label className="block mb-2">
            Activity Check Notes:
            <textarea
              name="activity_check_notes"
              value={reviewData.activity_check_notes}
              onChange={handleChange}
              className="w-full border rounded p-2 mt-1"
            />
          </label>

          <div className="flex gap-2">
            <label className="flex-1">
              Resume Score:
              <input
                type="number"
                name="resume_score"
                value={reviewData.resume_score}
                onChange={handleChange}
                className="w-full border rounded p-2 mt-1"
              />
            </label>

            <label className="flex-1">
              Essay "Why A2SV" Score:
              <input
                type="number"
                name="essay_why_a2sv_score"
                value={reviewData.essay_why_a2sv_score}
                onChange={handleChange}
                className="w-full border rounded p-2 mt-1"
              />
            </label>
          </div>

          <label className="block mt-2">
            Essay "About You" Score:
            <input
              type="number"
              name="essay_about_you_score"
              value={reviewData.essay_about_you_score}
              onChange={handleChange}
              className="w-full border rounded p-2 mt-1"
            />
          </label>

          <label className="block mt-2">
            Technical Interview Score:
            <input
              type="number"
              name="technical_interview_score"
              value={reviewData.technical_interview_score}
              onChange={handleChange}
              className="w-full border rounded p-2 mt-1"
            />
          </label>

          <label className="block mt-2">
            Behavioral Interview Score:
            <input
              type="number"
              name="behavioral_interview_score"
              value={reviewData.behavioral_interview_score}
              onChange={handleChange}
              className="w-full border rounded p-2 mt-1"
            />
          </label>

          <label className="block mt-2">
            Interview Notes:
            <textarea
              name="interview_notes"
              value={reviewData.interview_notes}
              onChange={handleChange}
              className="w-full border rounded p-2 mt-1"
            />
          </label>

          <button
            onClick={handleSubmit}
            className="w-full bg-indigo-600 text-white py-2 mt-4 rounded hover:bg-indigo-700"
          >
            Save & Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default RevieweeDetail;
