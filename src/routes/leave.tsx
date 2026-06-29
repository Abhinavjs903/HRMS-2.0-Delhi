import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/widgets/page-header";
import { StatCard } from "@/components/widgets/stat-card";
import { StatusBadge } from "@/components/widgets/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, CheckCircle2, XCircle, Clock, Plus, Check, X } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { leaveRequests, employees } from "@/lib/mock-data";
import { filterLeaveForUser } from "@/lib/demo-data-filter";

export const Route = createFileRoute("/leave")({
  head: () => ({ meta: [{ title: "Leave Management — Nagar Setu HRMS" }] }),
  component: LeavePage,
});

function LeavePage() {
  const { user } = useAuth();
  const visibleLeaveRequests = filterLeaveForUser(leaveRequests, user, employees);
  const pending = visibleLeaveRequests.filter((l) => l.status === "Pending").length;
  const approved = visibleLeaveRequests.filter((l) => l.status === "Approved").length;
  const rejected = visibleLeaveRequests.filter((l) => l.status === "Rejected").length;

  return (
    <DashboardLayout>
      <PageHeader
        title="Leave Management"
        description="Review, approve and track employee leave requests"
        actions={<Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" /> Apply Leave</Button>}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Pending" value={pending} icon={Clock} tone="warning" />
        <StatCard label="Approved" value={approved} icon={CheckCircle2} tone="success" />
        <StatCard label="Rejected" value={rejected} icon={XCircle} tone="destructive" />
        <StatCard label="Total Requests" value={visibleLeaveRequests.length} icon={CalendarDays} tone="primary" />
      </div>

      <Card className="border-border/60">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base">Leave Requests</CardTitle>
          <Tabs defaultValue="all" className="w-auto">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Employee</TableHead>
                <TableHead className="hidden md:table-cell">Type</TableHead>
                <TableHead className="hidden lg:table-cell">Dates</TableHead>
                <TableHead>Days</TableHead>
                <TableHead className="hidden xl:table-cell">Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleLeaveRequests.map((l) => (
                <TableRow key={l.id}>
                  <TableCell className="text-xs font-mono text-muted-foreground">{l.id}</TableCell>
                  <TableCell>
                    <p className="text-sm font-medium">{l.employee}</p>
                    <p className="text-[11px] text-muted-foreground">{l.employeeId}</p>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm">{l.type}</TableCell>
                  <TableCell className="hidden lg:table-cell text-xs font-mono text-muted-foreground">{l.from} → {l.to}</TableCell>
                  <TableCell className="text-sm font-medium">{l.days}d</TableCell>
                  <TableCell className="hidden xl:table-cell text-sm text-muted-foreground max-w-xs truncate">{l.reason}</TableCell>
                  <TableCell><StatusBadge status={l.status} /></TableCell>
                  <TableCell>
                    {l.status === "Pending" ? (
                      <div className="flex gap-1">
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-success hover:bg-success/10"><Check className="h-4 w-4" /></Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:bg-destructive/10"><X className="h-4 w-4" /></Button>
                      </div>
                    ) : (
                      <Button size="sm" variant="ghost">View</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
