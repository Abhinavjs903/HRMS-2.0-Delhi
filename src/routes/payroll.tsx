import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/widgets/page-header";
import { StatCard } from "@/components/widgets/stat-card";
import { StatusBadge } from "@/components/widgets/status-badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Wallet, Banknote, TrendingUp, Receipt, Download, Play } from "lucide-react";
import { payrolls } from "@/lib/mock-data";

export const Route = createFileRoute("/payroll")({
  head: () => ({ meta: [{ title: "Payroll — Nagar Setu HRMS" }] }),
  component: PayrollPage,
});

function PayrollPage() {
  const totalGross = payrolls.reduce((s, p) => s + p.basic + p.hra + p.da, 0);
  const totalNet = payrolls.reduce((s, p) => s + p.net, 0);
  const totalDed = payrolls.reduce((s, p) => s + p.deductions, 0);

  return (
    <DashboardLayout>
      <PageHeader
        title="Payroll"
        description="June 2026 payroll cycle"
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-1.5"><Download className="h-4 w-4" /> Export</Button>
            <Button size="sm" className="gap-1.5"><Play className="h-4 w-4" /> Run Payroll</Button>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Gross Payroll" value={`₹${(totalGross / 100000).toFixed(2)}L`} icon={Wallet} tone="primary" />
        <StatCard label="Net Disbursed" value={`₹${(totalNet / 100000).toFixed(2)}L`} delta="+4.2%" trend="up" icon={Banknote} tone="success" />
        <StatCard label="Deductions" value={`₹${(totalDed / 100000).toFixed(2)}L`} icon={Receipt} tone="warning" />
        <StatCard label="Avg. Salary" value={`₹${Math.round(totalNet / payrolls.length).toLocaleString("en-IN")}`} icon={TrendingUp} tone="info" />
      </div>

      <Card className="border-border/60">
        <CardHeader>
          <CardTitle className="text-base">Payroll Register — June 2026</CardTitle>
          <CardDescription>Salary breakup for processed employees</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead className="hidden lg:table-cell">Department</TableHead>
                <TableHead className="text-right">Basic</TableHead>
                <TableHead className="text-right hidden md:table-cell">HRA</TableHead>
                <TableHead className="text-right hidden md:table-cell">DA</TableHead>
                <TableHead className="text-right hidden sm:table-cell">Deductions</TableHead>
                <TableHead className="text-right">Net Pay</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payrolls.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <p className="text-sm font-medium">{p.employee}</p>
                    <p className="text-[11px] text-muted-foreground">{p.employeeId}</p>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{p.department}</TableCell>
                  <TableCell className="text-right text-sm font-mono">₹{p.basic.toLocaleString("en-IN")}</TableCell>
                  <TableCell className="text-right text-sm font-mono hidden md:table-cell">₹{p.hra.toLocaleString("en-IN")}</TableCell>
                  <TableCell className="text-right text-sm font-mono hidden md:table-cell">₹{p.da.toLocaleString("en-IN")}</TableCell>
                  <TableCell className="text-right text-sm font-mono hidden sm:table-cell text-destructive">−₹{p.deductions.toLocaleString("en-IN")}</TableCell>
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
