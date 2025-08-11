"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ManagerActions from "../../../../components/Manager/Manage/MangerAction";
import ReviewerFeedback from "../../../../components/Manager/Manage/ReviewerFeedback";
import ApplicantProfile from "../../../../components/Manager/Manage/ApplicantProfile";
import PageTitle from "@/components/Manager/PageTitle";
import { useSession } from "next-auth/react";

import { Application_id, Feedback } from "@/types/Manger";

interface APIResponse {
  data: {
    application: Application_id | null;
    review: Feedback | null;
  };
}

const Manage = () => {
  const params = useParams();
  const id = params?.id;

  const [application, setApplication] = useState<Application_id | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
 

  useEffect(() => {
    if (!id || typeof id !== "string") return;

    const fetchData = async () => {
      const { data: session } = useSession();
      const token = session?.accessToken;

      try {
        const res = await fetch(
          `https://a2sv-application-platform-backend-team10.onrender.com/manager/applications/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const appData: APIResponse = await res.json();

        setApplication(appData.data.application);
        setFeedback(appData.data.review);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [id]);

  if (!application) {
    return <div className="p-10">Loading application data...</div>;
  }

  return (
    <div className="p-10 flex flex-col gap-5">
      <PageTitle
        title={`Manage: ${application.applicant_name || "Applicant"}`}
      />
      <div className="flex flex-wrap gap-4">
        <ApplicantProfile applicant={application} />
        <ManagerActions applicantId={application.id} />
      </div>
      {feedback ? (
        <ReviewerFeedback feedback={feedback} />
      ) : (
        <div className="font-semibold text-lg">
          No recorded reviewers feedback yet.
        </div>
      )}
    </div>
  );
};

export default Manage;
