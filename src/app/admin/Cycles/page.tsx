"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import CycleCard from "@/components/admin/CycleCard";
import Link from "next/link";
import { Cycle } from "@/types/cycle";

export default function CyclesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

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

    if (status === "unauthenticated") {
      router.push("/signin");
      return;
    }

    if (status === "authenticated") {
      const fetchCycles = async () => {
        if (!session.accessToken || session.error === "RefreshAccessTokenError") {
          router.push("/signin");
          return;
        }

        try {
          const res = await fetch(
            "https://a2sv-application-platform-backend-team10.onrender.com/cycles/",
            {
              cache: "no-store",
              headers: {
                Authorization: `Bearer ${session.accessToken}`,
              },
            }
          );

          if (res.ok) {
            const data = await res.json();
            setCycles(data.data?.cycles || []);
          } else {
            console.error("Failed to fetch cycles");
            setCycles([]);
          }
        } catch (error) {
          console.error("An error occurred while fetching cycles:", error);
          setCycles([]);
        }
      };

      fetchCycles();
    }
  }, [session, status, router]);

  const handleSelectCycle = (cycleId: number) => {
    const cycleIdString = cycleId.toString();
    setSelectedCycleId(cycleIdString);
    localStorage.setItem("activeCycleId", cycleIdString);
  };

  const totalPages = Math.ceil(cycles.length / cyclesPerPage);
  const indexOfLastCycle = currentPage * cyclesPerPage;
  const indexOfFirstCycle = indexOfLastCycle - cyclesPerPage;
  const currentCycles = cycles.slice(indexOfFirstCycle, indexOfLastCycle);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">
            Application Cycles
          </h1>
          <Link href="/admin/create-cycles">
            <button className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-medium rounded-lg shadow hover:from-indigo-700 hover:to-indigo-800 transform hover:scale-[1.02] transition-all duration-200">
              + Create New Cycle
            </button>
          </Link>
        </div>

        {/* Cycle Cards */}
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
            <div className="col-span-full text-center py-10 text-gray-500 bg-white rounded-lg shadow">
              No cycles available. Please create one.
            </div>
          )}
        </div>

        {/* Pagination */}
        {cycles.length > cyclesPerPage && (
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600 gap-4">
            <p>
              Showing {indexOfFirstCycle + 1} to{" "}
              {Math.min(indexOfLastCycle, cycles.length)} of {cycles.length} results
            </p>
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                &lt;
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  className={`px-3 py-1.5 rounded transition-all ${
                    currentPage === i + 1
                      ? "bg-indigo-600 text-white shadow"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                  onClick={() => goToPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                &gt;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
