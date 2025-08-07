"use client";
import React, { useState } from "react";
import { getAccessToken } from "@/app/auth/authHelpers"; 

interface Props {
  applicantId: string;
}

const ManagerActions = ({ applicantId }: Props) => {
  const [reviewer, setReviewer] = useState("Jane R.");
  const [loading, setLoading] = useState(false);

  const handleAssignReviewer = async () => {
    const token = getAccessToken();
    if (!token) {
      alert("No access token found. Please log in again.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `https://a2sv-application-platform-backend-team10.onrender.com/manager/applications/${applicantId}/assign`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            applicantId,
            reviewer,
          }),
        }
      );

      const result = await res.json();
      if (res.ok) {
        alert(`✅ Reviewer "${reviewer}" assigned successfully!`);
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

  const handleFinalDecision = async (decision: "accept" | "reject") => {
    const token = getAccessToken();
    if (!token) {
      alert("No access token found. Please log in again.");
      return;
    }
    if (!window.confirm(`Are you sure you want to ${decision} this application?`)) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `https://a2sv-application-platform-backend-team10.onrender.com/manager/applications/${applicantId}/decide`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            applicantId,
            decision,
          }),
        }
      );

      const result = await res.json();
      if (res.ok) {
        alert(`✅ Application ${decision}ed successfully.`);
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
      <input
        value={reviewer}
        onChange={(e) => setReviewer(e.target.value)}
        className="w-full px-3 py-2 border rounded-md mb-4"
        placeholder="Enter reviewer name"
        disabled={loading}
      />
      <button
        onClick={handleAssignReviewer}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-6 hover:bg-blue-700 disabled:opacity-50"
        disabled={loading}
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
            onClick={() => handleFinalDecision("reject")}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
            disabled={loading}
          >
            Reject
          </button>
          <button
            onClick={() => handleFinalDecision("accept")}
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
