import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/widgets/page-header";
import { StatusBadge } from "@/components/widgets/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Download, Filter, Mail, Phone, MoreHorizontal } from "lucide-react";
import { employees, departments } from "@/lib/mock-data";

export const Route = createFileRoute("/employees")({
  head: () => ({ meta: [{ title: "Employees — Nagar Setu HRMS" }] }),
  component: EmployeesPage,
});

function EmployeesPage() {
  const [q, setQ] = useState("");
  const [dept, setDept] = useState("all");
  const filtered = employees.filter((e) =>
    (dept === "all" || e.department === dept) &&
    (e.name.toLowerCase().includes(q.toLowerCase()) || e.id.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <DashboardLayout>
      <PageHeader
        title="Employees"
        description={`${employees.length.toLocaleString("en-IN")} employees across ${departments.length} departments`}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-1.5"><Download className="h-4 w-4" /> Export</Button>
            <Button asChild size="sm" className="gap-1.5">
              <Link to="/employee-setup">
                <Plus className="h-4 w-4" /> Add Employee
              </Link>
            </Button>
          </>
        }
      />

      <Card className="border-border/60 mb-4">
        <CardContent className="p-4 flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center">
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or employee ID…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={dept} onValueChange={setDept}>
            <SelectTrigger className="w-full sm:w-52"><SelectValue placeholder="Department" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All departments</SelectItem>
              {departments.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button variant="outline" size="default" className="gap-1.5"><Filter className="h-4 w-4" /> Filters</Button>
        </CardContent>
      </Card>

      <Card className="border-border/60">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead className="hidden md:table-cell">Department</TableHead>
                <TableHead className="hidden lg:table-cell">Designation</TableHead>
                <TableHead className="hidden lg:table-cell">Zone · Ward</TableHead>
                <TableHead className="hidden xl:table-cell">Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((e) => (
                <TableRow key={e.id}>
                  <TableCell>
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
                        {e.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{e.name}</p>
                        <p className="text-[11px] text-muted-foreground truncate">{e.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm">{e.department}</TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{e.designation}</TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{e.zone} · {e.ward}</TableCell>
                  <TableCell className="hidden xl:table-cell">
                    <div className="flex flex-col gap-0.5 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {e.email}</span>
                      <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {e.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell><StatusBadge status={e.status} /></TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center justify-between p-4 border-t text-xs text-muted-foreground">
            <span>Showing {filtered.length} of {employees.length}</span>
            <div className="flex gap-1">
              <Button variant="outline" size="sm">Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
