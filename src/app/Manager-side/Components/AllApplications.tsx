'use client';

import React, { useEffect, useState } from 'react';
import Tags from './tags';
import { useRouter } from 'next/navigation';
import { getAccessToken } from '../../auth/authHelpers';

type Application = {
  id: string;
  applicant_name: string;
  status: string;
  assigned_reviewer_name: string | null;
};

const AllApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchApplications = async () => {
      const token = getAccessToken();

      if (!token) {
        console.warn("🔒 No token found. Redirecting to login.");
        router.push('/login');
        return;
      }
      try {
        const res = await fetch('https://a2sv-application-platform-backend-team10.onrender.com/manager/applications/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await res.json();

        if (json.success) {
          setApplications(json.data.applications);
        } else {
          console.error("❌ Failed to fetch applications:", json.message);
        }
      } catch (err) {
        console.error("⚠️ Error fetching applications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [router]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, appId: string) => {
    const value = e.target.value;

    if (value === "review") {
      router.push("/review-page");
    } else if (value === "view-detail") {
      router.push(`/Manage/${appId}`);
    } else if (value === "assign-reviewer") {
      alert()
  };

  if (loading) return <p className="text-center text-gray-500">Loading applications...</p>;

  return (
    <div className="bg-white min-w-[40vw] md:max-w-[60vw] border border-gray-100 shadow-lg rounded-md p-5">
      <div className="md:flex py-2 justify-between">
        <p className="text-2xl font-bold mb-4">All Applications</p>
        <select className="border border-gray-300 bg-gray-200 rounded-md md:mr-8">
          <option value="all">Filter by Status</option>
        </select>
      </div>

      <div className="grid grid-cols-5 md:p-2 gap-3">
        <p className="text-gray-400 font-semibold md:text-sm text-xs">Application ID</p>
        <p className="text-gray-400 font-semibold md:text-sm text-xs">Applicant Name</p>
        <p className="text-gray-400 font-semibold md:text-sm text-xs">Assigned Reviewer</p>
        <p className="text-gray-400 font-semibold md:text-sm text-xs">Status</p>
        <span></span>

        {applications.map((app) => (
          <React.Fragment key={app.id}>
            <p className="text-gray-800 font-semibold text-sm">{app.id}</p>
            <p className="text-gray-400 font-semibold">{app.applicant_name}</p>
            <p className="text-gray-800 font-semibold text-sm pl-2 pt-2 bg-gray-100">
              {app.assigned_reviewer_name ?? "Not Assigned"}
            </p>
            <Tags label={app.status} color="5" />
            <select
              className="text-sm rounded px-3 py-1 text-blue-500 bg-transparent"
              onChange={(e) => handleSelectChange(e, app.id)}
              defaultValue=""
            >
              <option value="" disabled hidden className="text-blue-700">
                Action
              </option>
              <option value="review" className="hover:bg-gray-200 text-black">
                Review
              </option>
              <option value="view-detail" className="hover:bg-gray-200 text-black">
                View Detail
              </option>
              <option value="assign-reviewer" className="hover:bg-gray-200 text-black">
                assign reviewer
                </option>
            </select>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default AllApplications;
