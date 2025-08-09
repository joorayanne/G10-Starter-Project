"use client";
import Link from "next/link";
import Image from "next/image";
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
  const [filter, setFilter] = useState<"all" | "under-review" | "complete" | "in_progress" >(
    "all"
  );
  const [sortByDate, setSortByDate] = useState(false);
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZWU4NTdmOS0xZGRhLTQ2OTAtYTE0MS03NDU4NmRiMjNhYTEiLCJleHAiOjE3NTQ1NTY2MjAsInR5cGUiOiJhY2Nlc3MifQ.ysKLlpdJ4UjKfFb1Nj-e065GgfFN2ZAjUiSvJBUF9zA";

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
  if (filter === 'all') return true;
  if (filter === 'under-review') return reviewee.status === 'pending_review';
  if (filter === 'complete') return reviewee.status === 'accepted' || reviewee.status === 'rejected';
  return true;
});

const sortedData = [...filteredData].sort((a, b) => {
  const dateA = new Date(a.submission_date).getTime();
  const dateB = new Date(b.submission_date).getTime();
  return sortByDate ? dateB - dateA : dateA - dateB;
});

  return (
    <div className="min-h-screen bg-[#F7F8FA] px-8 py-8">
      {/* Header Bar */}
<header className="w-full bg-white shadow-sm py-4 px-8 mb-8 flex items-center justify-between">
  {/* Left Logo */}
  <div className="flex items-center gap-2">
             <Image
        src="/image/logo.png"
        alt="A2SV Logo"
        width={800}
        height={400}
        className="w-full h-auto"
      />

  </div>

  {/* Center Navigation */}
  <nav className="absolute left-1/2 transform -translate-x-1/2">
    <Link href="#" className="text-sm text-gray-800 font-semibold underline">
      Dashboard
    </Link>
  </nav>

  {/* Right Side Navigation */}
  <div className="flex gap-6 items-center text-sm text-gray-700">
    <Link href="/profile" className="text-blue-600 font-medium hover:underline">
      Your Profile
    </Link>
    <span>Reviewer Name</span>
    <button className="hover:underline">Logout</button>
  </div>
</header>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-[#222] mb-2">Assigned Applications</h1>
        <p className="text-gray-600 mb-6">
          You have {revieweeList?.total_count} applications waiting for your review
        </p>

        {/* Filter & Sort Buttons */}
        <div className="flex flex-wrap gap-2 items-center mb-6">
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors duration-150 ${filter === 'all' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors duration-150 ${filter === 'under-review' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'}`}
            onClick={() => setFilter('under-review')}
          >
            Under Review
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors duration-150 ${filter === 'complete' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'}`}
            onClick={() => setFilter('complete')}
          >
            Complete
          </button>
          <button
            className="ml-auto px-4 py-2 rounded-full text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-blue-50"
            onClick={() => setSortByDate(!sortByDate)}
          >
            Sort by Submission Date {sortByDate ? '(Newest First)' : '(Oldest First)'}
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedData.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-8">No applications to display.</div>
          )}
          {sortedData.map((reviewee) => (
            <div
              key={reviewee.application_id}
              className="bg-white shadow-md rounded-xl p-6 flex flex-col justify-between min-h-[220px]"
            >
              <div className="flex items-center gap-4 mb-4">
                {/* Placeholder avatar */}
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-xl font-bold">
                  {reviewee.applicant_name ? reviewee.applicant_name[0] : '?'}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[#222]">{reviewee.applicant_name}</h2>
                  <p className="text-xs text-gray-500">Submitted: {new Date(reviewee.submission_date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-4">
                {/* Status badge */}
                {reviewee.status === 'pending_review' && (
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full font-medium">Under Review</span>
                )}
                {(reviewee.status === 'accepted' || reviewee.status === 'rejected') && (
                  <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">Review Complete</span>
                )}
                {reviewee.status === '' && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium">New</span>
                )}
              </div>
              <div className="flex flex-col gap-2 mt-auto">
                <Link href={`/Reviewee/${reviewee.application_id}`}>
                  {reviewee.status === 'accepted' || reviewee.status === 'rejected' ? (
                    <button className="w-full bg-gray-100 text-blue-600 font-semibold py-2 rounded-lg hover:bg-blue-50 transition">View Details</button>
                  ) : reviewee.status === 'pending_review' ? (
                    <button className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition">Continue Review</button>
                  ) : (
                    <button className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition">Start Review</button>
                  )}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-8">
          <span className="text-sm text-gray-500">Showing 1 to {sortedData.length} of {revieweeList?.total_count} results</span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 rounded border border-gray-300 bg-white text-gray-700 hover:bg-blue-50">{'<'}</button>
            <button className="px-3 py-1 rounded border border-blue-600 bg-blue-600 text-white font-semibold">1</button>
            <button className="px-3 py-1 rounded border border-gray-300 bg-white text-gray-700 hover:bg-blue-50">2</button>
            <span className="px-2 text-gray-500">...</span>
            <button className="px-3 py-1 rounded border border-gray-300 bg-white text-gray-700 hover:bg-blue-50">7</button>
            <button className="px-3 py-1 rounded border border-gray-300 bg-white text-gray-700 hover:bg-blue-50">{'>'}</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Reviewee_list;
