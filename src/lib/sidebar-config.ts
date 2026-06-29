import type { ComponentType } from "react";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  CalendarDays,
  Wallet,
  ArrowLeftRight,
  MessageSquareWarning,
  UserSearch,
  MapPin,
  Settings,
  UserCircle,
  Building2,
  UserPlus,
  Landmark,
} from "lucide-react";
import type { RoleLike } from "@/lib/permissions";

export type SidebarNavItem = {
  key: string;
  label: string;
  to: string;
  icon: ComponentType<{ className?: string }>;
  group: "Main" | "Workforce" | "Operations" | "Account";
  allowedRoles: readonly RoleLike[];
};

export const sidebarNavItems: SidebarNavItem[] = [
  { key: "dashboard", label: "Dashboard", to: "/dashboard", icon: LayoutDashboard, group: "Main", allowedRoles: ["admin", "hr_officer", "department_head", "employee"] },
  { key: "employees", label: "Employees", to: "/employees", icon: Users, group: "Workforce", allowedRoles: ["admin", "hr_officer", "department_head"] },
  { key: "attendance", label: "Attendance", to: "/attendance", icon: CalendarCheck, group: "Workforce", allowedRoles: ["admin", "hr_officer", "department_head", "employee"] },
  { key: "leave", label: "Leave", to: "/leave", icon: CalendarDays, group: "Workforce", allowedRoles: ["admin", "hr_officer", "department_head", "employee"] },
  { key: "payroll", label: "Payroll", to: "/payroll", icon: Wallet, group: "Workforce", allowedRoles: ["admin", "hr_officer"] },
  { key: "payroll-employee", label: "Payslip", to: "/payroll", icon: Wallet, group: "Workforce", allowedRoles: ["employee"] },
  { key: "transfers", label: "Transfers", to: "/transfers", icon: ArrowLeftRight, group: "Operations", allowedRoles: ["admin", "department_head"] },
  { key: "grievances", label: "Grievance", to: "/grievances", icon: MessageSquareWarning, group: "Operations", allowedRoles: ["admin", "hr_officer", "department_head", "employee"] },
  { key: "employee-360", label: "Employee 360", to: "/employee-360", icon: UserSearch, group: "Operations", allowedRoles: ["admin", "hr_officer", "department_head"] },
  { key: "employee-setup", label: "System Configuration", to: "/employee-setup", icon: UserPlus, group: "Workforce", allowedRoles: ["admin"] },
  { key: "delhi-workforce", label: "Cross-zone Reports", to: "/delhi-workforce", icon: Landmark, group: "Operations", allowedRoles: ["admin", "department_head"] },
  { key: "zone-map", label: "Zone Hierarchy", to: "/zone-map", icon: MapPin, group: "Operations", allowedRoles: ["admin"] },
  { key: "settings", label: "Settings", to: "/settings", icon: Settings, group: "Account", allowedRoles: ["admin", "hr_officer"] },
  { key: "profile", label: "My Profile", to: "/profile", icon: UserCircle, group: "Account", allowedRoles: ["admin", "hr_officer", "department_head", "employee"] },
];

export const sidebarGroups: Array<SidebarNavItem["group"]> = ["Main", "Workforce", "Operations", "Account"];
