"use client";

import Navbar from "../../../components/admin/Navbar";
import React, { useEffect, useState } from "react";
import { User } from "@/types/users";
import logo from "../../../../public/images/logo.png";
import Image from "next/image";
import { getAccessToken } from "@/app/auth/authHelpers";

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const data = {
    users: users,
    total_count: totalCount,
    page: currentPage,
    limit: limit,
  };
  useEffect(() => {
    fetchUsers();
  }, [currentPage, limit, searchQuery, selectedRole]);
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedRole]);
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const apiUrl ="https://a2sv-application-platform-backend-team10.onrender.com";
      const url = new URL("/admin/users", apiUrl);
      url.searchParams.append("page", currentPage.toString());
      url.searchParams.append("limit", limit.toString());
      if (searchQuery) url.searchParams.append("search", searchQuery);
      if (selectedRole) url.searchParams.append("role", selectedRole);

      const response = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          "Content-Type": "application/json",
        },
      });

      const text = await response.text();
      let result;
      try {
        result = JSON.parse(text);
      } catch (err) {
        console.error("❌ Invalid JSON from API:", text);
        throw new Error("Malformed response from server");
      }

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to fetch users");
      }

      if (!result.data || !Array.isArray(result.data.users)) {
        console.error("⚠️ Unexpected structure:", result.data);
        throw new Error("Malformed response: Missing 'users'");
      }

      setUsers(result.data.users);
      setTotalCount(result.data.total_count || 0);
    } catch (err: unknown) {
      setUsers([]); 
      setTotalCount(0);
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching users"
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error)
    return <div className="text-center mt-8 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      
      <div className="p-6 px-30">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">User Management</h2>
            <p className="text-gray-600 mb-4">
              Administer and manage all users on the platform.
            </p>
          </div>
          <a href="/CreateUser">
            <button className="bg-blue-600 text-white border rounded hover:bg-blue-700 px-4 py-2">
              Create New User
            </button>
          </a>
        </div>
        <div className="mb-4 flex space-x-4">
          <input
            type="text"
            placeholder=" Search users by name or email..."
            className="border p-2 rounded w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="border p-2 rounded text-gray-700"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="">All Roles</option>
            <option value="Applicant">Applicant</option>
            <option value="Reviewer">Reviewer</option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <table className="w-full bg-white shadow rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">NAME</th>
              <th className="p-3">ROLE</th>
              <th className="p-3">STATUS</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center p-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-3">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={logo}
                      alt="avatar"
                      className="rounded-full"
                      width={40}
                      height={40}
                    />
                    <div>
                      <div className="font-medium text-gray-900">
                        {user.full_name}
                      </div>
                      <div className="text-gray-500 text-sm">{user.email}</div>
                    </div>
                  </div>
                </td>

                <td className="p-3">{user.role}</td>
                <td className="p-3">
                  {/* <span
                    className={`px-3 py-1 text-xs rounded-full font-semibold ${
                      user.status === "Active"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {user.status}
                  </span> */}
                </td>

                <td className="p-3 ">
                  <a
                    href={`/EditUser/${user.id}`}
                    className="text-blue-600 hover:underline mr-3 pl-16"
                  >
                    Edit
                  </a>

                  <a href="#" className="text-red-600 hover:underline">
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-gray-600">
            Showing {(currentPage - 1) * limit + 1} to{" "}
            {Math.min(currentPage * limit, totalCount)} of {totalCount} results
          </p>
          <div className="space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>
            {limit > 0 &&
              Array.from(
                { length: Math.ceil(totalCount / limit) || 0 },
                (_, i) => i + 1
              ).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 bg-gray-200 rounded ${
                    currentPage === page ? "bg-blue-600 text-white" : ""
                  }`}
                >
                  {page}
                </button>
              ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === Math.ceil(totalCount / limit)}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default UserManagement;
