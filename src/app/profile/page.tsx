// src/app/profile/page.tsx
'use client';

import { useForm } from 'react-hook-form';
import Profile_Navbar from './Profile_Navbar';

type ProfileFormData = {
  fullName: string;
  email: string;
  role: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function ProfilePage() {
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
    defaultValues: {
      fullName: 'Abebe Kebede',
      email: 'abe@a2sv.org',
      role: 'Applicant'
    }
  });

  const onSubmit = (data: ProfileFormData) => {
    console.log(data);
    // Add API integration here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Profile_Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Container */}
        <div className="max-w-3xl mx-auto">
          {/* Hero Section with overlapping profile */}
          <div className="relative mb-16">
            {/* Hero Image with shadow */}
            <div className="h-48 w-full rounded-lg bg-gray-200 overflow-hidden shadow-[0px_8px_10px_-6px_rgba(0,0,0,0.1),0px_20px_25px_-5px_rgba(0,0,0,0.1)]">
              <img 
                src="/images/code_image.svg" 
                alt="Cover" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Profile Card overlapping hero image */}
            <div className="flex items-end px-8 -mt-16">
              <div className="h-32 w-32 rounded-full border-4 border-white overflow-hidden shadow-lg">
                <img
                  src="/images/profile_image.svg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="ml-6 mb-2">
                <h2 className="text-2xl font-bold text-gray-900">Abebe Kebede</h2>
                <p className="text-gray-500">@username</p>
              </div>
            </div>
          </div>

          {/* Combined Form with precise shadows */}
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-[0px_8px_10px_-6px_rgba(0,0,0,0.1),0px_20px_25px_-5px_rgba(0,0,0,0.1)] p-8 space-y-8">
            {/* Personal Information Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                    Full name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    {...register('fullName', { required: 'Full name is required' })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                </div>
                
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <input
                    type="text"
                    id="role"
                    {...register('role')}
                    disabled
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              
              <div className="bg-gray-50 px-6 py-3 rounded-md flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Changes
                </button>
              </div>
            </div>
            
            {/* Password Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Change Password</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                    Current password
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    {...register('currentPassword')}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                    New password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    {...register('newPassword')}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm new password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    {...register('confirmPassword')}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              
              <div className="bg-gray-50 px-6 py-3 rounded-md flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Change Password
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}