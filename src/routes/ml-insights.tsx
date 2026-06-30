import { createFileRoute } from "@tanstack/react-router";
import { BrainCircuit, Download, Sparkles, TrendingUp, ShieldAlert, Users, CalendarClock, ArrowUpRight, ArrowDownRight, BadgeCheck, AlertTriangle } from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/widgets/page-header";
import { StatCard } from "@/components/widgets/stat-card";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

const chartConfig = {
  attendance: { label: "Attendance Forecast", color: "hsl(var(--chart-1))" },
  performance: { label: "Performance Forecast", color: "hsl(var(--chart-2))" },
  leave: { label: "Leave Forecast", color: "hsl(var(--chart-3))" },
  attrition: { label: "Attrition Trend", color: "hsl(var(--chart-4))" },
} satisfies ChartConfig;

const topPerformers = [
  {
    name: "Amit Sharma",
    department: "Engineering",
    performanceScore: 94,
    attendance: 96,
    experience: "9 years",
    achievements: ["Managed 3 zonal projects", "Zero SLA misses"],
    aiScore: 96,
    risk: "Stable",
  },
  {
    name: "Priya Nair",
    department: "Public Health",
    performanceScore: 91,
    attendance: 94,
    experience: "7 years",
    achievements: ["Improved vaccination coverage", "Mentored 12 field staff"],
    aiScore: 93,
    risk: "Monitor",
  },
  {
    name: "Ravi Mehra",
    department: "Sanitation",
    performanceScore: 89,
    attendance: 92,
    experience: "6 years",
    achievements: ["Reduced response lag", "Excellent ward audits"],
    aiScore: 90,
    risk: "Stable",
  },
];

const highRiskEmployees = [
  {
    name: "Sanjay Verma",
    burnout: 82,
    attrition: 74,
    decline: 31,
    attendance: 68,
    action: "Provide wellness intervention",
    confidence: 91,
  },
  {
    name: "Neha Gupta",
    burnout: 77,
    attrition: 69,
    decline: 27,
    attendance: 71,
    action: "Review workload distribution",
    confidence: 88,
  },
  {
    name: "Kavita Joshi",
    burnout: 73,
    attrition: 66,
    decline: 24,
    attendance: 65,
    action: "Schedule coaching and support",
    confidence: 85,
  },
];

const attendancePrediction = [
  { month: "Apr", value: 88 },
  { month: "May", value: 87 },
  { month: "Jun", value: 89 },
  { month: "Jul", value: 86 },
  { month: "Aug", value: 90 },
  { month: "Sep", value: 91 },
];

const performancePrediction = [
  { month: "Apr", value: 78 },
  { month: "May", value: 80 },
  { month: "Jun", value: 81 },
  { month: "Jul", value: 83 },
  { month: "Aug", value: 85 },
  { month: "Sep", value: 87 },
];

const leaveForecast = [
  { month: "Apr", value: 142 },
  { month: "May", value: 151 },
  { month: "Jun", value: 138 },
  { month: "Jul", value: 164 },
  { month: "Aug", value: 158 },
  { month: "Sep", value: 171 },
];

const attritionTrend = [
  { month: "Apr", value: 6.2 },
  { month: "May", value: 6.8 },
  { month: "Jun", value: 7.1 },
  { month: "Jul", value: 6.4 },
  { month: "Aug", value: 7.5 },
  { month: "Sep", value: 7.8 },
];

const departmentIntelligence = [
  { department: "Engineering", score: 92, attrition: 5.2, attendance: 94, productivity: 96, status: "Highest Performing" },
  { department: "Public Health", score: 87, attrition: 8.6, attendance: 90, productivity: 88, status: "Highest Attendance" },
  { department: "Sanitation", score: 84, attrition: 9.1, attendance: 86, productivity: 84, status: "Highest Attrition" },
  { department: "Education", score: 81, attrition: 7.4, attendance: 89, productivity: 83, status: "Bottom Performing" },
];

const attendanceHeatmap = [
  { zone: "Central", values: [94, 91, 89, 95, 92] },
  { zone: "North", values: [88, 86, 85, 90, 87] },
  { zone: "South", values: [82, 79, 81, 84, 80] },
  { zone: "East", values: [90, 88, 87, 91, 89] },
];

const riskHeatmap = [
  { zone: "Central", values: [18, 22, 24, 19, 21] },
  { zone: "North", values: [24, 29, 31, 25, 27] },
  { zone: "South", values: [36, 39, 41, 37, 40] },
  { zone: "East", values: [20, 23, 26, 21, 24] },
];

const performanceHeatmap = [
  { zone: "Central", values: [91, 88, 90, 92, 89] },
  { zone: "North", values: [85, 82, 84, 86, 83] },
  { zone: "South", values: [79, 76, 78, 80, 77] },
  { zone: "East", values: [87, 84, 86, 88, 85] },
];

function toneForRisk(status: string) {
  if (status === "Stable") return "success";
  if (status === "Monitor") return "warning";
  return "destructive";
}

function heatmapClass(value: number, palette: "attendance" | "risk" | "performance") {
  if (palette === "risk") {
    if (value >= 35) return "bg-destructive/90 text-destructive-foreground";
    if (value >= 25) return "bg-warning/80 text-warning-foreground";
    return "bg-success/20 text-success";
  }

  if (palette === "performance") {
    if (value >= 88) return "bg-success/20 text-success";
    if (value >= 82) return "bg-primary/20 text-primary";
    return "bg-warning/20 text-warning-foreground";
  }

  if (value >= 92) return "bg-success/20 text-success";
  if (value >= 86) return "bg-primary/20 text-primary";
  return "bg-warning/20 text-warning-foreground";
}

export const Route = createFileRoute("/ml-insights")({
  head: () => ({ meta: [{ title: "AI Workforce Intelligence — Nagar Setu HRMS" }] }),
  component: MLInsightsPage,
});

function MLInsightsPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <MLInsightsContent />
    </ProtectedRoute>
  );
}

function MLInsightsContent() {
  return (
    <DashboardLayout>
      <PageHeader
        title="AI Workforce Intelligence"
        description="AI-powered workforce insights, performance trends and operational risk analysis."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Sparkles className="h-4 w-4" /> Run AI Analysis
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" /> Export Insights
            </Button>
          </div>
        }
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <StatCard label="Overall Workforce Score" value="89/100" delta="+4.2" trend="up" hint="vs last month" icon={BrainCircuit} tone="primary" />
        <StatCard label="High Risk Employees" value="24" delta="-3" trend="down" hint="needs attention" icon={ShieldAlert} tone="destructive" />
        <StatCard label="Top Performers" value="118" hint="qualified for recognition" icon={BadgeCheck} tone="success" />
        <StatCard label="Attrition Risk" value="7.8%" delta="+0.6" trend="up" hint="forecast" icon={TrendingUp} tone="warning" />
        <StatCard label="Attendance Health" value="91%" hint="predicted compliance" icon={CalendarClock} tone="info" />
        <StatCard label="Prediction Confidence" value="94%" hint="model certainty" icon={Sparkles} tone="primary" />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="text-base">Top Performers</CardTitle>
            <CardDescription>AI-ranked employees with strongest operational impact</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topPerformers.map((person) => (
              <div key={person.name} className="rounded-xl border border-border/60 bg-muted/20 p-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="flex items-start gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {person.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{person.name}</p>
                      <p className="text-sm text-muted-foreground">{person.department}</p>
                      <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                        <span>Performance {person.performanceScore}</span>
                        <span>Attendance {person.attendance}%</span>
                        <span>Exp. {person.experience}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">AI Score {person.aiScore}</Badge>
                    <Badge variant={toneForRisk(person.risk) === "success" ? "default" : toneForRisk(person.risk) === "warning" ? "secondary" : "destructive"}>{person.risk}</Badge>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {person.achievements.map((achievement) => (
                    <span key={achievement} className="rounded-full border border-border/60 bg-background px-2.5 py-1 text-xs text-muted-foreground">{achievement}</span>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="text-base">High Risk Employees</CardTitle>
            <CardDescription>Individuals with elevated burnout and retention signals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {highRiskEmployees.map((person) => (
              <div key={person.name} className="rounded-xl border border-border/60 bg-muted/20 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-foreground">{person.name}</p>
                  <Badge variant="destructive">High risk</Badge>
                </div>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Burnout Risk</span>
                    <span className="font-medium text-foreground">{person.burnout}%</span>
                  </div>
                  <Progress value={person.burnout} className="h-1.5" />
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Attrition Risk</span>
                    <span className="font-medium text-foreground">{person.attrition}%</span>
                  </div>
                  <Progress value={person.attrition} className="h-1.5" />
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Performance Decline</span>
                    <span className="font-medium text-foreground">{person.decline}%</span>
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Low Attendance</span>
                    <span className="font-medium text-foreground">{person.attendance}%</span>
                  </div>
                </div>
                <div className="mt-3 rounded-lg border border-border/60 bg-background px-3 py-2 text-sm">
                  <p className="font-medium text-foreground">Suggested Action</p>
                  <p className="mt-1 text-muted-foreground">{person.action}</p>
                  <p className="mt-2 text-xs text-muted-foreground">Prediction Confidence {person.confidence}%</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="text-base">ML Recommendation</CardTitle>
            <CardDescription>Simulated model suggestions for operational planning</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-xl border border-border/60 bg-primary/5 p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-2 text-primary">
                  <BrainCircuit className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Increase staffing in South Zone</p>
                  <p className="mt-1 text-sm text-muted-foreground">The model forecasts a 14% workload spike in the next quarter driven by attendance volatility and field service demand.</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
              <p className="font-semibold text-foreground">Monitor Engineering Department</p>
              <p className="mt-1 text-sm text-muted-foreground">Performance is high, but attrition signals are rising and overtime risk is increasing.</p>
            </div>
            <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
              <p className="font-semibold text-foreground">Review attendance policy</p>
              <p className="mt-1 text-sm text-muted-foreground">Field staff attendance remains below expected thresholds in three zones and may require targeted follow-up.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="text-base">Department Intelligence</CardTitle>
            <CardDescription>AI-driven departmental ranking and risk review</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {departmentIntelligence.map((item) => (
              <div key={item.department} className="rounded-xl border border-border/60 bg-muted/20 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-foreground">{item.department}</p>
                    <p className="text-sm text-muted-foreground">{item.status}</p>
                  </div>
                  <Badge variant="secondary">Score {item.score}</Badge>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
                  <div className="rounded-lg bg-background p-2">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Attrition</p>
                    <p className="mt-1 font-semibold text-foreground">{item.attrition}%</p>
                  </div>
                  <div className="rounded-lg bg-background p-2">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Attendance</p>
                    <p className="mt-1 font-semibold text-foreground">{item.attendance}%</p>
                  </div>
                  <div className="rounded-lg bg-background p-2">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Productivity</p>
                    <p className="mt-1 font-semibold text-foreground">{item.productivity}%</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="text-base">Trend Charts</CardTitle>
            <CardDescription>Forecasts generated from simulated workforce signals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">Attendance Prediction</span>
                <span className="text-muted-foreground">Projected compliance</span>
              </div>
              <ChartContainer config={chartConfig} className="h-[200px] w-full">
                <AreaChart data={attendancePrediction}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} domain={[80, 95]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Area type="monotone" dataKey="value" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1) / 0.18)" strokeWidth={2.5} />
                </AreaChart>
              </ChartContainer>
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">Performance Prediction</span>
                <span className="text-muted-foreground">Expected productivity trend</span>
              </div>
              <ChartContainer config={chartConfig} className="h-[200px] w-full">
                <LineChart data={performancePrediction}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} domain={[75, 90]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Line type="monotone" dataKey="value" stroke="hsl(var(--chart-2))" strokeWidth={2.5} dot={{ r: 4 }} />
                </LineChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="text-base">Trend Charts</CardTitle>
            <CardDescription>Leave and attrition forecasts for the next quarter</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">Leave Forecast</span>
                <span className="text-muted-foreground">Projected leave requests</span>
              </div>
              <ChartContainer config={chartConfig} className="h-[200px] w-full">
                <BarChart data={leaveForecast}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="value" fill="hsl(var(--chart-3))" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">Attrition Trend</span>
                <span className="text-muted-foreground">Risk outlook</span>
              </div>
              <ChartContainer config={chartConfig} className="h-[200px] w-full">
                <AreaChart data={attritionTrend}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} domain={[5, 8.5]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Area type="monotone" dataKey="value" stroke="hsl(var(--chart-4))" fill="hsl(var(--chart-4) / 0.16)" strokeWidth={2.5} />
                </AreaChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="border-border/60 xl:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Attendance Heatmap</CardTitle>
            <CardDescription>Zone-level attendance intensity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {attendanceHeatmap.map((row) => (
                <div key={row.zone}>
                  <div className="mb-2 text-sm font-medium text-foreground">{row.zone}</div>
                  <div className="grid grid-cols-5 gap-2">
                    {row.values.map((value, index) => (
                      <div key={`${row.zone}-${index}`} className={`rounded-md px-2 py-2 text-center text-[11px] font-semibold ${heatmapClass(value, "attendance")}`}>
                        {value}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 xl:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Risk Heatmap</CardTitle>
            <CardDescription>Potential operational risk across zones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {riskHeatmap.map((row) => (
                <div key={row.zone}>
                  <div className="mb-2 text-sm font-medium text-foreground">{row.zone}</div>
                  <div className="grid grid-cols-5 gap-2">
                    {row.values.map((value, index) => (
                      <div key={`${row.zone}-${index}`} className={`rounded-md px-2 py-2 text-center text-[11px] font-semibold ${heatmapClass(value, "risk")}`}>
                        {value}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 xl:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Performance Heatmap</CardTitle>
            <CardDescription>Productivity strength by operational cluster</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {performanceHeatmap.map((row) => (
                <div key={row.zone}>
                  <div className="mb-2 text-sm font-medium text-foreground">{row.zone}</div>
                  <div className="grid grid-cols-5 gap-2">
                    {row.values.map((value, index) => (
                      <div key={`${row.zone}-${index}`} className={`rounded-md px-2 py-2 text-center text-[11px] font-semibold ${heatmapClass(value, "performance")}`}>
                        {value}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/60">
        <CardHeader>
          <CardTitle className="text-base">System Intelligence Summary</CardTitle>
          <CardDescription>Overall organization health and next actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">Overall Organization Health</p>
                <p className="mt-1 text-sm text-muted-foreground">The simulated model identifies strong leadership performance, improving attendance compliance, and moderate pressure in sanitation and field operations.</p>
              </div>
              <div className="rounded-full bg-success/10 px-4 py-2 text-sm font-semibold text-success">Stable outlook</div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            {[
              "Increase staffing in South Zone",
              "Monitor Engineering Department",
              "Review attendance policy",
              "Provide wellness intervention",
            ].map((item) => (
              <div key={item} className="rounded-xl border border-border/60 bg-background p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <ArrowUpRight className="h-4 w-4 text-primary" />
                  {item}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">Recommended action generated from simulated workforce signals.</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
