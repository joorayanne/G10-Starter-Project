"use client";

import React, { useEffect, useState } from "react";
import { getAccessToken } from "@/app/auth/authHelpers";

interface Props {
  applicantId: string;
}

interface Reviewer {
  id: string;
  full_name: string;
  email: string;
}

interface ReviewersResponse {
  data: {
    reviewers: Reviewer[];
  };
}

const ManagerActions = ({ applicantId }: Props) => {
  const [reviewers, setReviewers] = useState<Reviewer[]>([]);
  const [selectedReviewer, setSelectedReviewer] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReviewers = async () => {
      const token = getAccessToken();
      if (!token) return;

      try {
        const res = await fetch(
          "https://a2sv-application-platform-backend-team10.onrender.com/manager/applications/available-reviewers/?page=1&limit=10",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch reviewers.");
        }

        const datas: ReviewersResponse = await res.json();
        const reviewerList = datas.data.reviewers;

        setReviewers(reviewerList);

        if (reviewerList.length > 0) {
          setSelectedReviewer(reviewerList[0].id);
        }
      } catch (error) {
        console.error("Error fetching reviewers:", error);
      }
    };

    fetchReviewers();
  }, []);

  const handleAssignReviewer = async () => {
    const token = getAccessToken();
    if (!token) {
      alert("No access token found. Please log in again.");
      return;
    }

    if (!selectedReviewer) {
      alert("Please select a reviewer.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `https://a2sv-application-platform-backend-team10.onrender.com/manager/applications/${applicantId}/assign`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            reviewer_id: selectedReviewer,
          }),
        }
      );

    const result = await res.json();

    if (res.ok) {
      const reviewer = reviewers.find(r => r.id === selectedReviewer);
      alert(`✅ Reviewer "${reviewer?.full_name}" assigned successfully!`);
    } else {
      alert(`❌ Failed to assign reviewer: ${result.message}`);
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong while assigning reviewer.");
  } finally {
    setLoading(false);
  }
};


  const handleFinalDecision = async (decision: "accepted" | "rejected") => {
  const token = getAccessToken();
  if (!token) {
    alert("No access token found. Please log in again.");
    return;
  }

  const confirmed = window.confirm(`Are you sure you want to ${decision} this application?`);
  if (!confirmed) return;

  const notes = prompt("Please enter decision notes:", "");

  if (notes === null || notes.trim() === "") {
    alert("Decision notes are required.");
    return;
  }

  setLoading(true);
  try {
    const res = await fetch(
      `https://a2sv-application-platform-backend-team10.onrender.com/manager/applications/${applicantId}/decide`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: decision,
          decision_notes: notes,
        }),
      }
    );

    const result = await res.json();

    if (res.ok) {
      alert(`✅ Application ${decision} successfully.`);
    } else {
      alert(`❌ Failed to ${decision}: ${result.message}`);
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong while submitting the final decision.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="p-6 bg-white rounded-xl shadow-md w-full max-w-sm">
      <h2 className="font-bold text-lg mb-4">Manager Actions</h2>

      <label className="block mb-2 text-sm font-medium">Assign Reviewer</label>
      <select
        value={selectedReviewer}
        onChange={(e) => setSelectedReviewer(e.target.value)}
        className="w-full px-3 py-2 border rounded-md mb-4"
        disabled={loading || reviewers.length === 0}
      >
        {reviewers.map((rev) => (
          <option key={rev.id} value={rev.id}>
            {rev.full_name}
          </option>
        ))}
      </select>

      <button
        onClick={handleAssignReviewer}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-6 hover:bg-blue-700 disabled:opacity-50"
        disabled={loading || !selectedReviewer}
      >
        {loading ? "Processing..." : "Confirm"}
      </button>

      <div className="border-t pt-4">
        <h3 className="font-semibold mb-2">Final Decision</h3>
        <p className="text-sm mb-4 text-gray-600">
          This action is final and will notify the applicant.
        </p>
        <div className="flex gap-2">
          <button
             onClick={() => handleFinalDecision("rejected")}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
            disabled={loading}
          >
            Reject
          </button>
          <button
            onClick={() => handleFinalDecision("accepted")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
            disabled={loading}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManagerActions;
