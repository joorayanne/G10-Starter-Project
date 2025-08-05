'use client';

interface CycleCardProps {
  title: string;
  description: string;
  country: string;
  status: 'Active' | 'Closed';
}

export default function CycleCard({ title, description, country, status }: CycleCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-5 relative hover:shadow-md transition">
      <div className="absolute top-4 right-4">
        <span
          className={`px-2 py-1 text-xs rounded-md font-semibold ${
            status === 'Active'
              ? 'bg-green-100 text-green-700'
              : 'bg-indigo-100 text-indigo-700'
          }`}
        >
          {status === 'Active' ? 'Active' : 'close'}
        </span>
      </div>

      <h2 className="text-lg font-semibold text-gray-800 mb-1">{title}</h2>
      <p className="text-sm text-gray-600 mb-3">{description}</p>

      <div className="flex justify-between text-sm text-gray-600">
        <p>
          <span className="font-medium">Country:</span> {country}
        </p>
        <p>
          <span className="font-medium">Status:</span>{' '}
          <span
            className={`${
              status === 'Active'
                ? 'text-green-600 font-semibold'
                : 'text-gray-500'
            }`}
          >
            {status}
          </span>
        </p>
      </div>
    </div>
  );
}
