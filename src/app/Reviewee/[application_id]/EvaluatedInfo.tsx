import React from "react";

interface EvaluatedInfoProps {
  reviewData: {
    activity_check_notes: string;
    resume_score: number;
    essay_why_a2sv_score: number;
    essay_about_you_score: number;
    technical_interview_score: number;
    behavioral_interview_score: number;
    interview_notes: string;
  };
  status: string;
}

const EvaluatedInfo: React.FC<EvaluatedInfoProps> = ({
  reviewData,
  status,
}) => {
  if (status !== "accepted" && status !== "rejected") return null;
  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 flex-1">
      <h2 className="font-semibold mb-4 text-lg sm:text-xl">
        Evaluation Summary
      </h2>
      <div className="mb-3 text-sm text-gray-700">
        <strong>Status:</strong>{" "}
        <span
          className={status === "accepted" ? "text-green-600" : "text-red-600"}
        >
          {status}
        </span>
      </div>
      <div className="mb-3">
        <strong>Activity Check Notes:</strong>
        <div>{reviewData.activity_check_notes}</div>
      </div>
      <div className="mb-3">
        <strong>Resume Score:</strong> {reviewData.resume_score}
      </div>
      <div className="mb-3">
        <strong>Essay "Why A2SV" Score:</strong>{" "}
        {reviewData.essay_why_a2sv_score}
      </div>
      <div className="mb-3">
        <strong>Essay "About You" Score:</strong>{" "}
        {reviewData.essay_about_you_score}
      </div>
      <div className="mb-3">
        <strong>Technical Interview Score:</strong>{" "}
        {reviewData.technical_interview_score}
      </div>
      <div className="mb-3">
        <strong>Behavioral Interview Score:</strong>{" "}
        {reviewData.behavioral_interview_score}
      </div>
      <div className="mb-3">
        <strong>Interview Notes:</strong>
        <div>{reviewData.interview_notes}</div>
      </div>
    </div>
  );
};

export default EvaluatedInfo;
