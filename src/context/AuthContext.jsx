import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AuthContext = createContext(null);

const defaultUser = null;

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage("uh_user", defaultUser);

  const value = useMemo(() => ({
    user,
    isAuthenticated: Boolean(user),
    login(nextUser) {
      setUser(nextUser);
    },
    logout() {
      setUser(null);
    },
  }), [setUser, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
