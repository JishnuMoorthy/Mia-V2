import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import type { User, LoginRequest } from "@/types";
import { apiClient } from "@/lib/api";

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
}

export const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("auth_user");
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem("auth_token")
  );
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (data: LoginRequest) => {
    setIsLoading(true);
    try {
      const res = await apiClient.login(data);
      localStorage.setItem("auth_token", res.access_token);
      localStorage.setItem("auth_user", JSON.stringify(res.user));
      setToken(res.access_token);
      setUser(res.user);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    setToken(null);
    setUser(null);
  }, []);

  // Validate token on mount
  useEffect(() => {
    if (token && !user) {
      setIsLoading(true);
      apiClient
        .getMe()
        .then((u) => {
          setUser(u);
          localStorage.setItem("auth_user", JSON.stringify(u));
        })
        .catch(() => logout())
        .finally(() => setIsLoading(false));
    }
  }, [token, user, logout]);

  const isAdmin = user?.role === "admin";

  const value = useMemo(
    () => ({ user, token, isLoading, login, logout, isAdmin }),
    [user, token, isLoading, login, logout, isAdmin]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
