"use client";

import React from "react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Define the shape of your registration data
interface RegisterData {
  full_name: string;
  email: string;
  password: string;
}

// The main Register component
const Register: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
    },
  });

  
  const onSubmit: SubmitHandler<RegisterData> = async (data) => {
    try {
      const response = await fetch(
        "https://a2sv-application-platform-backend-team10.onrender.com/auth/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // Send the user data along with the predefined role
          body: JSON.stringify({ ...data, role: "applicant" }),
        }
      );

      const result = await response.json();
      if (!response.ok) {
        // If the response is not OK, throw an error with the backend's message
        throw new Error(result.detail || "Registration failed");
      }

      // If registration is successful, notify the user and redirect to login
      // This is the correct, fixed flow.
      alert("Registration successful! Please log in with your new account.");
      router.push("/signin");
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(`Registration failed: ${error.message}`);
      } else {
        alert("Registration failed: An unknown error occurred.");
      }
    }
  };

  return (
    <>
      <div className="w-full flex justify-between items-center px-6 md:px-16 py-4 border-b border-gray-200 bg-white">
        {/* Logo and navigation links */}
        <Image src="/images/logo.png" width={120} height={24} alt="A2SV Logo" />
        <div className="space-x-6 text-sm md:text-base text-gray-700">
          <Link href="#">The Journey</Link>
          <Link href="#">About</Link>
          <Link href="#">Testimonials</Link>
          <Link href="/signin" className="text-indigo-600 font-semibold">
            Login
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
          {/* Registration form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="full_name" className="block text-gray-700 font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="full_name"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("full_name", {
                  required: "Full name is required",
                  minLength: { value: 2, message: "Name must be at least 2 characters" },
                })}
              />
              {errors.full_name && <p className="text-red-500 text-sm mt-1">{errors.full_name.message}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                })}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Register
            </button>
          </form>
          {/* Link to login page */}
          <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <Link href="/signin" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
