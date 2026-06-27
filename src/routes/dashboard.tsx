import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Users, UserCheck, CalendarOff, ClipboardList, Wallet, MessageSquareWarning,
  ArrowLeftRight, UserPlus, TrendingUp, Calendar, Download, Plus,
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
import {
  stats, leaveRequests, recentActivity, todayAttendance, payrolls, departments,
} from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [{ title: "Dashboard — Nagar Setu HRMS" }],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { user } = useAuth();
  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  })();

  const presentPct = Math.round((stats.presentToday / stats.totalEmployees) * 100);

  return (
    <DashboardLayout>
      <PageHeader
        title={`${greeting}, ${user?.name.split(" ")[0] ?? ""}`}
        description={`Here's what's happening across MCD — ${new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}`}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Download className="h-4 w-4" /> Export
            </Button>
            <Button size="sm" className="gap-1.5">
              <Plus className="h-4 w-4" /> Quick action
            </Button>
          </>
        }
      />

      {/* Stats */}
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
        {/* Chart placeholder — attendance trend */}
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

        {/* Department distribution */}
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
        {/* Today's attendance */}
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
          </CardContent>
        </Card>

        {/* Quick actions */}
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
        {/* Pending leave approvals */}
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
          </CardContent>
        </Card>

        {/* Recent activity */}
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

      {/* Payroll snapshot */}
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
        </CardContent>
      </Card>
    </DashboardLayout>
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
