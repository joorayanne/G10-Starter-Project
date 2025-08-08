"use client";

import React from "react";
import { getAccessToken } from "../../auth/authHelpers";

interface FormData {
  fullName: string;
  email: string;
  password: string;
  role: string;
}

const CreateUser: React.FC = () => {
  const [formData, setFormData] = React.useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    role: "Applicant",
  });

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setFormData({
      fullName: "",
      email: "",
      password: "",
      role: "Applicant",
    });
    setError(null);
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL ||
        "https://a2sv-application-platform-backend-team10.onrender.com";

      const response = await fetch(`${apiUrl}/admin/users`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: formData.fullName,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to create user");
      }

      setSuccess(true);
      setFormData({
        fullName: "",
        email: "",
        password: "",
        role: "Admin",
      });

      alert("User created successfully!");
    } catch (err: unknown) {
      if (err && typeof err === "object" && "message" in err) {
        setError((err as { message: string }).message || "Something went wrong");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="px-30">
        <h1 className="font-bold text-3xl pt-7">Create New User</h1>
        <p className="pb-5 text-gray-400">
          Use this form to create a new user and assign them a role.
        </p>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">User created!</p>}

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
                placeholder="Set an initial password"
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
                className="mt-1 p-1.5 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
              >
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
                onClick={handleCancel}
                className="rounded text-gray-600 bg-white px-4 py-1 border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="bg-[#4f46e5] text-white px-2.5 py-1 rounded hover:bg-[#3730a3]"
              >
                {loading ? "Saving..." : "Save User"}
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateUser;
