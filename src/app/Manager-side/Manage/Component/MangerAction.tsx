'use client';
import React, { useState } from 'react';

const ManagerActions = () => {
  const [reviewer, setReviewer] = useState("Jane R.");

  const handleConfirm = () => {
    alert(`Reviewer ${reviewer} assigned`);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md w-full max-w-sm">
      <h2 className="font-bold text-lg mb-4">Manager Actions</h2>
      <label className="block mb-2">Assign Reviewer</label>
      <input
        value={reviewer}
        onChange={(e) => setReviewer(e.target.value)}
        className="w-full px-3 py-2 border rounded-md mb-4"
      />
      <button onClick={handleConfirm} className="bg-blue-600 text-white px-4 py-2 rounded mb-6">Confirm</button>

      <div className="border-t pt-4">
        <h3 className="font-semibold mb-2">Final Decision</h3>
        <p className="text-sm mb-4">This action is final and will notify the applicant.</p>
        <div className="flex gap-2">
          <button className="bg-red-600 text-white px-4 py-2 rounded">Reject</button>
          <button className="bg-green-600 text-white px-4 py-2 rounded">Accept</button>
        </div>
      </div>
    </div>
  );
};

export default ManagerActions;
