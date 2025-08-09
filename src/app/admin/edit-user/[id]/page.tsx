"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
interface FormData {
  fullName: string;
  email: string;
  password: string;
  role: string;
}

const Page: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    role: "Applicant",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {data: session, status }= useSession() 

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        const token = session?.accessToken
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL ||
          "https://a2sv-application-platform-backend-team10.onrender.com";

        const response = await fetch(`${apiUrl}/admin/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();
        if (!response.ok || !result.success) {
          throw new Error(result.message || "Failed to fetch user data");
        }

        const user = result.data;
        setFormData({
          fullName: user.full_name || "",
          email: user.email || "",
          password: "**************",
          role: user.role || "",
        });
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL ||
        "https://a2sv-application-platform-backend-team10.onrender.com";

      const response = await fetch(`${apiUrl}/admin/users/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: formData.fullName,
          email: formData.email,
          role: formData.role,
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to update user");
      }

      alert("User updated successfully");
    } catch (err: unknown) {
      alert("Update failed: " + (err instanceof Error ? err.message : "An error occurred"));
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="px-30">
        <h1 className="font-bold text-3xl pt-7">Edit User</h1>
        <p className="pb-5 text-gray-400">Update user information and role.</p>

        <form onSubmit={handleSubmit} className="bg-white p-4">
          <div className="flex mb-4">
            <div className="w-1/2 pr-2">
              <label
                htmlFor="fullName"
                className="block text-[16px] font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                placeholder="Enter Full name"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="w-1/2 pl-2">
              <label
                htmlFor="email"
                className="block text-[16px] font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex mb-4">
            <div className="w-1/2 pr-2">
              <label
                htmlFor="password"
                className="block text-[16px] font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="**************"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 p-1 block w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="w-1/2 pl-2">
              <label
                htmlFor="role"
                className="block text-[16px] font-medium text-gray-700"
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="mt-1 p-1.5 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="applicant">Applicant</option>
                <option value="reviewer">Reviewer</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
              </select>
            </div>
          </div>

          <div className="flex mb-4">
            <div className="w-1/2 pr-2"></div>
            <div className="w-1/2 pl-2 flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.push("/users")}
                className="rounded text-gray-600 bg-white px-4 py-1 border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="bg-[#4f46e5] text-white px-2.5 py-1 rounded hover:bg-[#3730a3]"
              >
                Update User
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Page;
