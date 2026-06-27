import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/widgets/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth";
import { Mail, Phone, MapPin, Briefcase, Calendar, KeyRound, Bell } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — Nagar Setu HRMS" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <DashboardLayout>
      <PageHeader title="My Profile" description="Manage your personal information and preferences" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-border/60 overflow-hidden">
          <div className="h-20 bg-gradient-to-r from-primary to-primary/70" />
          <CardContent className="p-6 pt-0 text-center">
            <div className="-mt-10 mx-auto grid h-20 w-20 place-items-center rounded-2xl bg-card text-primary text-xl font-bold ring-4 ring-card shadow-md">
              {user.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
            </div>
            <h2 className="text-lg font-bold mt-3">{user.name}</h2>
            <p className="text-sm text-muted-foreground">{user.designation}</p>
            <Badge variant="secondary" className="mt-2">{user.role}</Badge>

            <div className="mt-6 space-y-2.5 text-left">
              <Row icon={Briefcase} label="Employee ID" value={user.employeeId} />
              <Row icon={Mail} label="Email" value={user.email} />
              <Row icon={Phone} label="Phone" value="+91 98100 12345" />
              <Row icon={MapPin} label="Posting" value={user.department + " · Central"} />
              <Row icon={Calendar} label="Joined" value="March 15, 2012" />
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-base">Personal Details</CardTitle>
              <CardDescription>Keep your contact details up to date</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5"><Label>Full name</Label><Input defaultValue={user.name} /></div>
              <div className="space-y-1.5"><Label>Email</Label><Input defaultValue={user.email} /></div>
              <div className="space-y-1.5"><Label>Phone</Label><Input defaultValue="+91 98100 12345" /></div>
              <div className="space-y-1.5"><Label>Alternate phone</Label><Input defaultValue="011-2345-6789" /></div>
              <div className="space-y-1.5 sm:col-span-2"><Label>Residential address</Label><Input defaultValue="Block-C, Sector 8, Rohini, Delhi 110085" /></div>
              <div className="sm:col-span-2 flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save changes</Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-border/60">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <KeyRound className="h-4 w-4 text-primary" />
                  <CardTitle className="text-sm">Password</CardTitle>
                </div>
                <CardDescription>Last changed 2 months ago</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm" className="w-full">Change password</Button>
              </CardContent>
            </Card>
            <Card className="border-border/60">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-primary" />
                  <CardTitle className="text-sm">Notifications</CardTitle>
                </div>
                <CardDescription>You have 3 unread alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm" className="w-full">Manage preferences</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function Row({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2.5 text-sm">
      <Icon className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
      <div className="min-w-0">
        <p className="text-[11px] text-muted-foreground uppercase tracking-wider">{label}</p>
        <p className="font-medium truncate">{value}</p>
      </div>
    </div>
  );
}
