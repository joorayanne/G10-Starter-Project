"use client";
import { getAccessToken } from "../../auth/authHelpers";
import React, { useEffect, useState, useCallback } from "react";
import { User } from "@/types/users";
import person from "../../../../public/images/person.jpg";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";

interface UserResponse {
  success: boolean;
  data: {
    users: User[];
    total_count: number;
    page: number;
    limit: number;
  };
  message: string;
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(5); // Remove setLimit since it's unused
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>("");

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL ||
        "https://a2sv-application-platform-backend-team10.onrender.com";
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
      let result: UserResponse;
      try {
        result = JSON.parse(text);
      } catch (parseError) {
        console.error("❌ Invalid JSON from API:", parseError, text); // Log for debugging
        throw new Error("Malformed response from server");
      }

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to fetch users");
      }

      if (!result.data || !Array.isArray(result.data.users)) {
        console.error("⚠️ Unexpected structure:", result.data);
        throw new Error("Malformed response: Missing 'users'");
      }

      let filteredUsers = result.data.users;
      if (selectedRole) {
        filteredUsers = filteredUsers.filter((user: User) => user.role === selectedRole);
      }

      setUsers(filteredUsers);
      setTotalCount(result.data.total_count || filteredUsers.length);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred while fetching users";
      setUsers([]);
      setTotalCount(0);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [currentPage, limit, searchQuery, selectedRole]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]); // Updated to rely on useCallback dependencies

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedRole]);

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  const handleDelete = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL ||
        "https://a2sv-application-platform-backend-team10.onrender.com";

      const response = await fetch(`${apiUrl}/admin/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to delete user");
      }

      setUsers((prev) => prev.filter((user) => user.id !== userId));
      setTotalCount((prev) => prev - 1);
    } catch (err: unknown) {
      // Type guard to safely access message
      let errorMessage = "Error deleting user";
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === "object" && err !== null && "message" in err) {
        errorMessage = (err as { message: string }).message;
      }
      alert(errorMessage);
    }
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-600">{error}</div>;

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
            <button className="bg-blue-600 text-white border rounded-[8px] hover:bg-blue-700 px-4 py-2">
              Create New User
            </button>
          </a>
        </div>
        <div className="mb-4 flex space-x-4">
          <div className="relative w-full">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              className="pl-10 pr-4 py-2 border rounded w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="border py-2 px-8 rounded text-gray-700"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="">All Roles</option>
            <option value="applicant">Applicant</option>
            <option value="reviewer">Reviewer</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <table className="w-full bg-white shadow rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">NAME</th>
              <th className="p-3">ROLE</th>
              <th className="p-3"></th> {/* Actions column */}
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center p-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-3">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={person}
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
                <td className="p-4">
                  <div className="flex space-x-5 pl-3">
                    <a
                      href={`/EditUser/${user.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </a>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
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