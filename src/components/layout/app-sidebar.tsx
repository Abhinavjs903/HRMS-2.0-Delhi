import { Link, useRouterState } from "@tanstack/react-router";
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
  ChevronLeft,
  UserPlus,
  Landmark,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { rolePermissions } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type NavItem = {
  key: string;
  label: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  group: "Main" | "Workforce" | "Operations" | "Account";
};

const NAV: NavItem[] = [
  { key: "dashboard", label: "Dashboard", to: "/dashboard", icon: LayoutDashboard, group: "Main" },
  { key: "employees", label: "Employees", to: "/employees", icon: Users, group: "Workforce" },
  { key: "attendance", label: "Attendance", to: "/attendance", icon: CalendarCheck, group: "Workforce" },
  { key: "leave", label: "Leave Management", to: "/leave", icon: CalendarDays, group: "Workforce" },
  { key: "payroll", label: "Payroll", to: "/payroll", icon: Wallet, group: "Workforce" },
  { key: "transfers", label: "Transfers", to: "/transfers", icon: ArrowLeftRight, group: "Operations" },
  { key: "grievances", label: "Grievances", to: "/grievances", icon: MessageSquareWarning, group: "Operations" },
  { key: "employee-360", label: "Employee 360", to: "/employee-360", icon: UserSearch, group: "Operations" },
  { key: "employee-setup", label: "Employee Setup", to: "/employee-setup", icon: UserPlus, group: "Workforce" },
  { key: "delhi-workforce", label: "Delhi Workforce", to: "/delhi-workforce", icon: Landmark, group: "Operations" },
  { key: "zone-map", label: "Zone & Ward Map", to: "/zone-map", icon: MapPin, group: "Operations" },
  { key: "settings", label: "Settings", to: "/settings", icon: Settings, group: "Account" },
  { key: "profile", label: "Profile", to: "/profile", icon: UserCircle, group: "Account" },
];

export function AppSidebar({ onNavigate, collapsed, onToggle }: { onNavigate?: () => void; collapsed?: boolean; onToggle?: () => void }) {
  const { user } = useAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const allowed = user ? new Set(rolePermissions[user.role]) : new Set<string>();
  const items = NAV.filter((i) => allowed.has(i.key));

  const groups: Array<NavItem["group"]> = ["Main", "Workforce", "Operations", "Account"];

  return (
    <aside
      className={cn(
        "flex h-screen flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-200",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center gap-2 px-4 h-16 border-b border-sidebar-border shrink-0">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <Building2 className="h-5 w-5" />
        </div>
        {!collapsed && (
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold tracking-tight truncate">Nagar Setu</p>
            <p className="text-[11px] text-sidebar-foreground/60 truncate">MCD · HRMS Portal</p>
          </div>
        )}
        {!collapsed && onToggle && (
          <button onClick={onToggle} className="hidden lg:grid place-items-center h-7 w-7 rounded-md hover:bg-sidebar-accent">
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {groups.map((g) => {
          const groupItems = items.filter((i) => i.group === g);
          if (!groupItems.length) return null;
          return (
            <div key={g}>
              {!collapsed && (
                <p className="px-2 mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/50">
                  {g}
                </p>
              )}
              <div className="space-y-0.5">
                {groupItems.map((item) => {
                  const active = pathname === item.to || pathname.startsWith(item.to + "/");
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.key}
                      to={item.to}
                      onClick={onNavigate}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-2.5 py-2 text-sm transition-colors",
                        active
                          ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium shadow-sm"
                          : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span className="truncate">{item.label}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      {!collapsed && user && (
        <div className="border-t border-sidebar-border p-3 shrink-0">
          <div className="flex items-center gap-2.5 rounded-md bg-sidebar-accent/40 p-2.5">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sidebar-primary/20 text-sidebar-primary-foreground font-semibold text-sm">
              {user.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-[11px] text-sidebar-foreground/60 truncate">{user.role}</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
