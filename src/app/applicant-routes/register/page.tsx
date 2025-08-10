"use client";
import React from 'react';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Image from 'next/image'

interface RegisterData {
  full_name: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>();

  const onSubmit: SubmitHandler<RegisterData> = async (data) => {
    try {
      const response = await fetch('https://a2sv-application-platform-backend-team10.onrender.com/auth/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Registration successful! Please log in.');
        router.push('/auth/signin');
      } else {
        throw new Error(result.detail || 'Registration failed');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(`Registration failed: ${error.message}`);
      } else {
        alert('Registration failed: An unknown error occurred.');
      }
    }
  };

  return (

    <>
    <div className="w-full flex justify-around items-center px-6 md:px-16 py-4 border-b border-gray-200">
            <Image src='/images/logo.png' width={120} height={24} alt="A2SV Logo" />
            <div className="space-x-6 text-sm md:text-base text-gray-700">
              <Link href="#">The Journey</Link>
              <Link href="#">About</Link>
              <Link href="#">Testimonials</Link>
              <Link href="#" className="text-indigo-600 font-semibold">Login</Link>
            </div>
          </div>
    
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h1 className="text-2xl font-bold text-center mb-4">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="full_name" className="block text-gray-700">Full Name</label>
            <input
              type="text"
              id="full_name"
              className="border-b-1 w-full p-2"
              {...register('full_name', { required: 'Full name is required' })}
            />
            {errors.full_name && <p className="text-red-500 text-sm">{errors.full_name.message}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="border-b-1 w-full p-2"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="border-b-1 w-full p-2"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md">
            Register
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account? <Link href="/auth/signin" className="text-blue-600">Login</Link>
        </p>
      </div>
    </div>
    
    </>
    
  );
};

export default Register;