import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { demoUsers, type DemoUser } from "./demoUsers";

export type Role = "Administrator" | "HR Officer" | "Department Head" | "Employee";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
  zone_id: string;
  department_id: string;
  employee_id: string;
  department: string;
  designation: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  isReady: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

const STORAGE_KEY = "nagar-setu-auth";

export const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<AuthUser>;

    if (!parsed.email || !parsed.name || !parsed.role) return null;

    return parsed as AuthUser;
  } catch {
    return null;
  }
}

function createAuthUser(demoUser: DemoUser): AuthUser {
  return {
    id: demoUser.id,
    name: demoUser.name,
    email: demoUser.email,
    role: demoUser.role,
    zone_id: demoUser.zone_id,
    department_id: demoUser.department_id,
    employee_id: demoUser.employee_id,
    department: demoUser.department,
    designation: demoUser.designation,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUser(readStoredUser());
      setIsReady(true);
    }
  }, []);

  const persist = (nextUser: AuthUser | null) => {
    setUser(nextUser);
    setIsReady(true);

    if (typeof window !== "undefined") {
      if (nextUser) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
      } else {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
  };

  const login = (email: string, password: string) => {
    const match = demoUsers.find(
      (demoUser) => demoUser.email.toLowerCase() === email.trim().toLowerCase() && demoUser.password === password
    );

    if (!match) return false;

    persist(createAuthUser(match));
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isReady,
        login,
        logout: () => persist(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

export const ROLES: Role[] = ["Administrator", "HR Officer", "Department Head", "Employee"];
