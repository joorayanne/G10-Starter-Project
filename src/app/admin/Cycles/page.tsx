"use client";

import { useEffect, useState } from "react";
import CycleCard from "@/components/admin/CycleCard";
import Link from "next/link";
import { Cycle } from "@/types/cycle";

export default function CyclesPage() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [selectedCycleId, setSelectedCycleId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const cyclesPerPage = 6;

  useEffect(() => {
    const savedCycleId =
      typeof window !== "undefined"
        ? localStorage.getItem("activeCycleId")
        : null;
    if (savedCycleId) {
      setSelectedCycleId(savedCycleId);
    }

    async function fetchCycles() {
      const res = await fetch(
        "https://a2sv-application-platform-backend-team10.onrender.com/cycles/",
        { cache: "no-store" }
      );
      const data = await res.json();
      setCycles(data.data?.cycles || []);
    }

    fetchCycles();
  }, []);

  const handleSelectCycle = (cycleId: number) => {
    const cycleIdString = cycleId.toString();
    setSelectedCycleId(cycleIdString);
    localStorage.setItem("activeCycleId", cycleIdString);
  };

  // Pagination logic
  const totalPages = Math.ceil(cycles.length / cyclesPerPage);
  const indexOfLastCycle = currentPage * cyclesPerPage;
  const indexOfFirstCycle = indexOfLastCycle - cyclesPerPage;
  const currentCycles = cycles.slice(indexOfFirstCycle, indexOfLastCycle);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Application Cycles</h1>
          <Link href="/admin/create-cycles">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md">
              Create New Cycle
            </button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {currentCycles.length > 0 ? (
            currentCycles.map((cycle) => (
              <CycleCard
                key={cycle.id}
                cycle={cycle}
                isSelected={selectedCycleId === cycle.id.toString()}
                onSelect={handleSelectCycle}
              />
            ))
          ) : (
            <p>No cycles available. Please create one.</p>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center text-sm text-gray-600">
          <p>
            Showing {indexOfFirstCycle + 1} to{" "}
            {Math.min(indexOfLastCycle, cycles.length)} of {cycles.length} results
          </p>
          <div className="flex items-center gap-2">
            <button
              className="border rounded px-2 py-1"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`border rounded px-3 py-1 ${
                  currentPage === i + 1
                    ? "bg-indigo-50 text-indigo-600"
                    : ""
                }`}
                onClick={() => goToPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="border rounded px-2 py-1"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
