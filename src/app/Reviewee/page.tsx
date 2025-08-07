"use client";
import Link from "next/link";
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
  const [filter, setFilter] = useState<"all" | "under-review" | "complete">(
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
    <div>
      <h1>Assigned Applications</h1>
      <p>
        You have {revieweeList?.total_count} applications waiting for your
        review
      </p>

      {/* Filter & Sort Buttons */}
      <div className="flex gap-3 my-4">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("under-review")}>Under Review</button>
        <button onClick={() => setFilter("complete")}>Complete</button>
        <button onClick={() => setSortByDate(!sortByDate)}>
          Sort by Submission Date{" "}
          {sortByDate ? "(Newest First)" : "(Oldest First)"}
        </button>
      </div>

      {/* Render List */}
      <div>
        {sortedData.length === 0 && <p>No applications to display.</p>}
        {sortedData.map((reviewee) => (
          <div
            key={reviewee.application_id}
            className="border p-4 mb-4 rounded"
          >
            <h2>{reviewee.applicant_name}</h2>
            <p>Application ID: {reviewee.application_id}</p>
            <p>
              Submission Date:{" "}
              {new Date(reviewee.submission_date).toLocaleString()}
            </p>
            <p>Status: {reviewee.status}</p>
            <Link href={`/Reviewee/${reviewee.application_id}`}>
              {reviewee.status === "accepted" ||
              reviewee.status === "rejected" ? (
                <p className="text-blue-600">View Detail</p>
              ) : (
                <p className="text-green-600">Continue Review</p>
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Reviewee_list;
