import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Building2, CalendarDays, Download, Landmark, Search, TrendingUp, Wallet } from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/widgets/page-header";
import { StatCard } from "@/components/widgets/stat-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Line,
  LineChart,
  Pie,
  PieChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const financialYears = ["FY 2026-27", "FY 2025-26", "FY 2024-25"];

const monthlyPayrollTrend = [
  { month: "Apr", gross: 142000000, net: 118500000 },
  { month: "May", gross: 145000000, net: 121000000 },
  { month: "Jun", gross: 148000000, net: 123400000 },
  { month: "Jul", gross: 151000000, net: 126200000 },
  { month: "Aug", gross: 154000000, net: 128700000 },
  { month: "Sep", gross: 157000000, net: 131000000 },
  { month: "Oct", gross: 160000000, net: 133300000 },
];

const departmentExpenditure = [
  { department: "Administration", budget: 26.4, utilized: 21.8 },
  { department: "Public Health", budget: 34.8, utilized: 29.6 },
  { department: "Sanitation", budget: 43.2, utilized: 36.4 },
  { department: "Engineering", budget: 38.7, utilized: 31.2 },
  { department: "Education", budget: 24.9, utilized: 18.5 },
  { department: "Horticulture", budget: 18.1, utilized: 13.7 },
];

const zoneDistribution = [
  { name: "Central", value: 29 },
  { name: "North", value: 18 },
  { name: "South", value: 16 },
  { name: "East", value: 14 },
  { name: "West", value: 13 },
  { name: "Najafgarh", value: 10 },
];

const payrollGrowth = [
  { month: "Jan", growth: 7.8 },
  { month: "Feb", growth: 8.4 },
  { month: "Mar", growth: 9.1 },
  { month: "Apr", growth: 9.8 },
  { month: "May", growth: 10.6 },
  { month: "Jun", growth: 11.4 },
];

const departmentBudgetSummary = [
  { department: "Administration", employees: 842, monthlyBudget: 14800000, budgetUtilized: 12600000, remainingBudget: 2200000, averageSalary: 48250, health: 82, status: "Healthy", zones: ["Central", "North"] },
  { department: "Public Health", employees: 1324, monthlyBudget: 21400000, budgetUtilized: 18600000, remainingBudget: 2800000, averageSalary: 51800, health: 87, status: "Healthy", zones: ["South", "East", "West"] },
  { department: "Sanitation", employees: 1860, monthlyBudget: 22900000, budgetUtilized: 19800000, remainingBudget: 3100000, averageSalary: 46750, health: 86, status: "Healthy", zones: ["Central", "Najafgarh", "South"] },
  { department: "Engineering", employees: 1046, monthlyBudget: 19200000, budgetUtilized: 17400000, remainingBudget: 1800000, averageSalary: 57300, health: 91, status: "Healthy", zones: ["North", "East", "West"] },
  { department: "Education", employees: 921, monthlyBudget: 16800000, budgetUtilized: 15400000, remainingBudget: 1400000, averageSalary: 49800, health: 92, status: "Healthy", zones: ["Central", "East"] },
  { department: "Horticulture", employees: 612, monthlyBudget: 11200000, budgetUtilized: 10400000, remainingBudget: 800000, averageSalary: 43100, health: 93, status: "Healthy", zones: ["North", "West"] },
  { department: "Revenue", employees: 715, monthlyBudget: 9800000, budgetUtilized: 8600000, remainingBudget: 1200000, averageSalary: 44250, health: 88, status: "Watch", zones: ["South", "Central"] },
];

const zoneCards = [
  { zone: "Central", employees: 1842, monthlyBudget: 18200000, utilization: 83, remainingBudget: 3100000 },
  { zone: "North", employees: 1528, monthlyBudget: 16800000, utilization: 79, remainingBudget: 3520000 },
  { zone: "South", employees: 1464, monthlyBudget: 16100000, utilization: 81, remainingBudget: 3060000 },
  { zone: "East", employees: 1321, monthlyBudget: 14800000, utilization: 77, remainingBudget: 3400000 },
  { zone: "West", employees: 1288, monthlyBudget: 15600000, utilization: 85, remainingBudget: 2330000 },
  { zone: "Najafgarh", employees: 977, monthlyBudget: 11900000, utilization: 74, remainingBudget: 3090000 },
];

const chartConfig = {
  gross: { label: "Gross Payroll", color: "hsl(var(--chart-1))" },
  net: { label: "Net Payroll", color: "hsl(var(--chart-2))" },
  budget: { label: "Budget", color: "hsl(var(--chart-3))" },
  utilized: { label: "Utilized", color: "hsl(var(--chart-4))" },
  utilization: { label: "Utilization", color: "hsl(var(--chart-5))" },
  growth: { label: "YoY Growth", color: "hsl(var(--chart-6))" },
} satisfies ChartConfig;

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatCompactCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function getStatusTone(status: string) {
  if (status === "Healthy") return "success";
  if (status === "Watch") return "warning";
  return "destructive";
}

export const Route = createFileRoute("/budget-analytics")({
  head: () => ({ meta: [{ title: "Budget & Expenditure Analytics — Nagar Setu HRMS" }] }),
  component: BudgetAnalyticsPage,
});

function BudgetAnalyticsPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <BudgetAnalyticsContent />
    </ProtectedRoute>
  );
}

function BudgetAnalyticsContent() {
  const [financialYear, setFinancialYear] = useState("FY 2026-27");
  const [departmentFilter, setDepartmentFilter] = useState("All Departments");
  const [zoneFilter, setZoneFilter] = useState("All Zones");
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("2026-04-01");
  const [endDate, setEndDate] = useState("2026-06-30");

  const filteredDepartmentRows = useMemo(() => {
    return departmentBudgetSummary.filter((item) => {
      const matchesDepartment = departmentFilter === "All Departments" || item.department === departmentFilter;
      const matchesZone = zoneFilter === "All Zones" || item.zones.includes(zoneFilter);
      const matchesSearch = search.trim().length === 0 || item.department.toLowerCase().includes(search.toLowerCase());
      return matchesDepartment && matchesZone && matchesSearch;
    });
  }, [departmentFilter, search, zoneFilter]);

  const filteredZoneCards = useMemo(() => {
    return zoneCards.filter((item) => (zoneFilter === "All Zones" || item.zone === zoneFilter));
  }, [zoneFilter]);

  const totals = useMemo(() => {
    const totalAllocated = filteredDepartmentRows.reduce((sum, item) => sum + item.monthlyBudget, 0);
    const totalUtilized = filteredDepartmentRows.reduce((sum, item) => sum + item.budgetUtilized, 0);
    const remainingBudget = totalAllocated - totalUtilized;
    const utilizationPct = totalAllocated > 0 ? Math.round((totalUtilized / totalAllocated) * 100) : 0;
    const averageMonthlyPayroll = filteredDepartmentRows.reduce((sum, item) => sum + item.monthlyBudget, 0) / Math.max(filteredDepartmentRows.length, 1);
    return {
      totalAllocated,
      totalUtilized,
      remainingBudget,
      utilizationPct,
      averageMonthlyPayroll,
    };
  }, [filteredDepartmentRows]);

  return (
    <DashboardLayout>
      <PageHeader
        title="Budget & Expenditure Analytics"
        description="Financial insights into payroll allocation and workforce expenditure"
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Select value={financialYear} onValueChange={setFinancialYear}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Financial year" />
              </SelectTrigger>
              <SelectContent>
                {financialYears.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" /> Export Report
            </Button>
          </div>
        }
      />

      <Card className="mb-6 border-border/60">
        <CardContent className="p-4 sm:p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div className="flex flex-1 flex-col gap-3 md:flex-row md:flex-wrap">
              <div className="relative min-w-[220px] flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search department" className="pl-9" />
              </div>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="min-w-[180px]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Departments">All Departments</SelectItem>
                  {departmentBudgetSummary.map((item) => (
                    <SelectItem key={item.department} value={item.department}>
                      {item.department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={zoneFilter} onValueChange={setZoneFilter}>
                <SelectTrigger className="min-w-[160px]">
                  <SelectValue placeholder="Zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Zones">All Zones</SelectItem>
                  {zoneCards.map((item) => (
                    <SelectItem key={item.zone} value={item.zone}>
                      {item.zone}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2 rounded-md border border-border/60 bg-background px-3 py-2 text-sm">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} className="bg-transparent text-sm outline-none" />
                <span className="text-muted-foreground">to</span>
                <input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} className="bg-transparent text-sm outline-none" />
              </div>
            </div>
            <Button variant="outline" className="gap-2 self-start xl:self-auto">
              <Download className="h-4 w-4" /> Export
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <StatCard label="Total Budget Allocated" value={formatCurrency(totals.totalAllocated)} hint="Monthly baseline" icon={Wallet} tone="primary" />
        <StatCard label="Total Budget Utilized" value={formatCurrency(totals.totalUtilized)} hint="Against approved budget" icon={TrendingUp} tone="success" />
        <StatCard label="Budget Utilization %" value={`${totals.utilizationPct}%`} delta="+3.2%" trend="up" hint="vs last quarter" icon={ArrowUpRight} tone="info" />
        <StatCard label="Average Monthly Payroll" value={formatCurrency(totals.averageMonthlyPayroll)} hint="Across selected departments" icon={Landmark} tone="warning" />
        <StatCard label="Remaining Budget" value={formatCurrency(totals.remainingBudget)} delta="-1.4%" trend="down" hint="carry-forward reserve" icon={ArrowDownRight} tone="destructive" />
        <StatCard label="Budget Growth YoY" value="+11.8%" hint="Fiscal year over year" icon={Building2} tone="success" />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card className="border-border/60">
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div>
              <CardTitle className="text-base">Monthly Payroll Trend</CardTitle>
              <CardDescription>Gross vs net outflow for the current fiscal cycle</CardDescription>
            </div>
            <Badge variant="secondary">Interactive</Badge>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[280px] w-full">
              <AreaChart data={monthlyPayrollTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value / 1000000}M`} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Area type="monotone" dataKey="gross" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1) / 0.18)" strokeWidth={2.5} />
                <Area type="monotone" dataKey="net" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2) / 0.16)" strokeWidth={2.5} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="text-base">Department-wise Expenditure</CardTitle>
            <CardDescription>Approved allocation vs actual disbursement</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[280px] w-full">
              <BarChart data={departmentExpenditure}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="department" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `${value}Cr`} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="budget" fill="hsl(var(--chart-3))" radius={[6, 6, 0, 0]} />
                <Bar dataKey="utilized" fill="hsl(var(--chart-4))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="text-base">Zone-wise Budget Distribution</CardTitle>
            <CardDescription>Share of the total monthly allocation</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[320px] w-full">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Pie data={zoneDistribution} dataKey="value" nameKey="name" innerRadius="55%" outerRadius="85%" paddingAngle={2}>
                  {zoneDistribution.map((entry, index) => (
                    <Cell key={`${entry.name}-${index}`} fill={["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))", "hsl(var(--chart-6))"][index % 6]} />
                  ))}
                  <LabelList dataKey="value" position="inside" formatter={(value: number) => `${value}%`} className="fill-background text-[10px] font-semibold" />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-base">Budget Utilization Gauge</CardTitle>
              <CardDescription>Current fiscal utilization rate</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center gap-4">
              <div className="h-[220px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" startAngle={180} endAngle={0} data={[{ name: "Utilization", value: totals.utilizationPct, fill: "hsl(var(--chart-1))" }]}>
                    <RadialBar background clockWise dataKey="value" cornerRadius={999} />
                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-foreground text-3xl font-semibold">
                      {totals.utilizationPct}%
                    </text>
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex w-full items-center justify-between rounded-lg border border-border/60 bg-muted/20 px-3 py-2 text-sm">
                <span className="text-muted-foreground">Remaining headroom</span>
                <span className="font-medium text-foreground">{Math.max(100 - totals.utilizationPct, 0)}%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-base">Payroll Growth Trend</CardTitle>
              <CardDescription>Year-on-year rise in wage outgo</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[220px] w-full">
                <LineChart data={payrollGrowth}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Line type="monotone" dataKey="growth" stroke="hsl(var(--chart-6))" strokeWidth={2.5} dot={{ r: 4 }} />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="mb-6 border-border/60">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="text-base">Department Budget Summary</CardTitle>
            <CardDescription>Operating budget health across departments</CardDescription>
          </div>
          <Badge variant="secondary">{filteredDepartmentRows.length} departments</Badge>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Department</TableHead>
                <TableHead className="hidden md:table-cell">Employees</TableHead>
                <TableHead className="text-right">Monthly Budget</TableHead>
                <TableHead className="text-right">Budget Utilized</TableHead>
                <TableHead className="text-right">Remaining Budget</TableHead>
                <TableHead className="hidden lg:table-cell">Average Salary</TableHead>
                <TableHead className="hidden lg:table-cell">Budget Health</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDepartmentRows.map((row) => (
                <TableRow key={row.department}>
                  <TableCell>
                    <div className="font-medium text-foreground">{row.department}</div>
                    <div className="text-xs text-muted-foreground">{row.zones.join(" • ")}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{row.employees.toLocaleString("en-IN")}</TableCell>
                  <TableCell className="text-right font-mono">{formatCurrency(row.monthlyBudget)}</TableCell>
                  <TableCell className="text-right font-mono">{formatCurrency(row.budgetUtilized)}</TableCell>
                  <TableCell className="text-right font-mono">{formatCurrency(row.remainingBudget)}</TableCell>
                  <TableCell className="hidden lg:table-cell font-mono">{formatCurrency(row.averageSalary)}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{row.health}%</span>
                        <span>{row.health >= 90 ? "Stable" : row.health >= 85 ? "Watch" : "At risk"}</span>
                      </div>
                      <Progress value={row.health} className="h-1.5" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusTone(row.status) === "success" ? "default" : getStatusTone(row.status) === "warning" ? "secondary" : "destructive"}>{row.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
        {filteredZoneCards.map((zone) => (
          <Card key={zone.zone} className="border-border/60">
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div>
                <CardTitle className="text-base">{zone.zone}</CardTitle>
                <CardDescription>MCD zone budget outlook</CardDescription>
              </div>
              <div className="rounded-full bg-primary/10 p-2 text-primary">
                <Landmark className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-border/60 bg-muted/20 p-3">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Employees</p>
                  <p className="mt-1 text-lg font-semibold text-foreground">{zone.employees.toLocaleString("en-IN")}</p>
                </div>
                <div className="rounded-lg border border-border/60 bg-muted/20 p-3">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Monthly Budget</p>
                  <p className="mt-1 text-lg font-semibold text-foreground">{formatCurrency(zone.monthlyBudget)}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Utilization</span>
                  <span className="font-semibold text-foreground">{zone.utilization}%</span>
                </div>
                <Progress value={zone.utilization} className="h-2" />
              </div>
              <div className="rounded-lg border border-border/60 bg-background px-3 py-2 text-sm text-muted-foreground">
                Remaining Budget: <span className="ml-1 font-semibold text-foreground">{formatCurrency(zone.remainingBudget)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
