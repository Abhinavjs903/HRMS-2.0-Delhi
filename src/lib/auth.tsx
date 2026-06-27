// Mock auth + role state stored in localStorage. No backend.
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Role = "Admin" | "HR Officer" | "Department Head" | "Employee";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
  department: string;
  designation: string;
  employeeId: string;
  avatar?: string;
};

const STORAGE_KEY = "nagar-setu-auth";

const DEMO_USERS: Record<string, AuthUser> = {
  admin: {
    id: "u-001",
    name: "Rajesh Kumar",
    email: "admin@mcd.gov.in",
    role: "Admin",
    department: "Administration",
    designation: "System Administrator",
    employeeId: "MCD-ADM-001",
  },
  hr: {
    id: "u-002",
    name: "Priya Sharma",
    email: "hr@mcd.gov.in",
    role: "HR Officer",
    department: "Human Resources",
    designation: "Sr. HR Officer",
    employeeId: "MCD-HR-014",
  },
  head: {
    id: "u-003",
    name: "Vikram Singh",
    email: "head@mcd.gov.in",
    role: "Department Head",
    department: "Public Health",
    designation: "Department Head",
    employeeId: "MCD-PH-002",
  },
  employee: {
    id: "u-004",
    name: "Anjali Verma",
    email: "anjali@mcd.gov.in",
    role: "Employee",
    department: "Sanitation",
    designation: "Junior Engineer",
    employeeId: "MCD-SN-128",
  },
};

type AuthCtx = {
  user: AuthUser | null;
  isReady: boolean;
  login: (role: Role) => void;
  logout: () => void;
  switchRole: (role: Role) => void;
};

const Ctx = createContext<AuthCtx | null>(null);

function readStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
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

  const persist = (u: AuthUser | null) => {
    setUser(u);
    setIsReady(true);
    if (typeof window !== "undefined") {
      if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
      else localStorage.removeItem(STORAGE_KEY);
    }
  };

  const userForRole = (role: Role): AuthUser => {
    if (role === "Admin") return DEMO_USERS.admin;
    if (role === "HR Officer") return DEMO_USERS.hr;
    if (role === "Department Head") return DEMO_USERS.head;
    return DEMO_USERS.employee;
  };

  return (
    <Ctx.Provider
      value={{
        user,
        isReady,
        login: (role) => persist(userForRole(role)),
        logout: () => persist(null),
        switchRole: (role) => persist(userForRole(role)),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

export const ROLES: Role[] = ["Admin", "HR Officer", "Department Head", "Employee"];
