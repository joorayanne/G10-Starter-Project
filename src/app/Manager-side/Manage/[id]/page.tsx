'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ManagerActions from '../Component/MangerAction';
import ReviewerFeedback from '../Component/ReviewerFeedback';
import ApplicantProfile from '../Component/ApplicantProfile';
import PageTitle from '@/app/Manager-side/Components/PageTitle';
import { getAccessToken } from '@/app/auth/authHelpers';

interface Application {
  id: string;
  applicant_name: string;
  status: string;
  school: string;
  studnet_id: string;
  country : string;
  degree: string;
  leetcode_handle : string;
  codeforces_handle : string;
  essay_why_a2sv: string;
  essay_about_you: string;
  resume_url: string;
  submitted_at: string;
  updated_at: string;
}
interface Feedback {
  id : string;
  application_id: string;
  reviewer_id: string;
  activity_check_notes : string;
  resume_score : number;
  essay_why_a2sv_score : number;
  essay_about_you_score : number;
  technical_interview_score: number;
  behavioral_interview_score: number;
  interview_notes? : string;
  created_at: string;
  updated_at: string;
}
interface APIResponse {
  application: Application;
  review: Feedback;
}

const Manage = () => {
  const { id } = useParams(); 
  const [application, setApplication] = useState<Application>();
  const [feedback, setFeedback] = useState<Feedback>();

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      const token = getAccessToken();

      try {
        const appRes: APIResponse = await fetch(`https://a2sv-application-platform-backend-team10.onrender.com/manager/applications/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });



        const appData = await appRes.json();


        setApplication(appData.application);
        setFeedback(appData.review);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, [id]);

  if (!application) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="p-10 flex flex-col gap-5">
      <PageTitle title={`Manage: ${application.applicant_name || 'Applicant'}`} />
      <div className="flex flex-wrap gap-4">
        <ApplicantProfile applicant={application} />
        <ManagerActions applicantId={application.id} />
      </div>
      <ReviewerFeedback feedback={feedback} />
    </div>
  );
};

export default Manage;
