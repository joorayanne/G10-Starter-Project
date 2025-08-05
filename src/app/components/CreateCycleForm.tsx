'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CreateCycleForm() {
  const [form, setForm] = useState({
    cycleName: '',
    country: '',
    startDate: '',
    endDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-10 rounded shadow">
      {/* Navigation Button to /admin/cycles */}
      <div className="flex justify-end mb-6">
        <Link href="/admin/Cycles" passHref>
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
            ← Back to Cycles
          </button>
        </Link>
      </div>

      <h1 className="text-2xl font-semibold text-gray-800 mb-2">Create new cycle</h1>
      <p className="text-gray-500 mb-6">Use this form to create a new cycle and assign periods.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Cycle name</label>
          <input
            type="text"
            name="cycleName"
            value={form.cycleName}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter cycle name"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Country</label>
          <input
            type="text"
            name="country"
            value={form.country}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter country"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Start date</label>
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">End date</label>
          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end space-x-4">
        <button className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100">
          Cancel
        </button>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
          Save Cycle
        </button>
      </div>
    </div>
  );
}
