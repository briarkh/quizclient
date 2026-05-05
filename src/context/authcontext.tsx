import { useState, type ReactNode } from "react";
import type { User } from "../types/user";
import { AuthContext } from "./authcontextvalue";

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
