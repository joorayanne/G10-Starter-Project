'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';

const resetSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
});

type ResetData = z.infer<typeof resetSchema>;

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetData>({ resolver: zodResolver(resetSchema) });

  const onSubmit = (data: ResetData) => {
    console.log('📧 Reset request:', data);
    // TODO: Send reset request to API
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <div className="flex justify-center mb-4">
          <Image src="/logo.png" alt="Logo" width={80} height={80} />
        </div>

        <h2 className="text-2xl font-bold text-center mb-2">Forgot your password?</h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Enter your email and we'll send you a link to get back into your account.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email address"
              {...register('email')}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Send reset link
          </button>
        </form>

        <div className="text-sm text-center mt-4">
          <a href="/login" className="text-indigo-600 hover:underline">Back to login</a>
        </div>
      </div>
    </div>
  );
}
