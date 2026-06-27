import { useMemo, useState } from "react";
import { AlertTriangle, Building2, CalendarCheck, ChevronLeft, MapPin, MessageSquareWarning, TrendingDown, TrendingUp, UserX, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DELHI_CITY_SUMMARY, DELHI_DEPARTMENTS, DELHI_ZONE_DATA, getZoneMetric, type Department } from "@/lib/delhi-workforce-data";

function StatCard({ icon: Icon, label, value, sub, accent }: { icon: typeof Users; label: string; value: string; sub?: string; accent: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-3.5 shadow-sm">
      <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
        <span className={`rounded-md p-1 ${accent}`}>
          <Icon className="h-3.5 w-3.5" />
        </span>
        {label}
      </div>
      <div className="text-2xl font-semibold tracking-tight text-foreground">{value}</div>
      {sub && <div className="mt-1 text-xs text-muted-foreground">{sub}</div>}
    </div>
  );
}

function Bar({ value, max, color }: { value: number; max: number; color: string }) {
  const percent = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-muted">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${percent}%` }} />
    </div>
  );
}

export function DelhiWorkforcePanel() {
  const [selectedZoneId, setSelectedZoneId] = useState<string | null>(null);
  const [selectedWardId, setSelectedWardId] = useState<string | null>(null);
  const [department, setDepartment] = useState<Department | "all">("all");

  const zone = useMemo(() => getZoneMetric(selectedZoneId ?? "") ?? null, [selectedZoneId]);
  const ward = useMemo(() => zone?.wards.find((item) => item.id === selectedWardId) ?? null, [zone, selectedWardId]);

  const filteredZone = useMemo(() => {
    if (!selectedZoneId) return null;
    return DELHI_ZONE_DATA.find((item) => item.id === selectedZoneId) ?? null;
  }, [selectedZoneId]);

  const wardRows = useMemo(() => {
    if (!zone) return [];
    return [...zone.wards]
      .map((wardItem) => ({ wardItem, metric: wardItem }))
      .sort((a, b) => b.metric.attendancePct - a.metric.attendancePct);
  }, [zone]);

  const maxWardEmployees = Math.max(...wardRows.map((row) => row.metric.employees), 1);

  const deptRows = useMemo(() => {
    if (!zone) return [];
    return [...DELHI_DEPARTMENTS]
      .map((dept) => ({ dept, metric: zone.wards.reduce((acc, wardItem) => ({
        employees: acc.employees + wardItem.byDept[dept].employees,
        attendancePct: acc.attendancePct + wardItem.byDept[dept].attendancePct,
        vacancies: acc.vacancies + wardItem.byDept[dept].vacancies,
        grievances: acc.grievances + wardItem.byDept[dept].grievances,
      }), { employees: 0, attendancePct: 0, vacancies: 0, grievances: 0 }) }))
      .filter((row) => row.metric.employees > 0)
      .sort((a, b) => b.metric.employees - a.metric.employees)
      .map((row) => ({
        ...row,
        metric: {
          ...row.metric,
          attendancePct: row.metric.employees ? Math.round(row.metric.attendancePct / row.metric.employees) : 0,
        },
      }));
  }, [zone]);

  const maxDeptEmployees = Math.max(...deptRows.map((row) => row.metric.employees), 1);

  const cityDelta = zone ? zone.attendancePct - DELHI_CITY_SUMMARY.attendancePct : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h3 className="text-lg font-semibold">Delhi Workforce Intelligence</h3>
          <p className="text-sm text-muted-foreground">Interactive zone and ward level coverage, attendance, vacancies and grievance pressure.</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={department} onValueChange={(value) => setDepartment(value as Department | "all")}>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Filter department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All departments</SelectItem>
              {DELHI_DEPARTMENTS.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="border-border/60">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base">Operational snapshot</CardTitle>
          </div>
          {selectedZoneId && (
            <Button variant="outline" size="sm" onClick={() => { setSelectedZoneId(null); setSelectedWardId(null); }}>
              <ChevronLeft className="mr-1 h-4 w-4" /> Reset
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <StatCard icon={Users} label="Employees" value={DELHI_CITY_SUMMARY.employees.toLocaleString("en-IN")} sub="Across Delhi zones" accent="bg-primary/15 text-primary" />
            <StatCard icon={CalendarCheck} label="Attendance" value={`${DELHI_CITY_SUMMARY.attendancePct}%`} sub="City-wide today" accent="bg-success/15 text-success" />
            <StatCard icon={UserX} label="Vacancies" value={DELHI_CITY_SUMMARY.vacancies.toLocaleString("en-IN")} sub={`${Math.round((DELHI_CITY_SUMMARY.vacancies / DELHI_CITY_SUMMARY.sanctioned) * 100)}% of sanctioned`} accent="bg-warning/15 text-warning" />
            <StatCard icon={MessageSquareWarning} label="Grievances" value={DELHI_CITY_SUMMARY.pendingGrievances.toString()} sub="Open cases" accent="bg-destructive/15 text-destructive" />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="text-base">{selectedZoneId ? (selectedWardId ? `Ward ${ward?.number ?? ""}` : zone?.name ?? "Zone") : "Delhi zones"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!selectedZoneId && (
              <div className="space-y-2">
                {DELHI_ZONE_DATA.map((zoneItem) => (
                  <button key={zoneItem.id} type="button" onClick={() => { setSelectedZoneId(zoneItem.id); setSelectedWardId(null); }} className="flex w-full items-center justify-between rounded-lg border border-border bg-background p-3 text-left transition-colors hover:border-primary/40 hover:bg-primary/[0.04]">
                    <div>
                      <p className="font-medium">{zoneItem.name}</p>
                      <p className="text-xs text-muted-foreground">{zoneItem.code} · {zoneItem.wards.length} wards</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{zoneItem.attendancePct}%</p>
                      <p className="text-xs text-muted-foreground">{zoneItem.employees.toLocaleString("en-IN")} staff</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {selectedZoneId && !selectedWardId && filteredZone && (
              <div className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <StatCard icon={Users} label="Employees" value={filteredZone.employees.toLocaleString("en-IN")} sub={`Sanctioned: ${filteredZone.sanctioned.toLocaleString("en-IN")}`} accent="bg-primary/15 text-primary" />
                  <StatCard icon={CalendarCheck} label="Attendance" value={`${filteredZone.attendancePct}%`} sub={cityDelta >= 0 ? `+${cityDelta} vs city` : `${cityDelta} vs city`} accent="bg-success/15 text-success" />
                  <StatCard icon={UserX} label="Vacancies" value={filteredZone.vacancies.toLocaleString("en-IN")} sub={`${Math.round((filteredZone.vacancies / filteredZone.sanctioned) * 100)}% of sanctioned`} accent="bg-warning/15 text-warning" />
                  <StatCard icon={MessageSquareWarning} label="Grievances" value={filteredZone.pendingGrievances.toString()} sub="Pending resolution" accent="bg-destructive/15 text-destructive" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Building2 className="h-4 w-4 text-primary" /> Department breakdown
                  </div>
                  {deptRows.map((row) => (
                    <div key={row.dept} className="rounded-lg border border-border bg-background p-3">
                      <div className="mb-1.5 flex items-center justify-between text-sm">
                        <span>{row.dept}</span>
                        <span className="text-muted-foreground">{row.metric.employees} · {row.metric.attendancePct}%</span>
                      </div>
                      <Bar value={row.metric.employees} max={maxDeptEmployees} color="bg-primary" />
                      <div className="mt-1.5 flex justify-between text-[11px] text-muted-foreground">
                        <span>{row.metric.vacancies} vacancies</span>
                        <span>{row.metric.grievances} grievances</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <MapPin className="h-4 w-4 text-primary" /> Wards
                  </div>
                  {wardRows.map((row) => {
                    const shouldDim = department !== "all" && row.wardItem.byDept[department].employees === 0;
                    return (
                      <button key={row.wardItem.id} type="button" onClick={() => setSelectedWardId(row.wardItem.id)} className={`flex w-full items-center justify-between rounded-lg border p-3 text-left transition-colors ${shouldDim ? "border-border/40 bg-muted/40 opacity-55" : "border-border bg-background hover:border-primary/40 hover:bg-primary/[0.04]"}`}>
                        <div>
                          <p className="font-medium">W{row.wardItem.number} · {row.wardItem.name}</p>
                          <p className="text-xs text-muted-foreground">{row.wardItem.employees} staff</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold">{row.wardItem.attendancePct}%</p>
                          <p className="text-xs text-muted-foreground">{row.wardItem.vacancies} vac · {row.wardItem.pendingGrievances} griev</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {selectedZoneId && selectedWardId && ward && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">{ward.name}</p>
                    <p className="text-xs text-muted-foreground">{zone?.name}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setSelectedWardId(null)}>
                    <ChevronLeft className="mr-1 h-4 w-4" /> Back
                  </Button>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <StatCard icon={Users} label="Employees" value={ward.employees.toLocaleString("en-IN")} sub="Ward staff" accent="bg-primary/15 text-primary" />
                  <StatCard icon={CalendarCheck} label="Attendance" value={`${ward.attendancePct}%`} sub="Current coverage" accent="bg-success/15 text-success" />
                  <StatCard icon={UserX} label="Vacancies" value={ward.vacancies.toLocaleString("en-IN")} sub="Open posts" accent="bg-warning/15 text-warning" />
                  <StatCard icon={MessageSquareWarning} label="Grievances" value={ward.pendingGrievances.toString()} sub="Open cases" accent="bg-destructive/15 text-destructive" />
                </div>

                <div className="rounded-lg border border-border bg-background p-3">
                  <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                    <Building2 className="h-4 w-4 text-primary" /> Department mix
                  </div>
                  <div className="space-y-2">
                    {Object.entries(ward.byDept).map(([dept, value]) => (
                      <div key={dept}>
                        <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                          <span>{dept}</span>
                          <span>{value.employees} staff · {value.attendancePct}%</span>
                        </div>
                        <Bar value={value.employees} max={Math.max(ward.employees, 1)} color="bg-primary" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="text-base">How to use</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div className="rounded-lg border border-border bg-background p-3">
              <div className="mb-2 flex items-center gap-2 font-medium text-foreground">
                <TrendingUp className="h-4 w-4 text-success" /> Drill into zones
              </div>
              <p>Click any zone to inspect its ward-level attendance, vacancy and grievance distribution.</p>
            </div>
            <div className="rounded-lg border border-border bg-background p-3">
              <div className="mb-2 flex items-center gap-2 font-medium text-foreground">
                <TrendingDown className="h-4 w-4 text-warning" /> Filter by department
              </div>
              <p>Use the selector to focus on a service department such as sanitation or engineering.</p>
            </div>
            <div className="rounded-lg border border-border bg-background p-3">
              <div className="mb-2 flex items-center gap-2 font-medium text-foreground">
                <AlertTriangle className="h-4 w-4 text-destructive" /> Escalation cues
              </div>
              <p>Use the live metrics to spot areas with low attendance or high grievance pressure.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
