"use client";

import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from '../../../public/images/logo.png'

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    mode: "onBlur",
  });

  const [apiMessage, setApiMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      const response = await fetch(
        "https://a2sv-application-platform-backend-team10.onrender.com/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: data.email,
            callback_url: window.location.origin + "/ResetPassword",
          }),
        }
      );

      const result = await response.json();
      setIsSuccess(result.success);
      setApiMessage(result.message);
    } catch (error) {
      setIsSuccess(false);
      setApiMessage("An error occurred. Please try again.");
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
        <h2 className="text-2xl font-bold text-center mb-2">
          Forgot your password?
        </h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Enter your email and we will send you a link to get back into your
          account.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* API Message */}
          {apiMessage && (
            <p
              className={`text-center text-sm ${
                isSuccess ? "text-green-600" : "text-red-500"
              }`}
            >
              {apiMessage}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Send reset link
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

export default ForgotPasswordForm;
