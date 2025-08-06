'use client';
import React from 'react';
import Tags from './tags';
import { useRouter } from 'next/navigation';

const data = [
  ["Abel Tadesse", "2023-11-01", "John Doe", "Pending"],
  ["Marta Gomez", "2023-11-02", "Jane Smith", "Approved"]
];

const AllApplications = () => {
  const router = useRouter();

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    if (value === "review") {
      router.push("/review-page");
    } else if (value === "view-detail") {
      router.push("/details-page");
    }
  };

  return (
    <div className=" bg-white min-w-[40vw] border border-gray-100 shadow-lg rounded-md p-5">
      <div className="md:flex py-2 justify-between">
        <p className="text-2xl font-bold mb-4">All Applications</p>
        <select className="border border-gray-300 bg-gray-200 rounded-md md:mr-8">
          <option value="all">Filter by Status</option>
        </select>
      </div>

      <div className="grid grid-cols-5 md:p-2 gap-3">
        <p className="text-gray-400 font-semibold md:text-sm text-xs">Application ID</p>
        <p className="text-gray-400 font-semibold md:text-sm text-xs">SUBMITTED</p>
        <p className="text-gray-400 font-semibold md:text-sm text-xs">ASSIGNED REVIEWER</p>
        <p className="text-gray-400 font-semibold md:text-sm text-xs">STATUS</p>
        <span></span>

        {data.map((item, index) => (
          <React.Fragment key={index}>
            <p className="text-gray-800 font-semibold text-sm">{item[0]}</p>
            <p className="text-gray-400 font-semibold">{item[1]}</p>
            <p className="text-gray-800 font-semibold text-sm pl-2 pt-2 bg-gray-100">{item[2]}</p>
            <Tags label={item[3]} color="5" />
            <select
              className="text-sm  rounded px-3 py-1 text-blue-500 bg-transparent"
              onChange={handleSelectChange}
              defaultValue=""
            >
              <option value="" disabled hidden className="text-blue-700">
                Action
              </option>
              <option value="review" className=" hover:bg-gray-200 text-black">Review</option>
              <option value="view-detail" className="hover:bg-gray-200  text-black">View Detail</option>
              <option value="assign" className="hover:bg-gray-200 text-black">Assign to Reviewer</option>
            </select>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default AllApplications;
