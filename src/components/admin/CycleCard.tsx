import Link from "next/link";
import { Cycle } from "@/types/cycle";

interface CycleCardProps {
  cycle: Cycle;
  isSelected?: boolean;
  onSelect?: (cycleId: number) => void;
}

export default function CycleCard({ cycle, isSelected = false, onSelect }: CycleCardProps) {
  const isActive = cycle.is_active;
  const statusLabel = isActive ? "Active" : "Closed";
  const startDate = new Date(cycle.start_date).toLocaleDateString();
  const endDate = new Date(cycle.end_date).toLocaleDateString();
  const description = cycle.description

  const handleClick = () => {
    if (onSelect) {
      onSelect(cycle.id);
    }
  };

  return (
    <Link href={`/admin/cycles/${cycle.id}`} onClick={handleClick} className="block">
      <div
        className={`bg-white rounded-lg shadow p-5 relative hover:shadow-md transition ${
          isSelected ? "border-2 border-indigo-600" : ""
        }`}
      >
        <div className="absolute top-4 right-4">
          <span
            className={`px-2 py-1 text-xs rounded-md font-semibold ${
              isActive ? "bg-green-100 text-green-700" : "bg-indigo-100 text-indigo-700"
            }`}
          >
            {statusLabel}
          </span>
        </div>

        <h2 className="text-lg font-semibold text-gray-800 mb-1">{cycle.name}</h2>

        <p className="text-sm text-gray-600 mb-3">
          {cycle.description}
        </p>

        <div className="flex justify-between text-sm text-gray-600">
          <p>
            <span className="font-medium">Start Date:</span> {startDate}
          </p>
          <p>
            <span className="font-medium">End Date:</span> {endDate}
          </p>
        </div>
      </div>
    </Link>
  );
}
