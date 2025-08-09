"use client";

import React from "react";
import toast from "react-hot-toast";

interface UpdateCycleFormProps {
  formData: {
    name: string;
    start_date: string;
    end_date: string;
    description: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      start_date: string;
      end_date: string;
      description: string;
    }>
  >;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent) => Promise<void> | void;
}

export default function UpdateCycleForm({
  formData,
  setFormData,
  onCancel,
  onSubmit,
}: UpdateCycleFormProps) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(e);
    toast.success("Cycle updated successfully! 🎉", {
      position: "bottom-right",
      style: {
        background: "#1f2937",
        color: "#fff",
        borderRadius: "8px",
        padding: "12px 16px",
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg animate-fadeIn"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Update Cycle</h2>

        {/* Name */}
        <label className="block mb-2 text-gray-700 font-medium">
          Name:
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </label>

        {/* Start Date */}
        <label className="block mb-2 text-gray-700 font-medium">
          Start Date:
          <input
            type="date"
            value={formData.start_date}
            onChange={(e) =>
              setFormData({ ...formData, start_date: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </label>

        {/* End Date */}
        <label className="block mb-2 text-gray-700 font-medium">
          End Date:
          <input
            type="date"
            value={formData.end_date}
            onChange={(e) =>
              setFormData({ ...formData, end_date: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </label>

        {/* Description */}
        <label className="block mb-4 text-gray-700 font-medium">
          Description:
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-indigo-500 text-white font-medium hover:bg-indigo-700 active:scale-95 shadow-md transition-all"
          >
             Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
