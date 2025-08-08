'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
  isAccessTokenExpired,
  refreshAccessToken,
  parseJwt,
} from './authHelpers';

type Role = 'applicant' | 'admin' | 'reviewer' | 'manager';

interface AuthContextType {
  isAuthenticated: boolean;
  role: Role | null;
  login: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<Role | null>(null);
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = async () => {
      const access = getAccessToken();
      if (!access) return;

      if (isAccessTokenExpired()) {
        try {
          await refreshAccessToken();
        } catch (err) {
          console.error('Failed to refresh token:', err);
          clearTokens();
          return;
        }
      }

      setIsAuthenticated(true);

      const decoded = parseJwt(getAccessToken()!);
      const userRole = decoded?.role as Role;
      if (userRole) setRole(userRole);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const res = await fetch('https://a2sv-application-platform-backend-team10.onrender.com/auth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || 'Login failed');
      }

      const { access, refresh, role } = result.data;
      setTokens(access, refresh);
      setIsAuthenticated(true);
      setRole(role);

      if (role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/test');
      }

      if (role === 'applicant') {
        router.push('/applicant-routes/login');
      } else {
        router.push('/test');
      }

    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Login error:', err.message);
        throw err;
      } else {
        console.error('Login error:', err);
        throw new Error('An unknown error occurred');
      }
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
