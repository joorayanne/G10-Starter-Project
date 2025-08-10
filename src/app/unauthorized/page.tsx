'use client'; 

import { useRouter } from 'next/navigation';

export default function UnauthorizedPage() {
  const router = useRouter();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      
      router.push('/'); 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-6xl font-bold text-indigo-600 mb-4">
        Unauthorized
      </h1>
      <p className="text-lg text-gray-600 max-w-md text-center mb-8">
        You do not have permission to view this page. Please contact support if you believe this is an error.
      </p>
      <button
        onClick={handleGoBack}
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        Go Back
      </button>
    </div>
  );
}