import { createContext, useContext, useState, type ReactNode } from "react";
import type { User } from "../types/user";

interface AuthContextValue {
  currentUser: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("currentUser");

    if (!savedUser) {
      return null;
    }

    return JSON.parse(savedUser) as User;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });

  function login(user: User, newToken: string) {
    setCurrentUser(user);
    setToken(newToken);

    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("token", newToken);
  }

  function logout() {
    setCurrentUser(null);
    setToken(null);

    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider value={{ currentUser, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
