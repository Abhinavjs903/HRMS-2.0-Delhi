import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Users, UserCheck, CalendarOff, ClipboardList, Wallet, MessageSquareWarning,
  ArrowLeftRight, UserPlus, TrendingUp, Calendar, Download, Plus, Building2,
  BadgeCheck, Clock3, FileText, ShieldCheck, Sparkles, BriefcaseBusiness,
  IdCard, LifeBuoy, MessageCircleMore, GraduationCap, UserRoundCog,
  CalendarDays, ClipboardPlus, Mail, Phone,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/widgets/page-header";
import { StatCard } from "@/components/widgets/stat-card";
import { StatusBadge } from "@/components/widgets/status-badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/lib/auth";
import { normalizeRole } from "@/lib/permissions";
import {
  stats, leaveRequests, recentActivity, todayAttendance, payrolls, departments, employees,
  grievances, transfers,
} from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [{ title: "Dashboard — Nagar Setu HRMS" }],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { user } = useAuth();
  const role = normalizeRole(user?.role);
  const isAdmin = role === "admin";
  const isHrOfficer = role === "hr_officer";
  const isDepartmentHead = role === "department_head";
  const isEmployee = role === "employee";

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  })();

  const presentPct = Math.round((stats.presentToday / stats.totalEmployees) * 100);
  const hrZoneEmployeeCount = Math.round(stats.totalEmployees * 0.18);
  const hrZoneAttendance = "94%";
  const hrZonePayroll = "₹ 4.8 Cr";
  const hrZoneGrievances = "9 open";

  const employeeAnnouncements = [
    { title: "Attendance reminder", detail: "Please mark your attendance before 10:00 AM." },
    { title: "Leave policy update", detail: "Casual leave balance now reflects your latest approval history." },
    { title: "Payroll notice", detail: "June payslips are now available in your profile." },
  ];

  const currentDepartment = user?.department ?? "Sanitation";
  const departmentEmployees = employees.filter((employee) => employee.department === currentDepartment);
  const departmentAttendanceRows = todayAttendance.filter((row) => row.department === currentDepartment);
  const departmentLeaveRequests = leaveRequests.filter((item) => item.department === currentDepartment);
  const departmentPendingApprovals = departmentLeaveRequests.filter((item) => item.status === "Pending").length;
  const departmentPresentCount = departmentAttendanceRows.filter((row) => row.status === "Present" || row.status === "WFH" || row.status === "Late").length;
  const departmentAttendanceRate = departmentAttendanceRows.length
    ? Math.round((departmentPresentCount / departmentAttendanceRows.length) * 100)
    : 92;
  const departmentPerformanceScore = Math.min(98, 82 + Math.round(departmentEmployees.length / 18));
  const departmentGrievances = grievances.filter((item) => item.department === currentDepartment);
  const departmentTransfers = transfers.filter((item) => item.fromDept === currentDepartment || item.toDept === currentDepartment);
  const departmentMonthlyTrend = [
    { month: "Apr", value: 86 },
    { month: "May", value: 88 },
    { month: "Jun", value: 91 },
    { month: "Jul", value: 90 },
    { month: "Aug", value: 93 },
    { month: "Sep", value: 94 },
  ];
  const departmentTopPerformers = departmentEmployees.slice(0, 3).map((employee, index) => ({
    name: employee.name,
    designation: employee.designation,
    score: 90 + index * 2,
  }));
  const departmentAnnouncements = [
    { title: "Field staff review", detail: `${currentDepartment} team review scheduled for Thursday.` },
    { title: "Attendance compliance", detail: "Weekly compliance circular shared with ward supervisors." },
    { title: "Training refresh", detail: "New safety and service modules available to the team." },
  ];
  const departmentActivities = [
    { title: "Leave request reviewed", detail: "3 requests approved for ward supervisors." },
    { title: "Transfer initiated", detail: "One local transfer is pending review." },
    { title: "Grievance escalated", detail: "Ward-level grievance assigned to the department desk." },
  ];
  const myProfile = employees.find((employee) => employee.id === user?.employee_id) ?? employees[0];
  const personalLeaveBalance = 12 + (myProfile.department === "Sanitation" ? 2 : 0);
  const personalAttendanceRate = 94;
  const personalGrievances = grievances.filter((item) => item.filedBy.includes(myProfile.name.split(" ")[0]));
  const personalAnnouncements = [
    { title: "Policy update", detail: "Attendance marking window remains open until 10:00 AM." },
    { title: "Document notice", detail: "Your latest service certificate is available in your document tray." },
  ];

  const headerDescription = isAdmin
    ? `Here's what's happening across MCD — ${new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}`
    : isHrOfficer
      ? "Here are the zone-level metrics you need to monitor today."
      : isDepartmentHead
        ? `Here is a focused view of ${currentDepartment} team performance and daily operations.`
        : "Here is your latest HR information and personal updates.";

  return (
    <DashboardLayout>
      <PageHeader
        title={`${greeting}, ${user?.name.split(" ")[0] ?? ""}`}
        description={headerDescription}
        actions={
          isAdmin ? (
            <>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Download className="h-4 w-4" /> Export
              </Button>
              <Button size="sm" className="gap-1.5">
                <Plus className="h-4 w-4" /> Quick action
              </Button>
            </>
          ) : null
        }
      />

      {isAdmin && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            <StatCard label="Total Employees" value={stats.totalEmployees.toLocaleString("en-IN")} delta="+1.8%" trend="up" hint="vs last month" icon={Users} tone="primary" />
            <StatCard label="Present Today" value={stats.presentToday.toLocaleString("en-IN")} delta={`${presentPct}%`} trend="up" hint="attendance" icon={UserCheck} tone="success" />
            <StatCard label="On Leave" value={stats.onLeave} delta="-12" trend="down" hint="vs yesterday" icon={CalendarOff} tone="info" />
            <StatCard label="Pending Approvals" value={stats.pendingApprovals} delta="+5" trend="up" hint="needs action" icon={ClipboardList} tone="warning" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            <StatCard label="Payroll Processed" value={stats.payrollProcessed} hint="June 2026" icon={Wallet} tone="success" />
            <StatCard label="Open Grievances" value={stats.openGrievances} delta="+3" trend="up" hint="this week" icon={MessageSquareWarning} tone="destructive" />
            <StatCard label="Transfers (Month)" value={stats.transfersThisMonth} hint="executed" icon={ArrowLeftRight} tone="info" />
            <StatCard label="New Joiners" value={stats.newJoiners} delta="+8" trend="up" hint="this month" icon={UserPlus} tone="primary" />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
            <Card className="xl:col-span-2 border-border/60">
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle className="text-base">Attendance Trend</CardTitle>
                  <CardDescription>Last 14 days · MCD-wide</CardDescription>
                </div>
                <div className="flex items-center gap-1 text-xs text-success font-medium">
                  <TrendingUp className="h-4 w-4" /> +2.4%
                </div>
              </CardHeader>
              <CardContent>
                <FakeBarChart />
              </CardContent>
            </Card>

            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="text-base">Department Distribution</CardTitle>
                <CardDescription>Employees by department</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3.5">
                {departments.slice(0, 6).map((d, i) => {
                  const pct = [82, 68, 54, 47, 38, 29][i];
                  return (
                    <div key={d}>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-medium text-foreground">{d}</span>
                        <span className="text-muted-foreground">{pct}%</span>
                      </div>
                      <Progress value={pct} className="h-1.5" />
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
            <Card className="xl:col-span-2 border-border/60">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="text-base">Today's Attendance</CardTitle>
                  <CardDescription>Live check-ins from across zones</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/attendance">View all</Link>
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead className="hidden md:table-cell">Department</TableHead>
                        <TableHead>Check-in</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {todayAttendance.slice(0, 6).map((a) => (
                        <TableRow key={a.employeeId}>
                          <TableCell>
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
                                {a.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-medium truncate">{a.name}</p>
                                <p className="text-[11px] text-muted-foreground truncate">{a.employeeId}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{a.department}</TableCell>
                          <TableCell className="text-sm font-mono">{a.checkIn}</TableCell>
                          <TableCell><StatusBadge status={a.status} /></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="text-base">Quick Actions</CardTitle>
                <CardDescription>Frequently used workflows</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-2">
                {[
                  { label: "Add Employee", icon: UserPlus, to: "/employee-setup" },
                  { label: "Apply Leave", icon: Calendar, to: "/leave" },
                  { label: "Run Payroll", icon: Wallet, to: "/payroll" },
                  { label: "New Transfer", icon: ArrowLeftRight, to: "/transfers" },
                  { label: "File Grievance", icon: MessageSquareWarning, to: "/grievances" },
                  { label: "View Map", icon: Users, to: "/zone-map" },
                ].map((a) => (
                  <Button key={a.label} asChild variant="outline" className="h-auto flex-col gap-1.5 py-3.5 px-2 hover:bg-primary/5 hover:border-primary/30">
                    <Link to={a.to}>
                      <a.icon className="h-4 w-4 text-primary" />
                      <span className="text-xs font-medium text-center leading-tight">{a.label}</span>
                    </Link>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <Card className="xl:col-span-2 border-border/60">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="text-base">Pending Leave Approvals</CardTitle>
                  <CardDescription>Awaiting your review</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/leave">Open queue</Link>
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Request</TableHead>
                        <TableHead className="hidden sm:table-cell">Type</TableHead>
                        <TableHead className="hidden md:table-cell">Dates</TableHead>
                        <TableHead>Days</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {leaveRequests.filter((l) => l.status === "Pending").map((l) => (
                        <TableRow key={l.id}>
                          <TableCell>
                            <p className="text-sm font-medium">{l.employee}</p>
                            <p className="text-[11px] text-muted-foreground">{l.id}</p>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell text-sm">{l.type}</TableCell>
                          <TableCell className="hidden md:table-cell text-xs text-muted-foreground font-mono">
                            {l.from} → {l.to}
                          </TableCell>
                          <TableCell className="text-sm font-medium">{l.days}d</TableCell>
                          <TableCell><StatusBadge status={l.status} /></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="text-base">Recent Activity</CardTitle>
                <CardDescription>System & user events</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  {recentActivity.map((a) => (
                    <li key={a.id} className="flex gap-3">
                      <div className="flex flex-col items-center shrink-0">
                        <div className="h-2 w-2 rounded-full bg-primary mt-1.5" />
                        <div className="w-px flex-1 bg-border mt-1" />
                      </div>
                      <div className="min-w-0 pb-1">
                        <p className="text-sm leading-snug">
                          <span className="font-medium">{a.who}</span>{" "}
                          <span className="text-muted-foreground">{a.action}</span>{" "}
                          <span className="font-medium">{a.target}</span>
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{a.time}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border/60 mt-6">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-base">Payroll Summary — June 2026</CardTitle>
                <CardDescription>Top processed entries</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/payroll">View payroll</Link>
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead className="hidden md:table-cell">Department</TableHead>
                      <TableHead className="text-right">Basic</TableHead>
                      <TableHead className="text-right hidden sm:table-cell">Deductions</TableHead>
                      <TableHead className="text-right">Net Pay</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payrolls.slice(0, 5).map((p) => (
                      <TableRow key={p.id}>
                        <TableCell>
                          <p className="text-sm font-medium">{p.employee}</p>
                          <p className="text-[11px] text-muted-foreground">{p.employeeId}</p>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{p.department}</TableCell>
                        <TableCell className="text-right text-sm font-mono">₹{p.basic.toLocaleString("en-IN")}</TableCell>
                        <TableCell className="text-right text-sm font-mono hidden sm:table-cell text-destructive">
                          −₹{p.deductions.toLocaleString("en-IN")}
                        </TableCell>
                        <TableCell className="text-right text-sm font-mono font-semibold">₹{p.net.toLocaleString("en-IN")}</TableCell>
                        <TableCell><StatusBadge status={p.status} /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {isHrOfficer && (
        <div className="space-y-6">
          {/* HR Officer Header with Actions */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">Zone Operations Dashboard</h2>
              <p className="text-sm text-muted-foreground">South Zone · Real-time metrics and management tools</p>
            </div>
          </div>

          {/* Zone Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-4">
            <StatCard label="Zone Employee Count" value={hrZoneEmployeeCount.toLocaleString("en-IN")} hint="Across South Zone" icon={Users} tone="primary" />
            <StatCard label="Zone Attendance" value={hrZoneAttendance} hint="Today" icon={UserCheck} tone="success" />
            <StatCard label="Zone Payroll" value={hrZonePayroll} hint="Processed" icon={Wallet} tone="info" />
            <StatCard label="Zone Grievances" value={hrZoneGrievances} hint="Open cases" icon={MessageSquareWarning} tone="destructive" />
            <StatCard label="Pending Leaves" value={leaveRequests.filter((l) => l.status === "Pending").length.toString()} hint="Awaiting approval" icon={Calendar} tone="warning" />
            <StatCard label="Active Transfers" value={transfers.filter((t) => t.status === "Pending" || t.status === "Approved").length.toString()} hint="In progress" icon={ArrowLeftRight} tone="primary" />
          </div>

          {/* HR Officer Quick Actions */}
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
              <CardDescription>HR management tools and workflows</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {[
                  { label: "Review Leaves", icon: Calendar, to: "/leave" },
                  { label: "Manage Payroll", icon: Wallet, to: "/payroll" },
                  { label: "Process Transfers", icon: ArrowLeftRight, to: "/transfers" },
                  { label: "Add Employee", icon: UserPlus, to: "/employee-setup" },
                  { label: "Review Grievances", icon: MessageSquareWarning, to: "/grievances" },
                  { label: "Zone Analytics", icon: TrendingUp, to: "/delhi-workforce" },
                  { label: "Attendance Reports", icon: FileText, to: "/attendance" },
                  { label: "Employee 360", icon: UserRoundCog, to: "/employee-360" },
                  { label: "Bulk Operations", icon: ClipboardList, to: "/employees" },
                  { label: "Settings", icon: ShieldCheck, to: "/settings" },
                  { label: "Generate Report", icon: Download, to: "/dashboard" },
                  { label: "More Options", icon: Plus, to: "/dashboard" },
                ].map((action) => (
                  <Button key={action.label} asChild variant="outline" className="h-auto flex-col gap-1.5 py-3 px-2 hover:bg-primary/5 hover:border-primary/30 text-center">
                    <Link to={action.to}>
                      <action.icon className="h-4 w-4 text-primary" />
                      <span className="text-xs font-medium leading-tight">{action.label}</span>
                    </Link>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Leave Approvals */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <Card className="xl:col-span-2 border-border/60">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="text-base">Pending Leave Approvals</CardTitle>
                  <CardDescription>Awaiting your review</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/leave">Open queue</Link>
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Request</TableHead>
                        <TableHead className="hidden sm:table-cell">Type</TableHead>
                        <TableHead className="hidden md:table-cell">Dates</TableHead>
                        <TableHead>Days</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {leaveRequests.filter((l) => l.status === "Pending").slice(0, 5).map((l) => (
                        <TableRow key={l.id}>
                          <TableCell>
                            <p className="text-sm font-medium">{l.employee}</p>
                            <p className="text-[11px] text-muted-foreground">{l.id}</p>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell text-sm">{l.type}</TableCell>
                          <TableCell className="hidden md:table-cell text-xs text-muted-foreground font-mono">
                            {l.from} → {l.to}
                          </TableCell>
                          <TableCell className="text-sm font-medium">{l.days}d</TableCell>
                          <TableCell><StatusBadge status={l.status} /></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Zone Summary Widget */}
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="text-base">Zone Summary</CardTitle>
                <CardDescription>South Zone overview</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-lg border border-border/60 bg-muted/20 p-3">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Attendance Rate</span>
                    <span className="font-semibold text-foreground">94%</span>
                  </div>
                  <Progress value={94} className="h-1.5" />
                </div>
                <div className="rounded-lg border border-border/60 bg-muted/20 p-3">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Leave Utilization</span>
                    <span className="font-semibold text-foreground">62%</span>
                  </div>
                  <Progress value={62} className="h-1.5" />
                </div>
                <div className="rounded-lg border border-border/60 bg-muted/20 p-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Grievance Resolution</span>
                    <span className="font-semibold text-foreground">78%</span>
                  </div>
                </div>
                <Button className="w-full mt-2" asChild>
                  <Link to="/delhi-workforce">View Detailed Analytics</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Attendance & Transfers Overview */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <Card className="border-border/60">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="text-base">Today's Attendance</CardTitle>
                  <CardDescription>Zone-wide check-in status</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/attendance">Full report</Link>
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead className="hidden sm:table-cell">Department</TableHead>
                        <TableHead>Check-in</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {todayAttendance.slice(0, 5).map((a) => (
                        <TableRow key={a.employeeId}>
                          <TableCell>
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
                                {a.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-medium truncate">{a.name}</p>
                                <p className="text-[11px] text-muted-foreground truncate">{a.employeeId}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">{a.department}</TableCell>
                          <TableCell className="text-sm font-mono">{a.checkIn}</TableCell>
                          <TableCell><StatusBadge status={a.status} /></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/60">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="text-base">Active Transfers</CardTitle>
                  <CardDescription>Pending & approved transfers</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/transfers">Manage</Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {transfers.filter((t) => t.status === "Pending" || t.status === "Approved").slice(0, 5).map((transfer) => (
                  <div key={transfer.id} className="rounded-lg border border-border/60 bg-muted/20 p-3">
                    <div className="flex items-start justify-between">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground">{transfer.employee}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {transfer.fromZone} → {transfer.toZone}
                        </p>
                        <p className="text-xs text-muted-foreground">{transfer.reason}</p>
                      </div>
                      <StatusBadge status={transfer.status} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Grievances & Recent Activity */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <Card className="border-border/60">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="text-base">Zone Grievances</CardTitle>
                  <CardDescription>Current status summary</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/grievances">View all</Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Critical", value: "2", tone: "destructive" },
                    { label: "High", value: "5", tone: "warning" },
                    { label: "Medium", value: "8", tone: "info" },
                    { label: "Low", value: "3", tone: "success" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-lg border border-border/60 bg-muted/20 p-3">
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="text-lg font-bold text-foreground mt-1">{item.value}</p>
                    </div>
                  ))}
                </div>
                <Button className="w-full" variant="outline" asChild>
                  <Link to="/grievances">Review Grievances</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="text-base">Recent Activity</CardTitle>
                <CardDescription>Zone-wide system events</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  {recentActivity.slice(0, 5).map((a) => (
                    <li key={a.id} className="flex gap-3">
                      <div className="flex flex-col items-center shrink-0">
                        <div className="h-2 w-2 rounded-full bg-primary mt-1.5" />
                        <div className="w-px flex-1 bg-border mt-1" />
                      </div>
                      <div className="min-w-0 pb-1">
                        <p className="text-sm leading-snug">
                          <span className="font-medium">{a.who}</span>{" "}
                          <span className="text-muted-foreground">{a.action}</span>{" "}
                          <span className="font-medium">{a.target}</span>
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{a.time}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {isDepartmentHead && !isAdmin && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-4">
            {isDepartmentHead && (
              <>
                <StatCard label="Department Employee Count" value={departmentEmployees.length.toString()} hint={`In ${currentDepartment}`} icon={Users} tone="primary" />
                <StatCard label="Department Attendance %" value={`${departmentAttendanceRate}%`} hint="Current shift compliance" icon={UserCheck} tone="success" />
                <StatCard label="Team Leave Statistics" value={`${departmentPendingApprovals} pending`} hint="Awaiting review" icon={CalendarOff} tone="warning" />
                <StatCard label="Pending Approvals" value={departmentPendingApprovals.toString()} hint="Leave & transfers" icon={ClipboardList} tone="info" />
                <StatCard label="Department Performance Score" value={`${departmentPerformanceScore}/100`} hint="AI-led trend" icon={BadgeCheck} tone="success" />
                <StatCard label="Department Grievance Summary" value={`${departmentGrievances.length} open`} hint="Current quarter" icon={MessageSquareWarning} tone="destructive" />
              </>
            )}
          </div>

          {isDepartmentHead && (
            <>
              <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-6">
                <Card className="border-border/60">
                  <CardHeader>
                    <CardTitle className="text-base">Department Attendance Trend</CardTitle>
                    <CardDescription>Activity pattern for {currentDepartment}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <DepartmentTrendChart data={departmentMonthlyTrend} />
                  </CardContent>
                </Card>

                <Card className="border-border/60">
                  <CardHeader>
                    <CardTitle className="text-base">Team Availability</CardTitle>
                    <CardDescription>Current presence snapshot</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="rounded-lg border border-border/60 bg-muted/20 p-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Available now</span>
                        <span className="font-semibold text-foreground">{departmentPresentCount}/{departmentEmployees.length}</span>
                      </div>
                      <Progress value={(departmentPresentCount / Math.max(departmentEmployees.length, 1)) * 100} className="mt-2 h-1.5" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-foreground">Upcoming birthdays</p>
                      {departmentEmployees.slice(0, 3).map((employee) => (
                        <div key={employee.id} className="flex items-center justify-between rounded-lg border border-border/60 bg-background px-3 py-2 text-sm">
                          <span>{employee.name}</span>
                          <span className="text-muted-foreground">Next week</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <Card className="border-border/60">
                  <CardHeader>
                    <CardTitle className="text-base">Recent Department Activities</CardTitle>
                    <CardDescription>Latest operational updates</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {departmentActivities.map((item) => (
                      <div key={item.title} className="rounded-lg border border-border/60 bg-muted/20 p-3">
                        <p className="text-sm font-medium text-foreground">{item.title}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-border/60">
                  <CardHeader>
                    <CardTitle className="text-base">Department Announcements</CardTitle>
                    <CardDescription>Updates relevant to the team</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {departmentAnnouncements.map((item) => (
                      <div key={item.title} className="rounded-lg border border-border/60 bg-background p-3">
                        <p className="text-sm font-medium text-foreground">{item.title}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-border/60">
                  <CardHeader>
                    <CardTitle className="text-base">Recent Transfers</CardTitle>
                    <CardDescription>Within {currentDepartment}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {departmentTransfers.slice(0, 3).map((item) => (
                      <div key={item.id} className="rounded-lg border border-border/60 bg-muted/20 p-3">
                        <p className="text-sm font-medium text-foreground">{item.employee}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{item.fromZone} → {item.toZone}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <Card className="border-border/60">
                  <CardHeader>
                    <CardTitle className="text-base">Top Performers</CardTitle>
                    <CardDescription>Best performing team members</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {departmentTopPerformers.map((person) => (
                      <div key={person.name} className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/20 px-3 py-3">
                        <div>
                          <p className="text-sm font-medium text-foreground">{person.name}</p>
                          <p className="text-xs text-muted-foreground">{person.designation}</p>
                        </div>
                        <div className="text-sm font-semibold text-foreground">{person.score}/100</div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-border/60">
                  <CardHeader>
                    <CardTitle className="text-base">Department Summary</CardTitle>
                    <CardDescription>Key operational indicators</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="rounded-lg border border-border/60 bg-muted/20 p-3">
                      <p className="text-sm font-medium text-foreground">Attendance focus</p>
                      <p className="mt-1 text-sm text-muted-foreground">Attendance remained stable with a strong recovery trend across the month.</p>
                    </div>
                    <div className="rounded-lg border border-border/60 bg-muted/20 p-3">
                      <p className="text-sm font-medium text-foreground">Leave pressure</p>
                      <p className="mt-1 text-sm text-muted-foreground">Leave approvals remain manageable and mostly concentrated in the middle of the month.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      )}

      {isEmployee && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <StatCard label="Today's Attendance" value={`${personalAttendanceRate}%`} hint="On time" icon={UserCheck} tone="success" />
            <StatCard label="Leave Balance" value={`${personalLeaveBalance} days`} hint="Remaining" icon={CalendarOff} tone="info" />
            <StatCard label="Latest Payslip" value="₹ 48,250" hint="June 2026" icon={Wallet} tone="primary" />
            <StatCard label="My Grievances" value={personalGrievances.length.toString()} hint="Open cases" icon={MessageSquareWarning} tone="warning" />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-6">
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="text-base">Quick Actions</CardTitle>
                <CardDescription>Personal HR tasks and common requests</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-2">
                {[
                  { label: "Apply Leave", icon: Calendar, to: "/leave" },
                  { label: "View Payslip", icon: Wallet, to: "/payroll" },
                  { label: "Mark Attendance", icon: UserCheck, to: "/attendance" },
                  { label: "Raise Grievance", icon: MessageSquareWarning, to: "/grievances" },
                  { label: "Update Profile", icon: UserRoundCog, to: "/profile" },
                  { label: "View Documents", icon: FileText, to: "/profile" },
                  { label: "Contact HR", icon: MessageCircleMore, to: "/grievances" },
                ].map((action) => (
                  <Button key={action.label} asChild variant="outline" className="h-auto flex-col gap-1.5 py-3.5 px-2 hover:bg-primary/5 hover:border-primary/30">
                    <Link to={action.to}>
                      <action.icon className="h-4 w-4 text-primary" />
                      <span className="text-xs font-medium text-center leading-tight">{action.label}</span>
                    </Link>
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="text-base">My Profile</CardTitle>
                <CardDescription>Personal workspace snapshot</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-muted/20 p-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary text-sm font-semibold">
                    {myProfile.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{myProfile.name}</p>
                    <p className="text-xs text-muted-foreground">{myProfile.designation}</p>
                  </div>
                </div>
                <div className="grid gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2"><Building2 className="h-4 w-4 text-primary" /> {myProfile.department}</div>
                  <div className="flex items-center gap-2"><BriefcaseBusiness className="h-4 w-4 text-primary" /> {myProfile.zone}</div>
                  <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> {myProfile.email}</div>
                  <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> {myProfile.phone}</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="text-base">My Attendance</CardTitle>
                <CardDescription>Daily presence and working hours</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-lg border border-border/60 bg-muted/20 p-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Present today</span>
                    <span className="font-semibold text-foreground">On time</span>
                  </div>
                </div>
                <div className="rounded-lg border border-border/60 bg-background p-3 text-sm text-muted-foreground">
                  Working hours: 8h 15m · Shift: 09:00 - 18:00
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="text-base">My Documents & Training</CardTitle>
                <CardDescription>Certificates and personal files</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-muted/20 p-3 text-sm">
                  <GraduationCap className="h-4 w-4 text-primary" /> Digital safety training completed
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-muted/20 p-3 text-sm">
                  <FileText className="h-4 w-4 text-primary" /> Service certificate ready for download
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="text-base">Support & Help</CardTitle>
                <CardDescription>HR support and office information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-lg border border-border/60 bg-muted/20 p-3 text-sm">
                  <p className="font-medium text-foreground">Reporting manager</p>
                  <p className="mt-1 text-muted-foreground">Vikram Singh · Department Head</p>
                </div>
                <div className="rounded-lg border border-border/60 bg-muted/20 p-3 text-sm">
                  <p className="font-medium text-foreground">Office information</p>
                  <p className="mt-1 text-muted-foreground">Ward 88 · South Zone · Civic Center</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="text-base">Announcements</CardTitle>
                <CardDescription>Latest updates for your workday</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {personalAnnouncements.map((item) => (
                    <li key={item.title} className="rounded-lg border border-border/60 bg-muted/20 p-3">
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="text-base">Upcoming Holidays</CardTitle>
                <CardDescription>Planned leave calendar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { title: "Independence Day", date: "15 Aug 2026" },
                  { title: "Janmashtami", date: "06 Sep 2026" },
                  { title: "Muharram", date: "26 Jun 2026" },
                ].map((holiday) => (
                  <div key={holiday.title} className="flex items-center justify-between rounded-lg border border-border/60 bg-background px-3 py-2 text-sm">
                    <span>{holiday.title}</span>
                    <span className="text-muted-foreground">{holiday.date}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

function DepartmentTrendChart({ data }: { data: Array<{ month: string; value: number }> }) {
  const max = 100;
  return (
    <div className="h-64 flex items-end justify-between gap-1.5">
      {data.map((item) => (
        <div key={item.month} className="flex-1 flex flex-col items-center gap-2 min-w-0">
          <div className="w-full flex flex-col justify-end h-52">
            <div
              className="w-full rounded-t-md bg-gradient-to-t from-primary to-primary/70 transition-all hover:from-success hover:to-success/70"
              style={{ height: `${(item.value / max) * 100}%` }}
              title={`${item.value}%`}
            />
          </div>
          <span className="text-[10px] text-muted-foreground truncate">{item.month}</span>
        </div>
      ))}
    </div>
  );
}

function FakeBarChart() {
  const data = [62, 68, 71, 74, 70, 65, 60, 78, 82, 80, 84, 88, 90, 91];
  const labels = ["14d", "13", "12", "11", "10", "9", "8", "7", "6", "5", "4", "3", "2", "Today"];
  const max = 100;
  return (
    <div className="h-64 flex items-end justify-between gap-1.5">
      {data.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-2 min-w-0">
          <div className="w-full flex flex-col justify-end h-52">
            <div
              className="w-full rounded-t-md bg-gradient-to-t from-primary to-primary/70 transition-all hover:from-success hover:to-success/70"
              style={{ height: `${(v / max) * 100}%` }}
              title={`${v}%`}
            />
          </div>
          <span className="text-[10px] text-muted-foreground truncate">{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}
