'use client';

import { useEffect, useState } from 'react';
import CycleCard from '@/app/admin/components/CycleCard';
import Link from 'next/link';
import { Cycle } from '@/types/cycle';

export default function CyclesPage() {
  const [cycles, setCycles] = useState<Cycle[]>([]);

  useEffect(() => {
    async function fetchCycles() {
      const res = await fetch('https://a2sv-application-platform-backend-team10.onrender.com/cycles/', {
        cache: 'no-store',
      });
      const data = await res.json();
      setCycles(data.data?.cycles || []);
    }

    fetchCycles();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Application Cycles</h1>
          <Link href="/admin/CreateCycles">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md">
              Create New Cycle
            </button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {cycles.map((cycle) => (
            <CycleCard key={cycle.id} cycle={cycle} />
          ))}
        </div>

        <div className="flex justify-between items-center text-sm text-gray-600">
          <p>Showing 1 to {cycles.length} of {cycles.length} results</p>
          <div className="flex items-center gap-2">
            <button className="border rounded px-2 py-1">&lt;</button>
            <button className="border rounded px-3 py-1 bg-indigo-50 text-indigo-600">1</button>
            <button className="border rounded px-3 py-1">2</button>
            <button className="border rounded px-3 py-1">3</button>
            <button className="border rounded px-2 py-1">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
}
