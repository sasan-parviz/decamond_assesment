"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  setUser: (user: User) => void;
  delUser: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUserState(JSON.parse(stored));
    setLoading(false);
  }, []);

  const setUser = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUserState(user);
  };

  const delUser = () => {
    localStorage.removeItem("user");
    setUserState(null);
  };

  return <AuthContext.Provider value={{ user, setUser, delUser, loading }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
