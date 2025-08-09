"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import ProfileNavbar from "./Profile_Navbar";
import Footer from "@/components/common/footer";

const API_BASE_URL = "https://a2sv-application-platform-backend-team10.onrender.com";

// Zod Schemas
const profileSchema = z.object({
  full_name: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
});

const passwordSchema = z.object({
  current_password: z.string().min(1, "Current password required"),
  new_password: z.string().min(6, "New password must be at least 6 characters"),
  confirm_password: z.string().min(1, "Please confirm new password"),
}).refine((data) => data.new_password === data.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"],
});

type ProfileForm = z.infer<typeof profileSchema>;
type PasswordForm = z.infer<typeof passwordSchema>;

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [profileData, setProfileData] = useState<ProfileForm | null>(null);
  const [error, setError] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const authFetch = useCallback(
    async (url: string, options: RequestInit = {}) => {
      const token = session?.accessToken;
      if (!token) {
        signOut({ callbackUrl: "/signin" });
        throw new Error("No access token available");
      }

      const res = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          ...options.headers,
        },
      });

      if (res.status === 401) {
        signOut({ callbackUrl: "/signin" });
        throw new Error("Session expired. Please login again.");
      }

      return res;
    },
    [session]
  );

  // Forms
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    reset: resetProfileForm,
    formState: { errors: profileErrors },
  } = useForm<ProfileForm>({ resolver: zodResolver(profileSchema) });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPasswordForm,
    formState: { errors: passwordErrors },
  } = useForm<PasswordForm>({ resolver: zodResolver(passwordSchema) });

  // Fetch profile data
  const fetchProfile = useCallback(async () => {
    try {
      setProfileLoading(true);
      setError("");
      const res = await authFetch("/profile/me");
      const result = await res.json();
      if (!res.ok || !result.success) throw new Error(result.message || "Failed to fetch profile");
      setProfileData(result.data);
      resetProfileForm({
        full_name: result.data.full_name,
        email: result.data.email,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch profile");
    } finally {
      setProfileLoading(false);
    }
  }, [authFetch, resetProfileForm]);

  // Load profile on mount or session change
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    } else if (status === "authenticated") {
      fetchProfile();
    }
  }, [status, router, fetchProfile]);

  const onUpdateProfile = async (data: ProfileForm) => {
    setProfileLoading(true);
    setError("");
    try {
      const res = await authFetch("/profile/me", {
        method: "PUT",
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok || !result.success) throw new Error(result.message || "Failed to update profile");
      setProfileData(data);
      alert("Profile updated!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setProfileLoading(false);
    }
  };

  const onChangePassword = async (data: PasswordForm) => {
    setPasswordLoading(true);
    setError("");
    try {
      const res = await authFetch("/profile/me/change-password", {
        method: "PATCH",
        body: JSON.stringify({
          old_password: data.current_password,
          new_password: data.new_password,
        }),
      });

      const result = await res.json();
      if (!res.ok || !result.success) throw new Error(result.message || "Failed to change password");
      alert("Password changed successfully!");
      resetPasswordForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Password change failed");
    } finally {
      setPasswordLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <span className="ml-3 text-gray-600 text-base">Loading...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileNavbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="relative mb-16">
            <div className="h-48 w-full rounded-lg bg-gray-200 overflow-hidden shadow-[0px_8px_10px_-6px_rgba(0,0,0,0.1),0px_20px_25px_-5px_rgba(0,0,0,0.1)]">
              <Image
                src="/images/code_image.svg"
                alt="Cover"
                width={800}
                height={192}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-end px-8 -mt-16">
              <div className="h-32 w-32 rounded-full border-4 border-white overflow-hidden shadow-lg">
                <Image
                  src="/images/code_image.svg"
                  alt="Cover"
                  width={800}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-6 mb-2">
                <h2 className="text-2xl font-bold text-gray-900">{profileData?.full_name || "User"}</h2>
                <p className="text-gray-500">@{session?.user?.id || "user"}</p>
              </div>
            </div>
          </div>

          {error && <div className="bg-red-100 text-red-700 p-4 mb-6 rounded text-base">{error}</div>}

          {profileLoading && (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              <span className="ml-3 text-gray-600 text-base">Loading profile...</span>
            </div>
          )}

          {!profileLoading && profileData && (
            <form className="bg-white rounded-lg shadow-[0px_8px_10px_-6px_rgba(0,0,0,0.1),0px_20px_25px_-5px_rgba(0,0,0,0.1)] p-8 space-y-8">
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Profile Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="full_name"
                      {...registerProfile("full_name")}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {profileErrors.full_name && (
                      <p className="mt-1 text-sm text-red-600">{profileErrors.full_name.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...registerProfile("email")}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {profileErrors.email && (
                      <p className="mt-1 text-sm text-red-600">{profileErrors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                      Role
                    </label>
                    <input
                      type="text"
                      id="role"
                      value={session?.user?.role || ""}
                      disabled
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-gray-100 focus:outline-none sm:text-sm"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Your role cannot be changed.
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 px-6 py-3 rounded-md flex justify-end">
                  <button
                    type="button"
                    onClick={handleProfileSubmit(onUpdateProfile)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
                    disabled={profileLoading}
                  >
                    {profileLoading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Change Password
                </h3>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="current_password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="current_password"
                      {...registerPassword("current_password")}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {passwordErrors.current_password && (
                      <p className="mt-1 text-sm text-red-600">
                        {passwordErrors.current_password.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="new_password" className="block text-sm font-medium text-gray-700">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="new_password"
                      {...registerPassword("new_password")}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {passwordErrors.new_password && (
<<<<<<< HEAD
                      <p className="mt-1 text-sm text-red-600">
                        {passwordErrors.new_password.message}
                      </p>
=======
                      <p className="mt-1 text-sm text-red-600">{passwordErrors.new_password.message}</p>
>>>>>>> 1c6543e971c79f26e3fc7a967fe83e8dbaabab5f
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="confirm_password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirm_password"
                      {...registerPassword("confirm_password")}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {passwordErrors.confirm_password && (
                      <p className="mt-1 text-sm text-red-600">
                        {passwordErrors.confirm_password.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="bg-gray-50 px-6 py-3 rounded-md flex justify-end">
                  <button
                    type="button"
                    onClick={handlePasswordSubmit(onChangePassword)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
                    disabled={passwordLoading}
                  >
                    {passwordLoading ? "Updating..." : "Change Password"}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
