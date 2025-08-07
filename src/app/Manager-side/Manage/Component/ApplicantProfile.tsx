import React from 'react';

const ApplicantProfile = () => {
  const applicant = {
    school: "Addis Ababa Institute of Technology",
    degree: "Software Engineering",
    profiles: {
      github: "#",
      leetcode: "#",
      codeforces: "#"
    },
    essay1: "I am passionate about solving complex problems.",
    essay2: "I want to join because I am sure it will help me to improve my problem solving skill.",
    resumeLink: "#"
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md min-w-[65vw]">
      <h2 className="font-bold text-lg mb-4">Applicant Profile</h2>
      <div className="grid grid-cols-2 mb-2">
        <p className='flex flex-col'> <span  className = "text-gray-500 ">School:</span > {applicant.school}</p>
        <p className='flex flex-col'><span className = "text-gray-500 " >Degree Program:</span > {applicant.degree}</p>
      </div>
      <p className="mb-2 flex flex-col"><span  className = "text-gray-500 ">Coding Profiles:</span >
      <div>
        <a href={applicant.profiles.github} className="text-blue-500 mx-2">GitHub</a>
        <a href={applicant.profiles.leetcode} className="text-blue-500 mx-2">LeetCode</a>
        <a href={applicant.profiles.codeforces} className="text-blue-500 mx-2">Codeforces</a>
        </div>
      </p>
      <p className="mb-2 flex flex-col"><span className = "text-gray-500 ">Essay 1:</span > {applicant.essay1}</p>
      <p className="mb-2 flex flex-col"><span className = "text-gray-500 " >Essay 2:</span > {applicant.essay2}</p>
      <a href={applicant.resumeLink} className="text-blue-600 underline">View Resume.pdf</a>
    </div>
  );
};

export default ApplicantProfile;
