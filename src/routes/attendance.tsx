import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/widgets/page-header";
import { StatCard } from "@/components/widgets/stat-card";
import { StatusBadge } from "@/components/widgets/status-badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  UserCheck, UserX, CalendarOff, Clock, Download, Calendar,
  CheckCircle, LogOut, Briefcase, TrendingUp, Users, Phone, FileText,
  AlertCircle, Clock3, Zap, Heart, Sun, Info,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { normalizeRole } from "@/lib/permissions";
import { todayAttendance, stats, employees } from "@/lib/mock-data";
import { filterAttendanceForUser } from "@/lib/demo-data-filter";

export const Route = createFileRoute("/attendance")({
  head: () => ({ meta: [{ title: "Attendance — Nagar Setu HRMS" }] }),
  component: AttendancePage,
});

function AttendancePage() {
  const { user } = useAuth();
  const role = normalizeRole(user?.role);
  const isEmployee = role === "employee";
  const visibleAttendance = filterAttendanceForUser(todayAttendance, user, employees);

  // For role-based views
  const present = visibleAttendance.filter((a) => a.status === "Present" || a.status === "WFH").length;
  const late = visibleAttendance.filter((a) => a.status === "Late").length;
  const absent = visibleAttendance.filter((a) => a.status === "Absent").length;
  const leave = visibleAttendance.filter((a) => a.status === "On Leave").length;

  // Employee-specific stats
  const myAttendance = visibleAttendance.length > 0 ? visibleAttendance[0] : null;
  const monthlyAttendance = 94; // Demo: 94% attendance
  const leaveBalance = 12; // Demo: 12 days remaining
  const attendanceTrend = "↑ +2%" as const; // Demo trend

  return (
    <DashboardLayout>
      {isEmployee ? (
        // EMPLOYEE PERSONALIZED VIEW
        <>
          <PageHeader
            title="My Attendance"
            description={`Today · ${new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}`}
            actions={
              <>
                <Button variant="outline" size="sm" className="gap-1.5"><Calendar className="h-4 w-4" /> Select date</Button>
                <Button variant="outline" size="sm" className="gap-1.5"><Download className="h-4 w-4" /> Export</Button>
              </>
            }
          />

          {/* My Attendance Today Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            <StatCard
              label="Current Status"
              value={myAttendance?.status ?? "Not Marked"}
              hint={myAttendance?.status === "Present" ? "Checked in" : "Not yet checked in"}
              icon={CheckCircle}
              tone={myAttendance?.status === "Present" || myAttendance?.status === "WFH" ? "success" : "warning"}
            />
            <StatCard
              label="Check-in Time"
              value={myAttendance?.checkIn ?? "—"}
              hint={myAttendance?.checkIn ? "Logged in" : "Pending"}
              icon={Clock3}
              tone="info"
            />
            <StatCard
              label="Working Hours"
              value={myAttendance?.hours ?? "—"}
              hint="Today's duration"
              icon={Briefcase}
              tone="primary"
            />
            <StatCard
              label="Monthly Attendance"
              value={`${monthlyAttendance}%`}
              delta={attendanceTrend}
              trend="up"
              hint="This month"
              icon={TrendingUp}
              tone="success"
            />
          </div>

          {/* Leave Balance & Attendance Calendar */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
            <Card className="xl:col-span-2 border-border/60">
              <CardHeader>
                <CardTitle className="text-base">Attendance History</CardTitle>
                <CardDescription>Your last 7 days attendance record</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { date: "Today (Jun 30)", status: "Present", checkIn: "09:02", checkOut: "—", hours: "8h 12m" },
                    { date: "Jun 29", status: "Present", checkIn: "09:00", checkOut: "17:45", hours: "8h 45m" },
                    { date: "Jun 28", status: "Present", checkIn: "08:55", checkOut: "17:30", hours: "8h 35m" },
                    { date: "Jun 27", status: "WFH", checkIn: "09:30", checkOut: "18:00", hours: "8h 30m" },
                    { date: "Jun 26", status: "On Leave", checkIn: "—", checkOut: "—", hours: "—" },
                    { date: "Jun 25", status: "Present", checkIn: "09:10", checkOut: "17:20", hours: "8h 10m" },
                    { date: "Jun 24", status: "Present", checkIn: "08:48", checkOut: "17:15", hours: "8h 27m" },
                  ].map((record, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors">
                      <div className="min-w-0">
                        <p className="text-sm font-medium">{record.date}</p>
                        <p className="text-xs text-muted-foreground">{record.checkIn !== "—" ? `${record.checkIn} - ${record.checkOut}` : "Not marked"}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-mono text-muted-foreground">{record.hours}</span>
                        <StatusBadge status={record.status} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {/* Leave Balance Card */}
              <Card className="border-border/60">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Leave Balance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Remaining Days</span>
                      <span className="text-xl font-bold text-primary">{leaveBalance}</span>
                    </div>
                    <Progress value={(leaveBalance / 24) * 100} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">Of total annual allocation</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full gap-1.5">
                    <CalendarOff className="h-4 w-4" /> Apply Leave
                  </Button>
                </CardContent>
              </Card>

              {/* Office Timings */}
              <Card className="border-border/60">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Sun className="h-4 w-4" /> Office Timings
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Check-in</span>
                    <span className="font-mono">09:00 AM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Check-out</span>
                    <span className="font-mono">06:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Working Hours</span>
                    <span className="font-mono">9 hours</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              <Button variant="outline" size="sm" className="flex flex-col items-center justify-center h-auto py-3 gap-1.5">
                <CheckCircle className="h-4 w-4" />
                <span className="text-xs">Mark Attendance</span>
              </Button>
              <Button variant="outline" size="sm" className="flex flex-col items-center justify-center h-auto py-3 gap-1.5">
                <AlertCircle className="h-4 w-4" />
                <span className="text-xs">Request Correction</span>
              </Button>
              <Button variant="outline" size="sm" className="flex flex-col items-center justify-center h-auto py-3 gap-1.5">
                <Zap className="h-4 w-4" />
                <span className="text-xs">Raise Dispute</span>
              </Button>
              <Button variant="outline" size="sm" className="flex flex-col items-center justify-center h-auto py-3 gap-1.5">
                <FileText className="h-4 w-4" />
                <span className="text-xs">Download Report</span>
              </Button>
              <Button variant="outline" size="sm" className="flex flex-col items-center justify-center h-auto py-3 gap-1.5">
                <Phone className="h-4 w-4" />
                <span className="text-xs">Contact Manager</span>
              </Button>
              <Button variant="outline" size="sm" className="flex flex-col items-center justify-center h-auto py-3 gap-1.5">
                <Heart className="h-4 w-4" />
                <span className="text-xs">Contact HR</span>
              </Button>
            </div>
          </div>

          {/* Helpful Information */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6">
            <Card className="border-border/60">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Info className="h-4 w-4" /> Attendance Rules
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Mark attendance before 10:00 AM daily</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Late check-in after 10:00 AM is recorded</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Minimum 8 hours working time required</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>WFH requests must be pre-approved</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/60">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Recent Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { title: "Attendance marked", time: "Today at 09:02 AM" },
                  { title: "Leave approved", time: "Yesterday at 3:45 PM" },
                  { title: "Payslip available", time: "3 days ago" },
                ].map((notif, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2 rounded bg-muted/40">
                    <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium">{notif.title}</p>
                      <p className="text-[11px] text-muted-foreground">{notif.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        // ADMIN / HR OFFICER / DEPARTMENT HEAD VIEW
        <>
          <PageHeader
            title="Attendance"
            description={`Today · ${new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}`}
            actions={
              <>
                <Button variant="outline" size="sm" className="gap-1.5"><Calendar className="h-4 w-4" /> Select date</Button>
                <Button variant="outline" size="sm" className="gap-1.5"><Download className="h-4 w-4" /> Export</Button>
              </>
            }
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard label="Present" value={`${stats.presentToday.toLocaleString("en-IN")}`} hint={`${present}/8 in view`} icon={UserCheck} tone="success" />
            <StatCard label="Late" value="148" hint={`${late} in view`} icon={Clock} tone="warning" />
            <StatCard label="Absent" value="284" hint={`${absent} in view`} icon={UserX} tone="destructive" />
            <StatCard label="On Leave" value={stats.onLeave} hint={`${leave} in view`} icon={CalendarOff} tone="info" />
          </div>

          <Tabs defaultValue="today">
            <TabsList>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="week">This Week</TabsTrigger>
              <TabsTrigger value="month">This Month</TabsTrigger>
            </TabsList>
            <TabsContent value="today" className="mt-4">
              <Card className="border-border/60">
                <CardHeader><CardTitle className="text-base">Attendance Register</CardTitle></CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead className="hidden md:table-cell">Department</TableHead>
                        <TableHead>Check-in</TableHead>
                        <TableHead className="hidden sm:table-cell">Check-out</TableHead>
                        <TableHead className="hidden sm:table-cell">Hours</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {visibleAttendance.map((a) => (
                        <TableRow key={a.employeeId}>
                          <TableCell>
                            <div className="flex items-center gap-2.5">
                              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
                                {a.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-medium truncate">{a.name}</p>
                                <p className="text-[11px] text-muted-foreground">{a.employeeId}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{a.department}</TableCell>
                          <TableCell className="text-sm font-mono">{a.checkIn}</TableCell>
                          <TableCell className="hidden sm:table-cell text-sm font-mono">{a.checkOut}</TableCell>
                          <TableCell className="hidden sm:table-cell text-sm font-mono">{a.hours}</TableCell>
                          <TableCell><StatusBadge status={a.status} /></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="week" className="mt-4">
              <Card className="border-border/60"><CardContent className="p-10 text-center text-sm text-muted-foreground">Weekly attendance report — coming soon</CardContent></Card>
            </TabsContent>
            <TabsContent value="month" className="mt-4">
              <Card className="border-border/60"><CardContent className="p-10 text-center text-sm text-muted-foreground">Monthly attendance report — coming soon</CardContent></Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </DashboardLayout>
  );
}
