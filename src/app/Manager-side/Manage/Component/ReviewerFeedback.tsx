import React from 'react';

interface FeedbackProps {
  feedback: {
    reviewer: string;
    activity: string;
    resume: number;
    essay: number;
    tech: number;
    behavioral: number;
    notes: string;
  };
}

const ReviewerFeedback = ({ feedback }: FeedbackProps) => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md mt-4 max-w-[65vw]">
      <h2 className="font-bold text-lg mb-4">Reviewers Feedback ({feedback.reviewer})</h2>
      <p className="mb-2 flex flex-col"><span className='text-gray-500'>Activity Check:</span> {feedback.activity}</p>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <p className="mb-2 flex flex-col"><span className="text-gray-500">Resume Score:</span> {feedback.resume}/100</p>
        <p className="mb-2 flex flex-col"><span className="text-gray-500">Essay Score:</span> {feedback.essay}/100</p>
        <p className="mb-2 flex flex-col"><span className="text-gray-500">Tech Interview:</span> {feedback.tech}/100</p>
        <p className="mb-2 flex flex-col"><span className="text-gray-500">Behavioral:</span> {feedback.behavioral}/100</p>
      </div>
      <p className="mb-2 flex flex-col"><span className="text-gray-500">Interviewer Notes:</span> {feedback.notes}</p>
    </div>
  );
};

export default ReviewerFeedback;
