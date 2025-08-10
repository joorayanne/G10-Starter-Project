interface EvaluationFormProps {
  reviewData: {
    activity_check_notes: string;
    resume_score: number;
    essay_why_a2sv_score: number;
    essay_about_you_score: number;
    technical_interview_score: number;
    behavioral_interview_score: number;
    interview_notes: string;
  };
  errors: { [key: string]: string };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: () => void;
}

const EvaluationForm: React.FC<EvaluationFormProps> = ({
  reviewData,
  errors,
  handleChange,
  handleSubmit,
}) => (
  <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 flex-1">
    <h2 className="font-semibold mb-4 text-lg sm:text-xl">Evaluation Form</h2>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <label className="block mb-3 text-sm font-medium text-gray-700">
        Activity Check Notes:
        <textarea
          name="activity_check_notes"
          value={reviewData.activity_check_notes}
          onChange={handleChange}
          className={`w-full border border-gray-300 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
            errors.activity_check_notes ? "border-red-500" : ""
          }`}
          rows={3}
        />
        {errors.activity_check_notes && (
          <span className="text-xs text-red-500">
            {errors.activity_check_notes}
          </span>
        )}
      </label>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-3">
        <label className="flex-1 text-sm font-medium text-gray-700">
          Resume Score:
          <input
            type="number"
            name="resume_score"
            value={reviewData.resume_score}
            onChange={handleChange}
            min={0}
            max={10}
            className={`w-full border border-gray-300 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
              errors.resume_score ? "border-red-500" : ""
            }
            }`}
          />
          {errors.resume_score && (
            <span className="text-xs text-red-500">{errors.resume_score}</span>
          )}
        </label>
        <label className="flex-1 text-sm font-medium text-gray-700">
          Essay &quote;Why A2SV&quote; Score:
          <input
            type="number"
            name="essay_why_a2sv_score"
            value={reviewData.essay_why_a2sv_score}
            onChange={handleChange}
            min={0}
            max={10}
            className={`w-full border border-gray-300 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
              errors.essay_why_a2sv_score ? "border-red-500" : ""
            }
            }`}
          />
          {errors.essay_why_a2sv_score && (
            <span className="text-xs text-red-500">
              {errors.essay_why_a2sv_score}
            </span>
          )}
        </label>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-3">
        <label className="flex-1 text-sm font-medium text-gray-700">
          Essay &quote;About You&quote; Score:
          <input
            type="number"
            name="essay_about_you_score"
            value={reviewData.essay_about_you_score}
            onChange={handleChange}
            min={0}
            max={10}
            className={`w-full border border-gray-300 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
              errors.essay_about_you_score ? "border-red-500" : ""
            }
            }`}
          />
          {errors.essay_about_you_score && (
            <span className="text-xs text-red-500">
              {errors.essay_about_you_score}
            </span>
          )}
        </label>
        <label className="flex-1 text-sm font-medium text-gray-700">
          Technical Interview Score:
          <input
            type="number"
            name="technical_interview_score"
            value={reviewData.technical_interview_score}
            onChange={handleChange}
            min={0}
            max={10}
            className={`w-full border border-gray-300 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
              errors.technical_interview_score ? "border-red-500" : ""
            }
            }`}
          />
          {errors.technical_interview_score && (
            <span className="text-xs text-red-500">
              {errors.technical_interview_score}
            </span>
          )}
        </label>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-3">
        <label className="flex-1 text-sm font-medium text-gray-700">
          Behavioral Interview Score:
          <input
            type="number"
            name="behavioral_interview_score"
            value={reviewData.behavioral_interview_score}
            onChange={handleChange}
            min={0}
            max={10}
            className={`w-full border border-gray-300 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
              errors.behavioral_interview_score ? "border-red-500" : ""
            }
            }`}
          />
          {errors.behavioral_interview_score && (
            <span className="text-xs text-red-500">
              {errors.behavioral_interview_score}
            </span>
          )}
        </label>
      </div>
      <label className="block mb-3 text-sm font-medium text-gray-700">
        Interview Notes:
        <textarea
          name="interview_notes"
          value={reviewData.interview_notes}
          onChange={handleChange}
          className={`w-full border border-gray-300 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
            errors.interview_notes ? "border-red-500" : ""
          }
          }`}
          rows={2}
        />
        {errors.interview_notes && (
          <span className="text-xs text-red-500">{errors.interview_notes}</span>
        )}
      </label>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 mt-4 rounded hover:bg-indigo-700 font-semibold shadow"
      >
        Save & Submit Review
      </button>
    </form>
  </div>
);

export default EvaluationForm;
