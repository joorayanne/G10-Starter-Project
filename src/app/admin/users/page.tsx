"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types/users";
import person from "../../../../public/images/person.jpg";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";

const API_BASE =
  "https://a2sv-application-platform-backend-team10.onrender.com";

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  const [selectedRole, setSelectedRole] = useState<string>("");

  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modal state for delete confirmation
  const [pendingDeleteUser, setPendingDeleteUser] = useState<User | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Debounce the search input to avoid many rapid requests
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery.trim());
    }, 300); // 300ms debounce
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Fetch function (accepts page override)
  const fetchUsers = useCallback(
    async (pageOverride?: number) => {
      if (!session?.accessToken) return;

      const page = pageOverride ?? currentPage;

      setLoading(true);
      setError(null);

      try {
        const url = new URL("/admin/users/", API_BASE);
        url.searchParams.append("page", page.toString());
        url.searchParams.append("limit", limit.toString());
        if (debouncedSearch) url.searchParams.append("search", debouncedSearch);
        if (selectedRole) url.searchParams.append("role", selectedRole);

        // Debug: show url in console
        console.log("Fetching users:", url.toString());

        const controller = new AbortController();
        const response = await fetch(url.toString(), {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            "Content-Type": "application/json",
          },
          signal: controller.signal,
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          if (response.status === 401 || response.status === 403) {
            throw new Error(
              "Session expired or you do not have permission. Please sign in again."
            );
          }
          throw new Error(result.message || "Failed to fetch users");
        }

        if (!result.data || !Array.isArray(result.data.users)) {
          // Defensive check
          throw new Error("Malformed response from server");
        }

        setUsers(result.data.users);
        setTotalCount(result.data.total_count ?? result.data.users.length);
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
    },
    // dependencies
    [session?.accessToken, currentPage, limit, debouncedSearch, selectedRole]
  );

  // Single effect: react to page/filters/search.
  // If a filter/search change and page !== 1 -> set page to 1 (so next render triggers fetch).
  // If already page === 1 -> fetch immediately.
  useEffect(() => {
    if (sessionStatus !== "authenticated") return;

    // If user changed filters or search and we're not on page 1, jump to page 1 first.
    if ((debouncedSearch || selectedRole) && currentPage !== 1) {
      setCurrentPage(1);
      return; // wait for currentPage change to trigger fetch
    }

    // Otherwise fetch for current page (covers page changes and the case where page==1 after search)
    fetchUsers(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionStatus, debouncedSearch, selectedRole, currentPage]);

  // Delete flow: open modal
  const requestDelete = (user: User) => {
    setPendingDeleteUser(user);
  };

  // Confirm and perform deletion
  const confirmDelete = async () => {
    if (!pendingDeleteUser || sessionStatus !== "authenticated") {
      setPendingDeleteUser(null);
      return;
    }

    setDeleting(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? API_BASE;
      const response = await fetch(
        `${apiUrl}/admin/users/${pendingDeleteUser.id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to delete user");
      }

      // Remove user locally
      setUsers((prev) => prev.filter((u) => u.id !== pendingDeleteUser.id));
      setTotalCount((prev) => Math.max(0, prev - 1));

      // If after deletion there are no items on this page and we're beyond page 1, go back a page
      const totalPages = Math.max(1, Math.ceil((totalCount - 1) / limit));
      if (currentPage > totalPages) {
        setCurrentPage(totalPages);
      }

      setPendingDeleteUser(null);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Error deleting user";
      setError(message);
    } finally {
      setDeleting(false);
    }
  };

  const cancelDelete = () => {
    setPendingDeleteUser(null);
  };

  const handlePageChange = (page: number) => {
    if (page < 1) return;
    setCurrentPage(page);
  };

  // prevent default Enter behavior (in case your page has forms)
  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") e.preventDefault();
  };

  // Session checks
  if (sessionStatus === "loading") {
    return <div className="text-center mt-8">Verifying session...</div>;
  }

  if (sessionStatus === "unauthenticated") {
    router.push("/auth/signin");
    return <div className="text-center mt-8">Redirecting to sign-in...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">User Management</h2>
            <p className="text-gray-600">Administer and manage all users.</p>
          </div>
          <Link href="Create-user">
            <button className="bg-blue-600 text-white border rounded-lg hover:bg-blue-700 px-4 py-2">
              Create New User
            </button>
          </Link>
        </div>

        <div className="mb-4 flex flex-col sm:flex-row gap-4">
          <div className="relative w-full sm:flex-grow">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              className="pl-10 pr-4 py-2 border rounded-md w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={onInputKeyDown}
              aria-label="Search users"
            />
          </div>
          <select
            className="border py-2 px-4 rounded-md text-gray-700"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            aria-label="Filter by role"
          >
            <option value="">All Roles</option>
            <option value="applicant">Applicant</option>
            <option value="reviewer">Reviewer</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {loading && <div className="text-center p-4">Loading users...</div>}
        {error && (
          <div className="text-center p-4 text-red-600 bg-red-50 rounded-md">
            Error: {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="overflow-x-auto">
              <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-100 text-left">
                  <tr>
                    <th className="p-3">NAME</th>
                    <th className="p-3">ROLE</th>
                    <th className="p-3">STATUS</th>
                    <th className="p-3">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center p-4 text-gray-500">
                        No users found.
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr
                        key={user.id as React.Key}
                        className="border-t hover:bg-gray-50"
                      >
                        <td className="p-3">
                          <div className="flex items-center space-x-3">
                            <Image
                              src={person}
                              alt="avatar"
                              className="rounded-full object-cover"
                              width={40}
                              height={40}
                            />
                            <div>
                              <div className="font-medium">
                                {user.full_name}
                              </div>
                              <div className="text-gray-500 text-sm">
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 capitalize">{user.role}</td>
                        <td className="p-3">
                          <span className="px-3 py-1 text-xs rounded-full font-semibold bg-green-100 text-green-800">
                            Active
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex space-x-4">
                            <a
                              href={`edit-user/${user.id}`}
                              className="text-blue-600 hover:underline"
                            >
                              Edit
                            </a>
                            <button
                              onClick={() => requestDelete(user)}
                              className="text-red-600 hover:underline"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row justify-between items-center">
              <p className="text-sm text-gray-600">
                Showing {(currentPage - 1) * limit + 1} to{" "}
                {Math.min(currentPage * limit, totalCount)} of {totalCount}{" "}
                results
              </p>
              <div className="space-x-1 flex items-center">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-3 py-1 text-sm">
                  Page {currentPage} of {Math.ceil(totalCount / limit) || 1}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= Math.ceil(totalCount / limit)}
                  className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Delete confirmation modal */}
      {pendingDeleteUser && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 bg-black opacity-40"
            onClick={cancelDelete}
          />
          <div className="bg-white rounded-lg shadow-xl z-60 p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-2">Are you sure?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Do you really want to delete{" "}
              <span className="font-medium">{pendingDeleteUser.full_name}</span>
              ? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Yes, delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
