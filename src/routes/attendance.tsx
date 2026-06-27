import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/widgets/page-header";
import { StatCard } from "@/components/widgets/stat-card";
import { StatusBadge } from "@/components/widgets/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { UserCheck, UserX, CalendarOff, Clock, Download, Calendar } from "lucide-react";
import { todayAttendance, stats } from "@/lib/mock-data";

export const Route = createFileRoute("/attendance")({
  head: () => ({ meta: [{ title: "Attendance — Nagar Setu HRMS" }] }),
  component: AttendancePage,
});

function AttendancePage() {
  const present = todayAttendance.filter((a) => a.status === "Present" || a.status === "WFH").length;
  const late = todayAttendance.filter((a) => a.status === "Late").length;
  const absent = todayAttendance.filter((a) => a.status === "Absent").length;
  const leave = todayAttendance.filter((a) => a.status === "On Leave").length;

  return (
    <DashboardLayout>
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
                  {todayAttendance.map((a) => (
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
    </DashboardLayout>
  );
}
