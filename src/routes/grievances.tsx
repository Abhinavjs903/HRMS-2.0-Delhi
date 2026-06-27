import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/widgets/page-header";
import { StatCard } from "@/components/widgets/stat-card";
import { StatusBadge } from "@/components/widgets/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MessageSquareWarning, CheckCircle2, AlertOctagon, Eye, Plus } from "lucide-react";
import { grievances } from "@/lib/mock-data";

export const Route = createFileRoute("/grievances")({
  head: () => ({ meta: [{ title: "Grievances — Nagar Setu HRMS" }] }),
  component: GrievancesPage,
});

function GrievancesPage() {
  const open = grievances.filter((g) => g.status === "Open").length;
  const review = grievances.filter((g) => g.status === "In Review").length;
  const resolved = grievances.filter((g) => g.status === "Resolved").length;
  const critical = grievances.filter((g) => g.priority === "Critical").length;

  return (
    <DashboardLayout>
      <PageHeader
        title="Grievances"
        description="Track and resolve workplace and citizen-filed grievances"
        actions={<Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" /> File Grievance</Button>}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Open" value={open} icon={MessageSquareWarning} tone="destructive" />
        <StatCard label="In Review" value={review} icon={Eye} tone="warning" />
        <StatCard label="Resolved" value={resolved} icon={CheckCircle2} tone="success" />
        <StatCard label="Critical" value={critical} icon={AlertOctagon} tone="destructive" />
      </div>

      <Card className="border-border/60">
        <CardHeader><CardTitle className="text-base">Grievance Tickets</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead className="hidden lg:table-cell">Zone · Ward</TableHead>
                <TableHead className="hidden xl:table-cell">Raised</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {grievances.map((g) => (
                <TableRow key={g.id}>
                  <TableCell className="text-xs font-mono text-muted-foreground">{g.id}</TableCell>
                  <TableCell>
                    <p className="text-sm font-medium">{g.title}</p>
                    <p className="text-[11px] text-muted-foreground">by {g.filedBy}</p>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm">{g.category}</TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{g.zone} · {g.ward}</TableCell>
                  <TableCell className="hidden xl:table-cell text-xs font-mono text-muted-foreground">{g.raisedOn}</TableCell>
                  <TableCell><StatusBadge status={g.priority} /></TableCell>
                  <TableCell><StatusBadge status={g.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
