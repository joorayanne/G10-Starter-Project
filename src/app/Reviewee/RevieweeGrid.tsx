import React from "react";
import RevieweeCard from "./RevieweeCard";

interface RevieweeGridProps {
  data: Array<{
    application_id: string;
    applicant_name: string;
    status: string;
    submission_date: Date;
  }>;
}

const RevieweeGrid: React.FC<RevieweeGridProps> = ({ data }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-1 sm:p-0">
    {data.length === 0 && (
      <div className="col-span-full text-center text-gray-500 py-8">
        No applications to display.
      </div>
    )}
    {data.map((reviewee) => (
      <RevieweeCard key={reviewee.application_id} {...reviewee} />
    ))}
  </div>
);

export default RevieweeGrid;
