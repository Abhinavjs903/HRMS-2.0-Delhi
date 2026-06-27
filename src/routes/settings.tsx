import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/widgets/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — Nagar Setu HRMS" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <DashboardLayout>
      <PageHeader title="Settings" description="Configure your Nagar Setu workspace" />

      <Tabs defaultValue="general" orientation="vertical" className="grid grid-cols-1 md:grid-cols-[200px_minmax(0,1fr)] gap-6">
        <TabsList className="flex md:flex-col md:h-auto md:bg-transparent md:p-0 md:items-stretch">
          <TabsTrigger value="general" className="md:justify-start">General</TabsTrigger>
          <TabsTrigger value="security" className="md:justify-start">Security</TabsTrigger>
          <TabsTrigger value="notifications" className="md:justify-start">Notifications</TabsTrigger>
          <TabsTrigger value="integrations" className="md:justify-start">Integrations</TabsTrigger>
        </TabsList>

        <div>
          <TabsContent value="general" className="mt-0 space-y-4">
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="text-base">Organisation</CardTitle>
                <CardDescription>Public-facing details for your workspace</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Field label="Organisation name" defaultValue="Municipal Corporation of Delhi" />
                <Field label="Workspace URL" defaultValue="nagarsetu.mcd.gov.in" />
                <Field label="Support email" defaultValue="support@mcd.gov.in" />
                <Separator />
                <Toggle title="Enable dark mode by default" desc="New users land on the dark theme on first login." />
                <Toggle title="Show department in navigation" desc="Display the user's department under their name." defaultChecked />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="mt-0">
            <Card className="border-border/60">
              <CardHeader><CardTitle className="text-base">Security policies</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <Toggle title="Require 2-Factor Authentication" desc="All employees must enroll in 2FA within 7 days." defaultChecked />
                <Toggle title="Single Sign-On (SSO)" desc="Allow login via Government DigiLocker ID." defaultChecked />
                <Toggle title="Auto-lock idle sessions" desc="Lock the dashboard after 15 minutes of inactivity." />
                <Toggle title="Audit log retention (90 days)" desc="Persist user actions for compliance." defaultChecked />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="mt-0">
            <Card className="border-border/60">
              <CardHeader><CardTitle className="text-base">Notification preferences</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <Toggle title="Leave approvals" desc="Email + in-app alerts when an approval is pending." defaultChecked />
                <Toggle title="Payroll updates" desc="Notify me when payroll cycles complete." defaultChecked />
                <Toggle title="Grievance escalations" desc="Notify on critical-priority grievances." defaultChecked />
                <Toggle title="Weekly digest" desc="Receive a Monday-morning summary email." />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="mt-0">
            <Card className="border-border/60">
              <CardHeader><CardTitle className="text-base">Connected systems</CardTitle></CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-3">
                {[
                  { name: "DigiLocker SSO", desc: "Government identity provider", on: true },
                  { name: "GPF / Pension Portal", desc: "Sync deductions monthly", on: true },
                  { name: "Aadhaar e-KYC", desc: "Onboarding verification", on: true },
                  { name: "SMS Gateway (BSNL)", desc: "OTP and notifications", on: false },
                ].map((i) => (
                  <div key={i.name} className="flex items-start justify-between rounded-lg border p-3.5">
                    <div className="min-w-0 pr-2">
                      <p className="text-sm font-medium">{i.name}</p>
                      <p className="text-xs text-muted-foreground">{i.desc}</p>
                    </div>
                    <Switch defaultChecked={i.on} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </DashboardLayout>
  );
}

function Field({ label, defaultValue }: { label: string; defaultValue?: string }) {
  return (
    <div className="grid sm:grid-cols-[200px_minmax(0,1fr)_auto] gap-3 items-center">
      <Label className="text-sm">{label}</Label>
      <Input defaultValue={defaultValue} />
      <Button variant="ghost" size="sm">Save</Button>
    </div>
  );
}

function Toggle({ title, desc, defaultChecked }: { title: string; desc: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}
