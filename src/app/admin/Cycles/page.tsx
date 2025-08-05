'use client';

import { useState } from 'react';
import CycleCard from '@/app/components/CycleCard';
import Link from 'next/link';

interface Cycle {
  title: string;
  description: string;
  country: string;
  status: 'Active' | 'Closed';
}

const cycles: Cycle[] = [
  {
    title: 'G7 November Intake',
    description: 'The seventh generation of A2SVians, November intake.',
    country: 'Ethiopia',
    status: 'Active',
  },
  {
    title: 'G6 May Intake',
    description: 'The sixth generation of A2SVians, May intake.',
    country: 'Kenya',
    status: 'Closed',
  },
  {
    title: 'G5 November Intake',
    description: 'The fifth generation of A2SVians, November intake.',
    country: 'Ghana',
    status: 'Closed',
  },
  {
    title: 'G4 May Intake',
    description: 'The fourth generation of A2SVians, May intake.',
    country: 'Nigeria',
    status: 'Closed',
  },
];

export default function CyclesPage() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Application Cycles</h1>
          <Link href= '/admin/CreateCycles'>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md">
            Create New Cycle
          </button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {cycles.map((cycle, index) => (
            <CycleCard
              key={index}
              title={cycle.title}
              description={cycle.description}
              country={cycle.country}
              status={cycle.status}
            />
          ))}
        </div>

        <div className="flex justify-between items-center text-sm text-gray-600">
          <p>Showing 1 to 4 of 12 results</p>
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
