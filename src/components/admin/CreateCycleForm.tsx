'use client';

import { useState } from 'react';
import Link from 'next/link';


export default function CreateCycleForm() {
  const initialForm = {
  name: '',
  start_date: '',
  end_date: '',
  };

  const [form, setForm] = useState(initialForm);



  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const ADMIN_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZWU4NTdmOS0xZGRhLTQ2OTAtYTE0MS03NDU4NmRiMjNhYTEiLCJleHAiOjE3NTQ0Njg0NTEsInR5cGUiOiJhY2Nlc3MifQ.Y5BeL-NUV6pKJZq6qo0djLtfgwsx_Kd3FJs2foMLA_s';
 


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);


    try{
      const res = await fetch("https://a2sv-application-platform-backend-team10.onrender.com/admin/cycles/", {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          Authorization: ADMIN_TOKEN
        },
        body: JSON.stringify(form)
      });

      const data = await res.json()

      if (!res.ok) {
        setError(data?.message || 'Failed to create cycle');
      } else {
        setMessage("Cycle created successfully!");
        alert('Cycle created successfully!');
        setForm(initialForm);
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-10 rounded shadow">

      <h1 className="text-2xl font-semibold text-gray-800 mb-2">Create new cycle</h1>
      <p className="text-gray-500 mb-6">Use this form to create a new cycle and assign periods.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Cycle name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter cycle name"
            required
          />
        </div>


        <div>
          <label className="block text-sm text-gray-700 mb-1">Start date</label>
          <input
            type="date"
            name="start_date"
            value={form.start_date}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">End date</label>
          <input
            type="date"
            name="end_date"
            value={form.end_date}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end space-x-4">
        <button className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100">
          Cancel
        </button>
        <button 
        type="submit"
        onClick={handleSubmit}
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
          Save Cycle
        </button>
      </div>
    </div>
  );
}
