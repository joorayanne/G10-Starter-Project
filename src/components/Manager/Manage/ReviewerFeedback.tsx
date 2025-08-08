import React from 'react';
import  Feedback  from '@/types/Manger';



interface FeedbackProps {
  feedback: Feedback;
}

const ReviewerFeedback = ({ feedback }: FeedbackProps) => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md mt-4 max-w-[65vw]">
      <h2 className="font-bold text-lg mb-4">Reviewer Feedback</h2>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <p className="flex flex-col">
          <span className="text-gray-500">Reviewer ID:</span>
          {feedback.reviewer_id}
        </p>
        <p className="flex flex-col">
          <span className="text-gray-500">Application ID:</span>
          {feedback.application_id}
        </p>
        <p className="flex flex-col">
          <span className="text-gray-500">Created At:</span>
          {new Date(feedback.created_at).toLocaleString()}
        </p>
        <p className="flex flex-col">
          <span className="text-gray-500">Last Updated:</span>
          {new Date(feedback.updated_at).toLocaleString()}
        </p>
      </div>

      <p className="mb-4 flex flex-col">
        <span className="text-gray-500">Activity Check Notes:</span>
        {feedback.activity_check_notes}
      </p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <p className="flex flex-col">
          <span className="text-gray-500">Resume Score:</span>
          {feedback.resume_score} / 100
        </p>
        <p className="flex flex-col">
          <span className="text-gray-500">Essay: Why A2SV Score:</span>
          {feedback.essay_why_a2sv_score} / 100
        </p>
        <p className="flex flex-col">
          <span className="text-gray-500">Essay: About You Score:</span>
          {feedback.essay_about_you_score} / 100
        </p>
        <p className="flex flex-col">
          <span className="text-gray-500">Technical Interview Score:</span>
          {feedback.technical_interview_score} / 100
        </p>
        <p className="flex flex-col">
          <span className="text-gray-500">Behavioral Interview Score:</span>
          {feedback.behavioral_interview_score} / 100
        </p>
      </div>

      {feedback.interview_notes && (
        <p className="mb-2 flex flex-col">
          <span className="text-gray-500">Interview Notes:</span>
          {feedback.interview_notes}
        </p>
      )}
    </div>
  );
};

export default ReviewerFeedback;
