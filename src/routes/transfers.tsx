import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/widgets/page-header";
import { StatusBadge } from "@/components/widgets/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, ArrowRight } from "lucide-react";
import { transfers } from "@/lib/mock-data";

export const Route = createFileRoute("/transfers")({
  head: () => ({ meta: [{ title: "Transfers — Nagar Setu HRMS" }] }),
  component: TransfersPage,
});

function TransfersPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Transfers"
        description="Manage inter-zone and inter-department transfers"
        actions={<Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" /> New Transfer</Button>}
      />

      <Card className="border-border/60">
        <CardHeader><CardTitle className="text-base">Transfer Orders</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Employee</TableHead>
                <TableHead className="hidden md:table-cell">Movement</TableHead>
                <TableHead className="hidden lg:table-cell">Effective</TableHead>
                <TableHead className="hidden xl:table-cell">Reason</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transfers.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="text-xs font-mono text-muted-foreground">{t.id}</TableCell>
                  <TableCell>
                    <p className="text-sm font-medium">{t.employee}</p>
                    <p className="text-[11px] text-muted-foreground">{t.employeeId}</p>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">{t.fromZone}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-primary" />
                      <span className="font-medium">{t.toZone}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-sm font-mono text-muted-foreground">{t.effectiveDate}</TableCell>
                  <TableCell className="hidden xl:table-cell text-sm text-muted-foreground max-w-xs truncate">{t.reason}</TableCell>
                  <TableCell><StatusBadge status={t.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
