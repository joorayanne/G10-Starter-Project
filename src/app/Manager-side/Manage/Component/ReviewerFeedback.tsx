import React from 'react';

const ReviewerFeedback = () => {
  const feedback = {
    reviewer: "Jane R.",
    activity: "Pass - 50 LC, 35 CF, 30 days active",
    resume: 85,
    essay: 90,
    tech: 88,
    behavioral: 92,
    notes: "span candidate with excellent problem-solving skills."
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md mt-4 max-w-[65vw]">
      <h2 className="font-bold text-lg mb-4">Reviewers Feedback ({feedback.reviewer})</h2>
      <p className="mb-2 flex flex-col"><span className='text-gray-500'>Activity Check:</span> {feedback.activity}</p>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <p className="mb-2 flex flex-col"><span className = "text-gray-500">Resume Score:</span> {feedback.resume}/100</p>
        <p className="mb-2 flex flex-col"><span className = "text-gray-500">Essay Score:</span> {feedback.essay}/100</p>
        <p className="mb-2 flex flex-col"><span className = "text-gray-500">Tech Interview:</span> {feedback.tech}/100</p>
        <p className="mb-2 flex flex-col"><span className = "text-gray-500">Behavioral:</span> {feedback.behavioral}/100</p>
      </div>
      <p className="mb-2 flex flex-col"><span className = "text-gray-500">Interviewer Notes:</span> {feedback.notes}</p>
    </div>
  );
};

export default ReviewerFeedback;
