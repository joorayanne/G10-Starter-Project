import React from "react";

interface ApplicantProfileProps {
  applicant: {
    school: string;
    degree: string;
    leetcode_handle: string;
    codeforces_handle: string;
    essay_about_you: string;
    essay_why_a2sv: string;
    resume_url: string | File;
  };
}

const ApplicantProfile: React.FC<ApplicantProfileProps> = ({ applicant }) => (
  <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 flex-1">
    <h2 className="font-semibold mb-4 text-lg sm:text-xl">Applicant Profile</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-2 mb-4">
      <div>
        <span className="block text-xs text-gray-500">School</span>
        <span className="block text-sm text-gray-800 font-medium">
          {applicant.school}
        </span>
      </div>
      <div>
        <span className="block text-xs text-gray-500">Degree Program</span>
        <span className="block text-sm text-gray-800 font-medium">
          {applicant.degree}
        </span>
      </div>
    </div>
    <div className="mb-4">
      <span className="block text-xs text-gray-500 mb-1">Coding Profiles</span>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-xs">
        <a
          className="text-blue-600 hover:underline"
          href={applicant.leetcode_handle}
          target="_blank"
        >
          LeetCode
        </a>
        <a
          className="text-blue-600 hover:underline"
          href={applicant.codeforces_handle}
          target="_blank"
        >
          Codeforces
        </a>
      </div>
    </div>
    <div className="mb-2">
      <span className="block text-xs text-gray-500 mb-1">
        Essay 1: Tell us about yourself?
      </span>
      <span className="block text-sm text-gray-800">
        {applicant.essay_about_you}
      </span>
    </div>
    <div className="mb-2">
      <span className="block text-xs text-gray-500 mb-1">
        Essay 2: Why do you want to Join us?
      </span>
      <span className="block text-sm text-gray-800">
        {applicant.essay_why_a2sv}
      </span>
    </div>
    <div className="mt-2">
      <span className="block text-xs text-gray-500 mb-1">Resume</span>
      <a
        href={
          typeof applicant.resume_url === "string"
            ? applicant.resume_url
            : applicant.resume_url instanceof File
            ? URL.createObjectURL(applicant.resume_url)
            : ""
        }
        className="text-blue-600 underline text-xs"
        target="_blank"
      >
        View Resume.pdf
      </a>
    </div>
  </div>
);

export default ApplicantProfile;
