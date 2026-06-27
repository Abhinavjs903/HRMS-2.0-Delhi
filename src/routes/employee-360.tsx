import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/widgets/page-header";
import { StatusBadge } from "@/components/widgets/status-badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search, Mail, Phone, MapPin, Briefcase, Calendar, Award, FileText, CalendarCheck, Wallet, ArrowLeftRight } from "lucide-react";
import { employees } from "@/lib/mock-data";

export const Route = createFileRoute("/employee-360")({
  head: () => ({ meta: [{ title: "Employee 360 — Nagar Setu HRMS" }] }),
  component: Employee360Page,
});

function Employee360Page() {
  const [selectedId, setSelectedId] = useState(employees[0].id);
  const [q, setQ] = useState("");
  const list = employees.filter((e) => e.name.toLowerCase().includes(q.toLowerCase()) || e.id.toLowerCase().includes(q.toLowerCase()));
  const emp = employees.find((e) => e.id === selectedId) ?? employees[0];

  return (
    <DashboardLayout>
      <PageHeader title="Employee 360" description="Full lifecycle view of any MCD employee" />

      <div className="grid grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)] gap-6">
        {/* Picker */}
        <Card className="border-border/60 lg:max-h-[70vh] flex flex-col">
          <CardHeader className="pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Find employee…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
            </div>
          </CardHeader>
          <CardContent className="p-2 overflow-y-auto">
            <div className="space-y-0.5">
              {list.map((e) => (
                <button
                  key={e.id}
                  onClick={() => setSelectedId(e.id)}
                  className={`w-full text-left flex items-center gap-2.5 rounded-md p-2 transition-colors ${
                    e.id === selectedId ? "bg-primary/10" : "hover:bg-muted"
                  }`}
                >
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
                    {e.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{e.name}</p>
                    <p className="text-[11px] text-muted-foreground truncate">{e.department} · {e.id}</p>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Profile */}
        <div className="space-y-4">
          <Card className="border-border/60 overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-primary to-primary/70" />
            <CardContent className="p-6 pt-0">
              <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-10">
                <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-card text-primary text-xl font-bold ring-4 ring-card shadow-md">
                  {emp.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <div className="min-w-0 flex-1 sm:pb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-xl font-bold truncate">{emp.name}</h2>
                    <StatusBadge status={emp.status} />
                  </div>
                  <p className="text-sm text-muted-foreground">{emp.designation} · {emp.department}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button size="sm">Message</Button>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t">
                <Info icon={Briefcase} label="Employee ID" value={emp.id} />
                <Info icon={MapPin} label="Zone · Ward" value={`${emp.zone} · ${emp.ward}`} />
                <Info icon={Mail} label="Email" value={emp.email} />
                <Info icon={Phone} label="Phone" value={emp.phone} />
                <Info icon={Calendar} label="Date of Joining" value={emp.joinDate} />
                <Info icon={Award} label="Years of Service" value={`${new Date().getFullYear() - new Date(emp.joinDate).getFullYear()} yrs`} />
                <Info icon={FileText} label="Cadre" value="Group B (Non-Gazetted)" />
                <Info icon={Briefcase} label="Reporting To" value="Vikram Singh" />
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="leave">Leave</TabsTrigger>
              <TabsTrigger value="payroll">Payroll</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-border/60">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <CalendarCheck className="h-4 w-4 text-success" />
                      <CardTitle className="text-sm">Attendance Rate</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">96.4%</p>
                    <p className="text-xs text-muted-foreground mt-1">Last 90 days</p>
                  </CardContent>
                </Card>
                <Card className="border-border/60">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Wallet className="h-4 w-4 text-primary" />
                      <CardTitle className="text-sm">Current CTC</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">₹8.4L</p>
                    <p className="text-xs text-muted-foreground mt-1">per annum</p>
                  </CardContent>
                </Card>
                <Card className="border-border/60">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <ArrowLeftRight className="h-4 w-4 text-info" />
                      <CardTitle className="text-sm">Transfers</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">2</p>
                    <p className="text-xs text-muted-foreground mt-1">in career</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-border/60 mt-4">
                <CardHeader>
                  <CardTitle className="text-base">Career Timeline</CardTitle>
                  <CardDescription>Service history at MCD</CardDescription>
                </CardHeader>
                <CardContent>
                  <ol className="relative border-l-2 border-border ml-2 space-y-5">
                    {[
                      { date: "Jan 2024", title: "Promoted to " + emp.designation, sub: emp.department + " · " + emp.zone },
                      { date: "Aug 2021", title: "Inter-zone transfer", sub: "Moved to " + emp.zone + " from Central" },
                      { date: "Mar 2019", title: "Confirmed in service", sub: "End of probation" },
                      { date: emp.joinDate, title: "Joined MCD", sub: "Inducted as Trainee Officer" },
                    ].map((e, i) => (
                      <li key={i} className="ml-5 pl-1">
                        <span className="absolute -left-[7px] grid h-3 w-3 place-items-center rounded-full bg-primary ring-4 ring-background" />
                        <p className="text-xs text-muted-foreground">{e.date}</p>
                        <p className="text-sm font-medium">{e.title}</p>
                        <p className="text-xs text-muted-foreground">{e.sub}</p>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </TabsContent>
            {["attendance", "leave", "payroll", "documents"].map((t) => (
              <TabsContent key={t} value={t} className="mt-4">
                <Card className="border-border/60">
                  <CardContent className="p-10 text-center text-sm text-muted-foreground capitalize">{t} records will appear here</CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
}

function Info({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2.5 min-w-0">
      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-muted text-muted-foreground">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] text-muted-foreground uppercase tracking-wider">{label}</p>
        <p className="text-sm font-medium truncate">{value}</p>
      </div>
    </div>
  );
}
