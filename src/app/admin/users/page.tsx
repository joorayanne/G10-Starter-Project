// "use client";
// import { useSession } from "next-auth/react";
// import React, { useEffect, useState } from "react";
// import { User } from "@/types/users";
// import person from "../../../../public/images/person.jpg";
// import Image from "next/image";
// import { FaSearch } from "react-icons/fa";

// const UserManagement = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [totalCount, setTotalCount] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [limit, setLimit] = useState(5);
//   const [searchQuery, setSearchQuery] = useState("");
  
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedRole, setSelectedRole] = useState<string>("");
//   const { data: session ,status: sessionStatus} = useSession();
//     const router = useRouter();



//   const data = {
//     users: users,
//     total_count: totalCount,
//     page: currentPage,
//     limit: limit,
//   };
//   useEffect(() => {
//     fetchUsers();
//   }, [currentPage, limit, searchQuery, selectedRole]);
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchQuery, selectedRole]);
//   const fetchUsers = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const apiUrl ="https://a2sv-application-platform-backend-team10.onrender.com";
//       const url = new URL("/admin/users", apiUrl);
//       url.searchParams.append("page", currentPage.toString());
//       url.searchParams.append("limit", limit.toString());
//       if (searchQuery) url.searchParams.append("search", searchQuery);
//       if (selectedRole) url.searchParams.append("role", selectedRole);

//       const response = await fetch(url.toString(), {
//         headers: {
//           Authorization: `Bearer ${session?.accessToken}`,
//           "Content-Type": "application/json",
//         },
//       });

//       const text = await response.text();
//       let result;
//       try {
//         result = JSON.parse(text);
//       } catch (err) {
//         console.error("❌ Invalid JSON from API:", text);
//         throw new Error("Malformed response from server");
//       }

//       if (!response.ok || !result.success) {
//         throw new Error(result.message || "Failed to fetch users");
//       }

//       if (!result.data || !Array.isArray(result.data.users)) {
//         console.error("⚠️ Unexpected structure:", result.data);
//         throw new Error("Malformed response: Missing 'users'");
//       }
//       let filteredUsers = result.data.users;
//     if (selectedRole) {
//       filteredUsers = filteredUsers.filter(
//         (user: User) => user.role === selectedRole
//       );
//     }

//     setUsers(filteredUsers);
//     setTotalCount(result.data.total_count || filteredUsers.length);
//   }

      
//      catch (err: unknown) {
//       setUsers([]);
//       setTotalCount(0);
//       setError(
//         err instanceof Error
//           ? err.message
//           : "An error occurred while fetching users"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePageChange = (page: number): void => {
//     setCurrentPage(page);
//   };
//   const handleDelete = async (userId: string) => {
//     if (!confirm("Are you sure you want to delete this user?")) return;

//     try {
//       const apiUrl =
//         process.env.NEXT_PUBLIC_API_URL ||
//         "https://a2sv-application-platform-backend-team10.onrender.com";

//       const response = await fetch(`${apiUrl}/admin/users/${userId}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${session?.accessToken}`,
//           "Content-Type": "application/json",
//         },
//       });

//       const result = await response.json();

//       if (!response.ok || !result.success) {
//         throw new Error(result.message || "Failed to delete user");
//       }

//       // Remove the deleted user from the UI
//       setUsers((prev) => prev.filter((user) => user.id !== userId));
//       setTotalCount((prev) => prev - 1);
//     } catch (err: unknown) {
//       alert(err instanceof Error ? err.message : "Error deleting user");
//     }
//   };
 


//   if (loading) return <div className="text-center mt-8">Loading...</div>;
//   if (error)
//     return <div className="text-center mt-8 text-red-600">{error}</div>;

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="p-6 px-30">
//         <div className="flex justify-between items-center">
//           <div>
//             <h2 className="text-2xl font-bold mb-2">User Management</h2>
//             <p className="text-gray-600 mb-4">
//               Administer and manage all users on the platform.
//             </p>
//           </div>
//           <a href="/CreateUser">
//             <button className="bg-blue-600 text-white border rounded-[8px] hover:bg-blue-700 px-4 py-2">
//               Create New User
//             </button>
//           </a>
//         </div>
//         <div className="mb-4 flex space-x-4">
//           <div className="relative w-full">
//             <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search users by name or email..."
//               className="pl-10 pr-4 py-2 border rounded w-full"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//           <select
//             className="border py-2 px-8 rounded text-gray-700"
//             value={selectedRole}
//             onChange={(e) => setSelectedRole(e.target.value)}
//           >
//             <option value="">All Roles</option>
//             <option value="applicant">Applicant</option>
//             <option value="reviewer">Reviewer</option>
//             <option value="manager">Manager</option>
//             <option value="admin">Admin</option>
//           </select>
//         </div>
//         <table className="w-full bg-white shadow rounded-lg overflow-hidden">
//           <thead>
//             <tr className="bg-gray-200 text-left">
//               <th className="p-3">NAME</th>
//               <th className="p-3">ROLE</th>
//               <th className="p-3">STATUS</th>
//               <th className="p-3"></th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.length === 0 && (
//               <tr>
//                 <td colSpan={4} className="text-center p-4 text-gray-500">
//                   No users found.
//                 </td>
//               </tr>
//             )}
//             {users.map((user) => (
//               <tr key={user.id} className="border-t">
//                 <td className="p-3">
//                   <div className="flex items-center space-x-3">
//                     <Image
//                       src={person}
//                       alt="avatar"
//                       className="rounded-full"
//                       width={40}
//                       height={40}
//                     />
//                     <div>
//                       <div className="font-medium text-gray-900">
//                         {user.full_name}
//                       </div>
//                       <div className="text-gray-500 text-sm">{user.email}</div>
//                     </div>
//                   </div>
//                 </td>

//                 <td className="p-3">{user.role}</td>
//                 <td className="p-3 ">
//                   {
//                     <span
//                       className={`px-3 py-1 text-xs rounded-full font-semibold 
//                       bg-blue-100 text-blue-800
                    
//                     }`}
//                     >
//                       Active
//                     </span>
//                   }
//                 </td>

//                 <td className="p-4">
//                   <div className=" flex space-x-5 pl-3">
//                     <a
//                       href={`/EditUser/${user.id}`}
//                       className="text-blue-600 hover:underline"
//                     >
//                       Edit
//                     </a>
//                     <button
//                       onClick={() => handleDelete(user.id)}
//                       className="text-red-600 hover:underline"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div className="mt-4 flex justify-between items-center">
//           <p className="text-gray-600">
//             Showing {(currentPage - 1) * limit + 1} to{" "}
//             {Math.min(currentPage * limit, totalCount)} of {totalCount} results
//           </p>
//           <div className="space-x-2">
//             <button
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//               className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//             >
//               Previous
//             </button>
//             {limit > 0 &&
//               Array.from(
//                 { length: Math.ceil(totalCount / limit) || 0 },
//                 (_, i) => i + 1
//               ).map((page) => (
//                 <button
//                   key={page}
//                   onClick={() => handlePageChange(page)}
//                   className={`px-3 py-1 bg-gray-200 rounded ${
//                     currentPage === page ? "bg-blue-600 text-white" : ""
//                   }`}
//                 >
//                   {page}
//                 </button>
//               ))}
//             <button
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage === Math.ceil(totalCount / limit)}
//               className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserManagement;
"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation"; // Correct import for App Router
import { User } from "@/types/users";
import person from "../../../../public/images/person.jpg";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";



const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("");

  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  // This state now tracks the data fetching process itself.
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    // A final guard to ensure we don't proceed without a token.
    if (!session?.accessToken) return;

    setLoading(true);
    setError(null);

    try {
      const apiUrl =
        "https://a2sv-application-platform-backend-team10.onrender.com";
      const url = new URL("/admin/users", apiUrl);
      url.searchParams.append("page", currentPage.toString());
      url.searchParams.append("limit", limit.toString());
      if (searchQuery) url.searchParams.append("search", searchQuery);
      if (selectedRole) url.searchParams.append("role", selectedRole);

      const response = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          "Content-Type": "application/json",
        },
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
        console.error("⚠️ Unexpected API response structure:", result.data);
        throw new Error("Malformed response from server");
      }

      setUsers(result.data.users);
      setTotalCount(result.data.total_count || result.data.users.length);
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
  }, [session, currentPage, limit, searchQuery, selectedRole]); // `session` is a dependency

  // This is the main effect that reacts to session changes and filter/pagination changes.
  useEffect(() => {
    if (sessionStatus === "authenticated") {
      fetchUsers();
    }
    // No `else` block is needed, as the render logic below will handle 'loading' and 'unauthenticated' states.
  }, [sessionStatus, fetchUsers]);

  // Effect to reset to page 1 when filters are changed.
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedRole]);

  const handleDelete = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    if (sessionStatus !== "authenticated") {
      alert("Your session has expired. Please refresh the page.");
      return;
    }

    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL ||
        "https://a2sv-application-platform-backend-team10.onrender.com";
      const response = await fetch(`${apiUrl}/admin/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
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
      alert(err instanceof Error ? err.message : "Error deleting user");
    }
  };

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  // -- Render Logic --

  // 1. Show a loading screen while the session is being verified.
  if (sessionStatus === "loading") {
    return <div className="text-center mt-8">Verifying session...</div>;
  }

  // 2. Redirect if the user is unauthenticated.
  if (sessionStatus === "unauthenticated") {
    router.push("/auth/signin"); // Or your login page
    return <div className="text-center mt-8">Redirecting to sign-in...</div>;
  }

  // 3. Render the main component content once authenticated.
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">User Management</h2>
            <p className="text-gray-600">
              Administer and manage all users on the platform.
            </p>
          </div>
          <a href="/CreateUser">
            <button className="bg-blue-600 text-white border rounded-lg hover:bg-blue-700 px-4 py-2 transition-colors">
              Create New User
            </button>
          </a>
        </div>

        <div className="mb-4 flex flex-col sm:flex-row gap-4">
          <div className="relative w-full sm:flex-grow">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              className="pl-10 pr-4 py-2 border rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="border py-2 px-4 rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
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

        {/* Loading and Error states for the data fetch itself */}
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
                    <th className="p-3 font-semibold text-gray-600">NAME</th>
                    <th className="p-3 font-semibold text-gray-600">ROLE</th>
                    <th className="p-3 font-semibold text-gray-600">STATUS</th>
                    <th className="p-3 font-semibold text-gray-600">ACTIONS</th>
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
                      <tr key={user.id} className="border-t hover:bg-gray-50">
                        <td className="p-3 align-middle">
                          <div className="flex items-center space-x-3">
                            <Image
                              src={person}
                              alt="avatar"
                              className="rounded-full object-cover"
                              width={40}
                              height={40}
                            />
                            <div>
                              <div className="font-medium text-gray-900">
                                {user.full_name}
                              </div>
                              <div className="text-gray-500 text-sm">
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 align-middle capitalize">
                          {user.role}
                        </td>
                        <td className="p-3 align-middle">
                          <span className="px-3 py-1 text-xs rounded-full font-semibold bg-green-100 text-green-800">
                            Active
                          </span>
                        </td>
                        <td className="p-3 align-middle">
                          <div className="flex space-x-4">
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
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
              <p className="text-sm text-gray-600">
                Showing {(currentPage - 1) * limit + 1} to{" "}
                {Math.min(currentPage * limit, totalCount)} of {totalCount}{" "}
                results
              </p>
              <div className="space-x-1">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition-colors"
                >
                  Previous
                </button>
                {/* Simplified Pagination - you can expand this as needed */}
                <span className="px-3 py-1 text-sm">
                  Page {currentPage} of {Math.ceil(totalCount / limit) || 1}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= Math.ceil(totalCount / limit)}
                  className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
