'use client';

import Image from "next/image";
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from "../AuthContext";
import logo from '../../../../public/images/logo.png'; 

export default function SignInPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
const [loading, setLoading] = useState(false);

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  if (!email || !password) {
    setError('Both fields are required.');
    setLoading(false);
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setError('Invalid email format.');
    setLoading(false);
    return;
  }

  try {
  await login(email, password);
} catch (err: any) {
  setError(err.message || 'Login failed');
}

  setLoading(false);
};

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Top Nav */}
      <div className="w-full flex justify-around items-center px-6 md:px-16 py-4 border-b border-gray-200">
        <Image src={logo} width={120} height={24} alt="A2SV Logo" />
        <div className="space-x-6 text-sm md:text-base text-gray-700">
          <Link href="#">The Journey</Link>
          <Link href="#">About</Link>
          <Link href="#">Testimonials</Link>
          <Link href="#" className="text-indigo-600 font-semibold">Login</Link>
        </div>
      </div>

      {/* Main Form */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <img src="/logo.png" alt="A2SV Logo" className="mx-auto h-10 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800">Sign in to your account</h2>
          </div>

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
              <Link href="#" className="text-indigo-600">Forgot your password?</Link>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-indigo-500 text-white rounded font-medium hover:bg-indigo-800 transition"
            >
              {loading ? 'Signing in' : 'Sign in'}
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 px-4 md:px-16 text-sm">
        {/* ... */}
      </footer>
    </div>
  );
}
