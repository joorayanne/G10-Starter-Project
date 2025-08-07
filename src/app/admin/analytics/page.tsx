"use client";

import React from "react";
import Navbar from "@/components/admin/Navbar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const funnelData = [
  { name: "Applied", value: 1204 },
  { name: "Under Review", value: 790 },
  { name: "Interview", value: 280 },
  { name: "Accepted", value: 82 },
];

const universityData = [
  { name: "AAU", value: 47.42 },
  { name: "ASTU", value: 28.67 },
  { name: "AAiT", value: 23.91 },
];

const geoData = [
  { name: "Ethiopia", value: 900 },
  { name: "Kenya", value: 150 },
  { name: "Ghana", value: 120 },
  { name: "Nigeria", value: 54 },
];

const COLORS = ["#4F46E5", "#6366F1", "#A5B4FC"];

const AnalyticsPage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="px-32 py-10">
        <h1 className="font-bold text-2xl">Application Analytics</h1>
        <p className="text-gray-400 mb-6">
          Insights for the G7 November Intake
        </p>

        {/* Stats Boxes */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow-md rounded-xl p-6">
            <p className="text-gray-500 text-sm mb-2">Total Applicants</p>
            <p className="text-2xl font-bold">1,204</p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6">
            <p className="text-gray-500 text-sm mb-2">Acceptance Rate</p>
            <p className="text-2xl font-bold">6.8%</p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6">
            <p className="text-gray-500 text-sm mb-2">Avg. Review Time</p>
            <p className="text-2xl font-bold">3.2 Days</p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Application Funnel */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <p className="text-gray-700 font-medium mb-2">Application Funnel</p>
            <p className="text-sm text-gray-400 mb-4">
              This chart visualizes the applicant’s journey from submission to
              acceptance.
            </p>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={funnelData}
                layout="vertical"
                margin={{ left: 20 }}
              >
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <Tooltip />
                <Bar dataKey="value" fill="#4F46E5" barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* University Distribution */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <p className="text-gray-700 font-medium mb-2">
              University Distribution
            </p>
            <p className="text-sm text-gray-400 mb-4">
              Breakdown of applicants by their university.
            </p>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={universityData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  label={({ name, percent }) =>
                    `${name}: ${((percent ?? 0) * 100).toFixed(1)}%`
                  }
                >
                  {universityData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <p className="text-gray-700 font-medium mb-2">
            Geographic Distribution
          </p>
          <p className="text-sm text-gray-400 mb-4">
            Shows the number of applicants from each country.
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={geoData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#A5B4FC" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
};

export default AnalyticsPage;
