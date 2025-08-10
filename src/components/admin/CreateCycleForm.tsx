"use client";

import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function CreateCycleForm() {
  const initialForm = {
    name: '',
    start_date: '',
    end_date: '',
    description: ''
  };

  const { data: session, status } = useSession();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    if (status !== 'authenticated' || !session) {
      setError('You must be logged in to create a cycle.');
      setLoading(false);
      return;
    }

    if (session?.error === 'RefreshAccessTokenError') {
      setError('Your session has expired. Please sign in again.');
      setLoading(false);
      return;
    }

    try {
      const token = session?.accessToken;

      const res = await fetch(
        "https://a2sv-application-platform-backend-team10.onrender.com/admin/cycles/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data?.message || "Failed to create cycle");
      } else {
        setMessage('✅ Cycle created successfully!');
        setForm(initialForm);
      }
    } catch (err) {
      console.error("Unexpected error:", err); // Log for debugging
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-md max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-2">Create New Cycle</h1>
      <p className="text-gray-500 mb-6">Fill out the form below to create a new cycle and assign periods.</p>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {message && <p className="text-green-600 mb-4">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Cycle Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cycle Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter cycle name"
            required
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              name="start_date"
              value={form.start_date}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              name="end_date"
              value={form.end_date}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter cycle description"
            rows={4}
            required
          />
        </div>

        {/* Submit Button */}
        <div className='flex justify-end mt-2'> 
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-1  rounded-md text-white text-sm font-medium transition ${
              loading
                ? 'bg-indigo-300 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {loading ? 'Creating...' : 'Create Cycle'}
          </button>
        </div>
      </form>
    </div>
  );
}