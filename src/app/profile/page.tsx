"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

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

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = "https://a2sv-application-platform-backend-team10.onrender.com";

  const getAccessToken = () => localStorage.getItem("access");
  const getRefreshToken = () => localStorage.getItem("refresh");

  const parseJwt = (token: string) => {
    try {
      const parts = token.split(".");
      if (parts.length !== 3) return null;
      return JSON.parse(atob(parts[1]));
    } catch {
      return null;
    }
  };

  const isAccessTokenExpired = () => {
    const token = getAccessToken();
    if (!token) return true;
    const decoded = parseJwt(token);
    return !decoded?.exp || Date.now() >= decoded.exp * 1000;
  };

  const refreshAccessToken = async () => {
    const refresh = getRefreshToken();
    if (!refresh) throw new Error("No refresh token");
    const res = await fetch(`${API_BASE_URL}/auth/token/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });
    const result = await res.json();
    if (!res.ok || !result.success) throw new Error(result.message || "Failed to refresh token");
    localStorage.setItem("access", result.data.access);
    return result.data.access;
  };

  const authFetch = async (url: string, options: RequestInit = {}) => {
    let token = getAccessToken();
    if (!token || isAccessTokenExpired()) {
      try {
        token = await refreshAccessToken();
      } catch {
        localStorage.clear();
        throw new Error("Session expired. Please login again.");
      }
    }

    return fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
  };

  const fetchProfile = async (): Promise<ProfileData> => {
    const res = await authFetch("/profile/me");
    const result = await res.json();
    if (!res.ok || !result.success) throw new Error(result.message || "Failed to fetch profile");
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
      if (!res.ok || !result.success) throw new Error(result.message || "Failed to update profile");
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
    if (getAccessToken()) {
      refreshProfile();
    }
  }, []);

  return (
    <ProfileContext.Provider
      value={{ profileData, isLoading, error, updateProfile, refreshProfile, clearProfile }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
