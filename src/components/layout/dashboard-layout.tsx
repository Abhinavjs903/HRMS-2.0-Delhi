import { useEffect, useState, type ReactNode } from "react";
import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import { Bell, Search, Menu, LogOut, User as UserIcon, Settings as SettingsIcon, ChevronDown, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AppSidebar } from "./app-sidebar";
import { useAuth, ROLES, type Role } from "@/lib/auth";
import { notifications } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const ROUTE_LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  employees: "Employees",
  attendance: "Attendance",
  leave: "Leave Management",
  payroll: "Payroll",
  transfers: "Transfers",
  grievances: "Grievances",
  "employee-360": "Employee 360",
  "employee-setup": "Employee Setup",
  "delhi-workforce": "Delhi Workforce",
  "zone-map": "Zone & Ward Map",
  settings: "Settings",
  profile: "Profile",
};

export function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, logout, switchRole, isReady } = useAuth();
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (isReady && !user && typeof window !== "undefined") {
      router.navigate({ to: "/login", replace: true });
    }
  }, [router, isReady, user]);

  if (!isReady || !user) {
    return null;
  }

  const segs = pathname.split("/").filter(Boolean);
  const unread = notifications.filter((n) => n.unread).length;

  const toggleDark = () => {
    const root = document.documentElement;
    root.classList.toggle("dark");
    setDark(root.classList.contains("dark"));
  };

  return (
    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        {/* Desktop sidebar */}
        <div className="hidden lg:flex">
          <AppSidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          {/* Top nav */}
          <header className="h-16 border-b border-border bg-card flex items-center gap-3 px-4 lg:px-6 shrink-0">
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

          {collapsed && (
            <Button variant="ghost" size="icon" className="hidden lg:inline-flex" onClick={() => setCollapsed(false)}>
              <Menu className="h-5 w-5" />
            </Button>
          )}

          {/* Search */}
          <div className="hidden md:flex relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search employees, requests, grievances…"
              className="pl-9 bg-muted/40 border-transparent focus-visible:bg-background"
            />
          </div>

          <div className="flex-1 md:hidden" />

          <div className="flex items-center gap-1.5">
            <Button variant="ghost" size="icon" onClick={toggleDark} className="text-muted-foreground">
              {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {/* Notifications */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-muted-foreground">
                  <Bell className="h-5 w-5" />
                  {unread > 0 && (
                    <span className="absolute top-1.5 right-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-destructive text-[10px] font-semibold text-destructive-foreground px-1">
                      {unread}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-80 p-0">
                <div className="p-3 border-b flex items-center justify-between">
                  <p className="text-sm font-semibold">Notifications</p>
                  <Badge variant="secondary">{unread} new</Badge>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className={cn("flex gap-3 p-3 border-b last:border-0 hover:bg-muted/40", n.unread && "bg-primary/[0.03]")}>
                      <div className={cn("h-2 w-2 rounded-full mt-2 shrink-0", n.unread ? "bg-primary" : "bg-muted-foreground/30")} />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">{n.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2">{n.body}</p>
                        <p className="text-[11px] text-muted-foreground/70 mt-0.5">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-2 border-t">
                  <Button variant="ghost" size="sm" className="w-full">View all</Button>
                </div>
              </PopoverContent>
            </Popover>

            {/* Profile dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 pl-1.5 pr-2 h-10">
                  <div className="grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                    {user.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                  <div className="hidden sm:flex flex-col items-start leading-tight">
                    <span className="text-xs font-medium">{user.name}</span>
                    <span className="text-[10px] text-muted-foreground">{user.role}</span>
                  </div>
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="text-sm">{user.name}</span>
                    <span className="text-xs text-muted-foreground font-normal">{user.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile"><UserIcon className="h-4 w-4 mr-2" /> My Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings"><SettingsIcon className="h-4 w-4 mr-2" /> Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="text-xs text-muted-foreground">Switch role (demo)</DropdownMenuLabel>
                <DropdownMenuRadioGroup value={user.role} onValueChange={(v) => switchRole(v as Role)}>
                  {ROLES.map((r) => (
                    <DropdownMenuRadioItem key={r} value={r} className="text-sm">{r}</DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={() => {
                    logout();
                    router.navigate({ to: "/login" });
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Breadcrumbs */}
        <div className="border-b border-border bg-card/40 px-4 lg:px-6 py-2.5">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/dashboard">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {segs.map((s, i) => {
                const label = ROUTE_LABELS[s] ?? s;
                const isLast = i === segs.length - 1;
                return (
                  <span key={s} className="flex items-center gap-1.5">
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      {isLast ? <BreadcrumbPage>{label}</BreadcrumbPage> : <span className="text-muted-foreground text-sm">{label}</span>}
                    </BreadcrumbItem>
                  </span>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

          <main className="flex-1 overflow-y-auto px-4 lg:px-6 py-6">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile sidebar */}
      <SheetContent side="left" className="p-0 w-64 bg-sidebar border-sidebar-border">
        <AppSidebar onNavigate={() => setMobileOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
