"use client";

import React from "react";

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
  onSubmit: (e: React.FormEvent) => void;
}

export default function UpdateCycleForm({
  formData,
  setFormData,
  onCancel,
  onSubmit,
}: UpdateCycleFormProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <form
        onSubmit={onSubmit}
        className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg"
      >
        <h2 className="text-xl font-bold mb-4">Update Cycle</h2>

        <label className="block mb-2">
          Name:
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border rounded px-3 py-2 mt-1"
            required
          />
        </label>

        <label className="block mb-2">
          Start Date:
          <input
            type="date"
            value={formData.start_date}
            onChange={(e) =>
              setFormData({ ...formData, start_date: e.target.value })
            }
            className="w-full border rounded px-3 py-2 mt-1"
            required
          />
        </label>

        <label className="block mb-2">
          End Date:
          <input
            type="date"
            value={formData.end_date}
            onChange={(e) =>
              setFormData({ ...formData, end_date: e.target.value })
            }
            className="w-full border rounded px-3 py-2 mt-1"
            required
          />
        </label>

        <label className="block mb-4">
          Description:
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full border rounded px-3 py-2 mt-1"
          />
        </label>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
