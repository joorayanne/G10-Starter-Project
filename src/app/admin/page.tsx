'use client';

import Link from 'next/link';
import AdminNavbar from '../components/admin_Navbar';

export default function AdminDashboardPage() {
  return (

    <main>
      <h1 className="text-3xl font-bold text-black-700 mb-8">Admin Command Center</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-gradient-to-r from-purple-300 to-indigo-500 text-white rounded-xl p-6 shadow">
          <p className="text-sm mb-2">Total Users</p>
          <h2 className="text-3xl font-bold">125</h2>
        </div>

        <div className="bg-gradient-to-r from-green-300 to-emerald-600 text-white rounded-xl p-6 shadow">
          <p className="text-sm mb-2">Total Applicants (G7)</p>
          <h2 className="text-3xl font-bold">1,204</h2>
        </div>

        <div className="bg-gradient-to-r from-orange-300 to-amber-600 text-white rounded-xl p-6 shadow">
          <p className="text-sm mb-2">Active Cycles</p>
          <h2 className="text-3xl font-bold">1</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow">
          <h3 className="text-lg font-semibold mb-2">Manage Users</h3>
          <p className="mb-4 text-sm text-gray-600">Create, edit, and manage user accounts and roles.</p>
          <Link href="/admin/users">
            <p className="px-1 py-2 text-indigo-600 hover:text-indigo-900 rounded font-bold  text-sm">Go to Users →</p>
          </Link>
        </div>

        <div className="bg-white rounded-xl p-6 shadow">
          <h3 className="text-lg font-semibold mb-2">Manage Cycles</h3>
          <p className="mb-4 text-sm text-gray-600">Create and manage application cycles.</p>
          <Link href="/admin/Cycles">
            <p className="px-1 py-2 text-indigo-600 font-bold  rounded hover:text-indigo-900 text-sm">Go to Cycles →</p>
          </Link>
        </div>

        <div className="bg-white rounded-xl p-6 shadow">
          <h3 className="text-lg font-semibold mb-2">Recent Admin Activity</h3>
          <ul className="text-sm text-gray-700 list-disc list-inside space-y-2">
          <li>New user “Jane R.” created <span className="text-xs text-gray-500">(2 hours ago)</span></li>
          <li>Cycle “G7 November” set to active <span className="text-xs text-gray-500">(1 day ago)</span></li>
        </ul>
          
        </div>
      </div>

      <div className="mt-10 w-1/2 mx-auto bg-white rounded-xl p-6 shadow">
        <h3 className="text-lg font-semibold mb-4">View Analytics</h3>
        <p className="mb-4 text-sm text-gray-600">Explore application data and platform insights.</p>
        <Link href="/admin/analytics">
            <p className="px-1 py-2 text-indigo-600  font-bold rounded hover:text-indigo-900 text-sm">Go to Analytics →</p>
          </Link>
      </div>
    </main>
  );
}
