import { Application_id } from '@/types/Manger';
import React from 'react';


interface Props {
  applicant: Application_id;
}

const ApplicantProfile = ({ applicant }: Props) => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md min-w-[65vw]">
      <h2 className="font-bold text-lg mb-4">Applicant Profile</h2>

      <div className="grid grid-cols-2 gap-y-3 mb-4">
        <p className="flex flex-col"><span className="text-gray-500">Name:</span> {applicant.applicant_name}</p>
        <p className="flex flex-col"><span className="text-gray-500">Student ID:</span> {applicant.studnet_id}</p>
        <p className="flex flex-col"><span className="text-gray-500">School:</span> {applicant.school}</p>
        <p className="flex flex-col"><span className="text-gray-500">Degree Program:</span> {applicant.degree}</p>
        <p className="flex flex-col"><span className="text-gray-500">Country:</span> {applicant.country}</p>
        <p className="flex flex-col"><span className="text-gray-500">Status:</span> {applicant.status}</p>
        <p className="flex flex-col"><span className="text-gray-500">Submitted At:</span> {new Date(applicant.submitted_at).toLocaleString()}</p>
        <p className="flex flex-col"><span className="text-gray-500">Last Updated:</span> {new Date(applicant.updated_at).toLocaleString()}</p>
      </div>

      <div className="mb-4">
        <span className="text-gray-500">Coding Profiles:</span>
        <div className="mt-1">
          <a
            href={`https://leetcode.com/${applicant.leetcode_handle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 mx-2"
          >
            LeetCode
          </a>
          <a
            href={`https://codeforces.com/profile/${applicant.codeforces_handle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 mx-2"
          >
            Codeforces
          </a>
        </div>
      </div>

      <p className="mb-4 flex flex-col">
        <span className="text-gray-500">Essay: Why A2SV?</span>
        {applicant.essay_why_a2sv}
      </p>

      <p className="mb-4 flex flex-col">
        <span className="text-gray-500">Essay: About You</span>
        {applicant.essay_about_you}
      </p>

      <a
        href={applicant.resume_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        View Resume.pdf
      </a>
    </div>
  );
};

export default ApplicantProfile;
