"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import NavBar from "@/components/common/NavBar";
import Footer from "@/components/common/footer";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

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
      redirect: true, // Let NextAuth handle navigation
      email,
      password,
      callbackUrl, // Redirect target after successful login
    });

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <NavBar />
      <main className="flex-1 flex justify-center pt-24">
        <div className="w-full max-w-md">
          {/* Logo & Title */}
          <div className="flex flex-col items-center text-center mb-6">
            <Image src="/images/logo.png" width={120} height={24} alt="A2SV Logo" />
            <h2 className="mt-3 text-2xl font-semibold text-gray-800">
              Sign in to your account
            </h2>
          </div>

          {/* Links */}
          <div className="text-center mb-4 space-y-2 text-sm">
            <div className="flex justify-center space-x-2">
              <Link href="/" className="text-indigo-600 hover:underline block">
                Back to Home
              </Link>
              <span>|</span>
              <Link
                href="/applicant-routes/register"
                className="text-indigo-600 hover:underline block"
              >
                Create a new applicant account
              </Link>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <input
              type="email"
              placeholder="user@example.com"
              className="w-full px-4 py-2 border rounded text-sm focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="password123"
              className="w-full px-4 py-2 border rounded text-sm focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex items-center justify-between text-sm">
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
              className="w-full py-2 bg-indigo-500 text-white rounded font-medium hover:bg-indigo-800 transition"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
