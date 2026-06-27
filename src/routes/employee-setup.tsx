import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/widgets/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, ClipboardList, FileText, User, Users } from "lucide-react";

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <Input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} type={type} />
    </div>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <Textarea value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
    </div>
  );
}

const departments = ["Administration", "Public Health", "Sanitation", "Engineering", "Education", "Horticulture", "Revenue", "Human Resources"];
const zones = ["North", "South", "East", "West", "Central", "Najafgarh", "Shahdara North", "Shahdara South", "Rohini", "Civil Lines", "Karol Bagh"];
const designations = ["Assistant Engineer", "Junior Engineer", "Executive Engineer", "Section Officer", "Department Head", "Field Officer", "Principal", "HR Officer"];

export const Route = createFileRoute("/employee-setup")({
  head: () => ({ meta: [{ title: "Employee Setup — Nagar Setu HRMS" }] }),
  component: EmployeeSetupPage,
});

function EmployeeSetupPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    fatherName: "",
    phone: "",
    email: "",
    address: "",
    department: "",
    zone: "",
    ward: "",
    designation: "",
    joiningDate: "",
  });

  const update = (key: keyof typeof form, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const canProceed = () => {
    if (step === 0) {
      return Boolean(form.name && form.fatherName && form.phone && form.email && form.address);
    }
    return Boolean(form.department && form.zone && form.ward && form.designation && form.joiningDate);
  };

  const submit = () => {
    if (!canProceed()) return;
    setSubmitted(true);
  };

  return (
    <DashboardLayout>
      <PageHeader title="Employee Setup" description="Create a new employee record with role-based onboarding details" />

      <Card className="border-border/60">
        <CardHeader>
          <CardTitle className="text-base">Onboarding wizard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-wrap gap-2">
            {[{ label: "Profile", icon: User }, { label: "Assignment", icon: Users }, { label: "Review", icon: ClipboardList }].map((item, index) => {
              const Icon = item.icon;
              const active = index === step;
              const done = index < step;
              return (
                <div key={item.label} className={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm ${active ? "border-primary bg-primary/10 text-primary" : done ? "border-success/30 bg-success/10 text-success" : "border-border text-muted-foreground"}`}>
                  <Icon className="h-4 w-4" />
                  {item.label}
                </div>
              );
            })}
          </div>

          {submitted ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-background p-10 text-center">
              <CheckCircle2 className="h-12 w-12 text-success" />
              <h3 className="mt-4 text-xl font-semibold">Employee profile created</h3>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">The onboarding record for {form.name || "the new employee"} has been prepared and assigned to {form.zone || "the relevant zone"}.</p>
              <Button className="mt-6" onClick={() => { setSubmitted(false); setStep(0); setForm({ name: "", fatherName: "", phone: "", email: "", address: "", department: "", zone: "", ward: "", designation: "", joiningDate: "" }); }}>Add another employee</Button>
            </div>
          ) : (
            <>
              {step === 0 && (
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Full Name" value={form.name} onChange={(value) => update("name", value)} placeholder="e.g. Rajesh Kumar Sharma" />
                  <Field label="Father's / Guardian's Name" value={form.fatherName} onChange={(value) => update("fatherName", value)} placeholder="e.g. Shri Ram Avtar" />
                  <Field label="Phone" value={form.phone} onChange={(value) => update("phone", value)} placeholder="+91 98100 00000" />
                  <Field label="Official Email" value={form.email} onChange={(value) => update("email", value)} placeholder="name@mcd.gov.in" />
                  <div className="md:col-span-2">
                    <TextAreaField label="Residential Address" value={form.address} onChange={(value) => update("address", value)} placeholder="House no., locality, city, PIN" />
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="grid gap-4 md:grid-cols-2">
                  <Select value={form.department} onValueChange={(value) => update("department", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((department) => <SelectItem key={department} value={department}>{department}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Select value={form.zone} onValueChange={(value) => update("zone", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select zone" />
                    </SelectTrigger>
                    <SelectContent>
                      {zones.map((zone) => <SelectItem key={zone} value={zone}>{zone}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Field label="Ward" value={form.ward} onChange={(value) => update("ward", value)} placeholder="e.g. Ward 78" />
                  <Select value={form.designation} onValueChange={(value) => update("designation", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select designation" />
                    </SelectTrigger>
                    <SelectContent>
                      {designations.map((designation) => <SelectItem key={designation} value={designation}>{designation}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Field label="Joining Date" value={form.joiningDate} onChange={(value) => update("joiningDate", value)} type="date" />
                </div>
              )}

              {step === 2 && (
                <div className="rounded-xl border border-border bg-background p-6">
                  <div className="flex items-start gap-3">
                    <FileText className="mt-1 h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-semibold">Review details</h3>
                      <p className="mt-1 text-sm text-muted-foreground">Confirm the employee profile and service assignment before submission.</p>
                      <div className="mt-4 space-y-2 text-sm">
                        <p><span className="font-medium text-foreground">Name:</span> {form.name || "—"}</p>
                        <p><span className="font-medium text-foreground">Department:</span> {form.department || "—"}</p>
                        <p><span className="font-medium text-foreground">Zone:</span> {form.zone || "—"}</p>
                        <p><span className="font-medium text-foreground">Designation:</span> {form.designation || "—"}</p>
                        <p><span className="font-medium text-foreground">Ward:</span> {form.ward || "—"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-between gap-3">
                <Button variant="outline" onClick={() => setStep((prev) => Math.max(0, prev - 1))} disabled={step === 0}>Back</Button>
                {step < 2 ? <Button onClick={() => setStep((prev) => prev + 1)} disabled={!canProceed()}>Next</Button> : <Button onClick={submit}>Submit</Button>}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
