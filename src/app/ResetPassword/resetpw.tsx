"use client";

import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import logo from '../../../public/images/logo.png'

const API_URL =
  "https://a2sv-application-platform-backend-team10.onrender.com";

interface SetNewPasswordFormData {
  newPassword: string;
  confirmPassword: string;
}

interface ApiResponse {
  success: boolean;
  data?: string;
  message: string;
}

const SetNewPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SetNewPasswordFormData>({ mode: "onBlur" });

  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [apiMessage, setApiMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const newPassword = watch("newPassword");

  const onSubmit = async (data: SetNewPasswordFormData) => {
    if (!token) {
      setIsSuccess(false);
      setApiMessage("Invalid or missing reset token.");
      return;
    }

    setIsLoading(true);
    setApiMessage(null);
    setIsSuccess(null);

    try {
      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          new_password: data.newPassword,
        }),
      });

      const result: ApiResponse = await response.json();
      setIsSuccess(result.success);
      setApiMessage(result.message);

      if (result.success) {
        router.push("/signin");
      }
    } catch (error: any) {
      setIsSuccess(false);
      setApiMessage(
        error.message === "Failed to fetch"
          ? "Failed to connect to the server. Please try again later."
          : "An error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Link href="/">
            <Image
              src={logo}
              alt="Logo"
              width={80}
              height={80}
              priority
            />
          </Link>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-2">Set New Password</h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Please choose a strong new password for your account.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* New Password */}
          <div>
            <input
              type="password"
              placeholder="New password"
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must include uppercase, lowercase, number, and special character",
                },
              })}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.newPassword ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              placeholder="Confirm password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === newPassword || "Passwords do not match",
              })}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* API Response */}
          {apiMessage && (
            <p
              className={`text-center text-sm ${
                isSuccess ? "text-green-600" : "text-red-500"
              }`}
            >
              {apiMessage}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading || !token}
            className={`w-full py-2 rounded-md text-white transition ${
              isLoading || !token
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {isLoading ? "Submitting..." : "Set password"}
          </button>
        </form>

        {/* Back to login */}
        <div className="text-sm text-center mt-4">
          <Link href="/signin" className="text-indigo-600 hover:underline">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SetNewPasswordForm;
