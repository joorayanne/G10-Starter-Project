"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import UserFooter from "@/components/common/user-footer";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/auth/route";
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Both fields are required.");
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format.");
      setLoading(false);
      return;
    }

    const result = await signIn("credentials", {
      redirect: true,
      email,
      password,
      callbackUrl,
    });

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between ">
      <main className="flex-1 flex justify-center pt-10 sm:pt-20 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm sm:max-w-md">
          {/* Logo & Title */}
          <div className="flex flex-col items-center text-center mb-4 sm:mb-6">
            <Image
              src="/images/logo.png"
              width={120}
              height={20}
              alt="A2SV Logo"
              className="w-24 sm:w-28 h-auto"
            />
            <h2 className="mt-2 text-xl sm:text-2xl font-semibold text-gray-800">
              Sign in to your account
            </h2>
          </div>

          {/* Links */}
          <div className="text-center mb-4 space-y-2 text-xs sm:text-sm">
            <div className="flex flex-wrap justify-center gap-2">
              <Link href="/" className="text-indigo-600 hover:underline">
                Back to Home
              </Link>
              <span>|</span>
              <Link
                href="/applicant-routes/register"
                className="text-indigo-600 hover:underline"
              >
                Create a new applicant account
              </Link>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <input
              type="email"
              placeholder="user@example.com"
              className="w-full px-3 sm:px-4 py-2 border rounded text-sm focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password123"
                className="w-full px-3 sm:px-4 py-2 border rounded text-sm focus:ring-2 focus:ring-indigo-500 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm gap-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" />
                <span>Remember me</span>
              </label>
              <Link href="/ForgotPassword" className="text-indigo-600">
                Forgot your password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-indigo-500 text-white rounded font-medium hover:bg-indigo-800 transition text-sm sm:text-base"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </main>
      <UserFooter />
    </div>
  );
}
