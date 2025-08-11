"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useSession } from "next-auth/react";

interface ProfileData {
  full_name: string;
  email: string;
  role: string;
  username?: string;
}

interface ProfileContextType {
  profileData: ProfileData | null;
  isLoading: boolean;
  error: string | null;
  updateProfile: (data: Partial<ProfileData>) => Promise<void>;
  refreshProfile: () => Promise<void>;
  clearProfile: () => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileProvider: React.FC<ProfileProviderProps> = ({
  children,
}) => {
  const { data: session } = useSession();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL =
    "https://a2sv-application-platform-backend-team10.onrender.com";

  const authFetch = async (url: string, options: RequestInit = {}) => {
    if (!session?.accessToken) {
      throw new Error("No access token — please log in.");
    }

    return fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
  };

  const fetchProfile = async (): Promise<ProfileData> => {
    const res = await authFetch("/profile/me");
    const result = await res.json();
    if (!res.ok || !result.success) {
      throw new Error(result.message || "Failed to fetch profile");
    }
    return result.data;
  };

  const refreshProfile = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchProfile();
      setProfileData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load profile");
      console.error("Profile fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: Partial<ProfileData>) => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await authFetch("/profile/me", {
        method: "PUT",
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed to update profile");
      }

      await refreshProfile();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const clearProfile = () => {
    setProfileData(null);
    setError(null);
    setIsLoading(false);
  };

  useEffect(() => {
    if (session?.accessToken) {
      refreshProfile();
    }
  }, [session?.accessToken]);

  const value: ProfileContextType = {
    profileData,
    isLoading,
    error,
    updateProfile,
    refreshProfile,
    clearProfile,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
