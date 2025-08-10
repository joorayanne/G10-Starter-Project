"use client";
import RevieweeHeader from "./RevieweeHeader";
import RevieweeFilterSort from "./RevieweeFilterSort";
import RevieweeGrid from "./RevieweeGrid";
import { useState, useEffect } from "react";

interface Reviewee_list {
  reviews: [
    {
      application_id: string;
      applicant_name: string;
      status: string;
      submission_date: Date;
    }
  ];
  total_count: number;
  page: number;
  limit: number;
}

const Reviewee_list = () => {
  const [filter, setFilter] = useState<
    "all" | "under-review" | "complete" | "in_progress"
  >("all");
  const [sortByDate, setSortByDate] = useState(false);
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhNDNmOTExMy1lZjM5LTQ4OWItYWJlZi1mOTliMzAxMWU1OWYiLCJleHAiOjE3NTQ2NjQ0NDgsInR5cGUiOiJhY2Nlc3MifQ.NE3m8uQEpMo9uQb8_QBcnsFr9tLTLnIInFsdAjGvobo";

  const [revieweeList, setRevieweeList] = useState<Reviewee_list>({
    reviews: [
      {
        application_id: "",
        applicant_name: "",
        status: "",
        submission_date: new Date("1970-01-01T00:00:00.000Z"),
      },
    ],
    total_count: 0,
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    const fetchRevieweeList = async () => {
      try {
        const response = await fetch(
          "https://a2sv-application-platform-backend-team10.onrender.com/reviews/assigned",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await response.json();
        setRevieweeList(data.data);
      } catch (error) {
        console.error("Error fetching reviewee list:", error);
      }
    };

    fetchRevieweeList();
  }, [accessToken]);

  console.log(revieweeList);

  // Filtering
  const rawData = revieweeList?.reviews ?? [];

  const filteredData = rawData.filter((reviewee) => {
    if (filter === "all") return true;
    if (filter === "under-review") return reviewee.status === "pending_review";
    if (filter === "complete")
      return reviewee.status === "accepted" || reviewee.status === "rejected";
    return true;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    const dateA = new Date(a.submission_date).getTime();
    const dateB = new Date(b.submission_date).getTime();
    return sortByDate ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="min-h-screen bg-[#F7F8FA] px-2 sm:px-8 py-4 sm:py-8">
      {/* Header Bar */}
      <RevieweeHeader />
      {/* Main Content */}
      <div className="max-w-7xl mx-auto mt-10 sm:mt-20">
        <h1 className="text-2xl font-bold text-[#222] mb-2 text-center sm:text-left">
          Assigned Applications
        </h1>
        <p className="text-gray-600 mb-6 text-center sm:text-left">
          You have {revieweeList?.total_count} applications waiting for your
          review
        </p>

        {/* Filter & Sort Buttons */}
        <RevieweeFilterSort
          filter={filter}
          setFilter={setFilter}
          sortByDate={sortByDate}
          setSortByDate={setSortByDate}
        />

        {/* Cards Grid */}
        <div className="w-full">
          <RevieweeGrid data={sortedData} />
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4">
          <span className="text-sm text-gray-500">
            Showing 1 to {sortedData.length} of {revieweeList?.total_count}{" "}
            results
          </span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 rounded border border-gray-300 bg-white text-gray-700 hover:bg-blue-50">
              {"<"}
            </button>
            <button className="px-3 py-1 rounded border border-blue-600 bg-blue-600 text-white font-semibold">
              1
            </button>
            <button className="px-3 py-1 rounded border border-gray-300 bg-white text-gray-700 hover:bg-blue-50">
              2
            </button>
            <span className="px-2 text-gray-500">...</span>
            <button className="px-3 py-1 rounded border border-gray-300 bg-white text-gray-700 hover:bg-blue-50">
              7
            </button>
            <button className="px-3 py-1 rounded border border-gray-300 bg-white text-gray-700 hover:bg-blue-50">
              {">"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Reviewee_list;
