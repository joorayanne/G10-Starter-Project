import React from "react";
import Link from "next/link";

interface RevieweeCardProps {
  application_id: string;
  applicant_name: string;
  status: string;
  submission_date: Date;
}

const RevieweeCard: React.FC<RevieweeCardProps> = ({
  application_id,
  applicant_name,
  status,
  submission_date,
}) => (
  <div className="bg-white shadow-md rounded-xl p-4 sm:p-6 flex flex-col justify-between min-h-[220px]">
    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mb-4">
      {/* Placeholder avatar */}
      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-xl font-bold mb-2 sm:mb-0">
        {applicant_name ? applicant_name[0] : "?"}
      </div>
      <div className="text-center sm:text-left">
        <h2 className="text-lg font-semibold text-[#222]">{applicant_name}</h2>
        <p className="text-xs text-gray-500">
          Submitted: {new Date(submission_date).toLocaleDateString()}
        </p>
      </div>
    </div>
    <div className="flex flex-wrap items-center gap-2 mb-4 justify-center sm:justify-start">
      {/* Status badge */}
      {status === "pending_review" && (
        <span className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full font-medium">
          Under Review
        </span>
      )}
      {(status === "accepted" || status === "rejected") && (
        <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">
          Review Complete
        </span>
      )}
      {status === "" && (
        <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium">
          New
        </span>
      )}
    </div>
    <div className="flex flex-col gap-2 mt-auto">
      {status === "accepted" || status === "rejected" ? (
        <Link href={`/Reviewee/${application_id}`}>
          <button className="w-full bg-gray-100 text-blue-600 font-semibold py-2 rounded-lg hover:bg-blue-50 transition">
            View Details
          </button>
        </Link>
      ) : status === "pending_review" ? (
        <Link href={`/Reviewee/${application_id}`}>
          <button className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition">
            Continue Review
          </button>
        </Link>
      ) : (
        <Link href={`/Reviewee/${application_id}`}>
          <button className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition">
            Start Review
          </button>
        </Link>
      )}
    </div>
  </div>
);

export default RevieweeCard;
