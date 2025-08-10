import React from "react";

interface RevieweeFilterSortProps {
  filter: string;
  setFilter: (
    filter: "all" | "under-review" | "complete" | "in_progress"
  ) => void;
  sortByDate: boolean;
  setSortByDate: (val: boolean) => void;
}

const RevieweeFilterSort: React.FC<RevieweeFilterSortProps> = ({
  filter,
  setFilter,
  sortByDate,
  setSortByDate,
}) => (
  <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-2 items-center mb-6 w-full">
    <button
      className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors duration-150 ${
        filter === "all"
          ? "bg-blue-600 text-white border-blue-600"
          : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
      }`}
      onClick={() => setFilter("all")}
    >
      All
    </button>
    <button
      className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors duration-150 ${
        filter === "under-review"
          ? "bg-blue-600 text-white border-blue-600"
          : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
      }`}
      onClick={() => setFilter("under-review")}
    >
      Under Review
    </button>
    <button
      className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors duration-150 ${
        filter === "complete"
          ? "bg-blue-600 text-white border-blue-600"
          : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
      }`}
      onClick={() => setFilter("complete")}
    >
      Complete
    </button>
    <button
      className="ml-auto px-4 py-2 rounded-full text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-blue-50"
      onClick={() => setSortByDate(!sortByDate)}
    >
      Sort by Submission Date {sortByDate ? "(Newest First)" : "(Oldest First)"}
    </button>
  </div>
);

export default RevieweeFilterSort;
