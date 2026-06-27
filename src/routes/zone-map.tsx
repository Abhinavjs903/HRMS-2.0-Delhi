import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/widgets/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Building2 } from "lucide-react";

export const Route = createFileRoute("/zone-map")({
  head: () => ({ meta: [{ title: "Zone & Ward Map — Nagar Setu HRMS" }] }),
  component: ZoneMapPage,
});

const ZONES = [
  { name: "Central", employees: 842, wards: 22, head: "Vikram Singh", color: "bg-primary" },
  { name: "North", employees: 712, wards: 18, head: "Sanjay Mehta", color: "bg-success" },
  { name: "South", employees: 968, wards: 27, head: "Priya Sharma", color: "bg-info" },
  { name: "East", employees: 654, wards: 21, head: "Kavita Nair", color: "bg-warning" },
  { name: "West", employees: 781, wards: 24, head: "Amit Patel", color: "bg-destructive" },
  { name: "Najafgarh", employees: 432, wards: 15, head: "Deepa Iyer", color: "bg-chart-1" },
  { name: "Shahdara North", employees: 521, wards: 12, head: "Ravi Joshi", color: "bg-chart-2" },
  { name: "Shahdara South", employees: 488, wards: 13, head: "Mohit Khanna", color: "bg-chart-3" },
  { name: "Rohini", employees: 612, wards: 19, head: "Anjali Verma", color: "bg-chart-4" },
  { name: "Civil Lines", employees: 398, wards: 11, head: "Neha Gupta", color: "bg-chart-5" },
  { name: "Karol Bagh", employees: 542, wards: 16, head: "Sunita Rao", color: "bg-primary" },
  { name: "Narela", employees: 470, wards: 14, head: "Rajesh Kumar", color: "bg-success" },
];

export function ZoneMapPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Zone & Ward Map"
        description="Geographic workforce distribution across MCD's 12 zones"
        actions={<Button variant="outline" size="sm">Switch to satellite</Button>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-6">
        {/* Map placeholder */}
        <Card className="border-border/60 overflow-hidden">
          <CardContent className="p-0 relative aspect-[4/3] lg:aspect-auto lg:h-[70vh] bg-gradient-to-br from-info/10 via-primary/5 to-success/10">
            <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full opacity-30">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-foreground/40" />
                </pattern>
              </defs>
              <rect width="400" height="400" fill="url(#grid)" />
            </svg>

            {/* Zone pins */}
            {ZONES.map((z, i) => {
              const positions = [
                "top-[45%] left-[42%]", "top-[20%] left-[40%]", "top-[68%] left-[48%]",
                "top-[45%] left-[68%]", "top-[45%] left-[22%]", "top-[60%] left-[18%]",
                "top-[25%] left-[72%]", "top-[40%] left-[78%]", "top-[18%] left-[28%]",
                "top-[32%] left-[50%]", "top-[55%] left-[35%]", "top-[12%] left-[55%]",
              ];
              return (
                <div key={z.name} className={`absolute ${positions[i]} -translate-x-1/2 -translate-y-1/2 group cursor-pointer`}>
                  <div className={`grid h-10 w-10 place-items-center rounded-full ${z.color} text-white shadow-lg ring-4 ring-background/80 hover:scale-110 transition-transform`}>
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-card border border-border rounded-md px-2 py-1 shadow-md whitespace-nowrap">
                      <p className="text-xs font-medium">{z.name}</p>
                      <p className="text-[10px] text-muted-foreground">{z.employees} staff</p>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="absolute bottom-4 left-4 right-4 bg-card/90 backdrop-blur border border-border rounded-lg p-3 shadow-sm">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium">MCD Jurisdiction · NCT of Delhi</span>
                <span className="text-muted-foreground">12 Zones · 250 Wards</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Zone list */}
        <Card className="border-border/60 lg:max-h-[70vh] flex flex-col">
          <CardHeader>
            <CardTitle className="text-base">Zones</CardTitle>
            <CardDescription>Workforce by zone</CardDescription>
          </CardHeader>
          <CardContent className="p-2 overflow-y-auto space-y-1">
            {ZONES.map((z) => (
              <div key={z.name} className="flex items-center gap-3 p-2.5 rounded-md hover:bg-muted cursor-pointer">
                <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-md ${z.color}/15 text-foreground`}>
                  <Building2 className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{z.name}</p>
                  <p className="text-[11px] text-muted-foreground">Head: {z.head}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold flex items-center gap-1"><Users className="h-3 w-3 text-muted-foreground" />{z.employees}</p>
                  <p className="text-[10px] text-muted-foreground">{z.wards} wards</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
