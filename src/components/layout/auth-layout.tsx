import type { ReactNode } from "react";
import { Building2, ShieldCheck, Sparkles } from "lucide-react";

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2 bg-background">
      {/* Brand panel */}
      <div className="hidden lg:flex relative flex-col justify-between p-10 text-primary-foreground bg-[oklch(0.22_0.06_260)] overflow-hidden">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top_right,oklch(0.62_0.16_150/0.35),transparent_55%),radial-gradient(circle_at_bottom_left,oklch(0.45_0.13_260/0.5),transparent_60%)]" />

        <div className="relative flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 backdrop-blur">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <p className="text-base font-semibold tracking-tight">Nagar Setu</p>
            <p className="text-xs text-white/60">Municipal Corporation of Delhi</p>
          </div>
        </div>

        <div className="relative space-y-6">
          <h1 className="text-4xl font-bold tracking-tight leading-tight">
            Unified HRMS for<br />Delhi's civic workforce.
          </h1>
          <p className="text-white/70 max-w-md text-base">
            Manage employees, attendance, payroll, transfers and grievances across all
            twelve MCD zones from a single, secure portal.
          </p>

          <div className="grid gap-3 max-w-md">
            {[
              { icon: ShieldCheck, title: "Role-based access", desc: "Admin · HR · Department Head · Employee" },
              { icon: Sparkles, title: "Zone & ward intelligence", desc: "Real-time workforce visibility across MCD" },
            ].map((f) => (
              <div key={f.title} className="flex items-start gap-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 p-3.5">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-success/20 text-success">
                  <f.icon className="h-4.5 w-4.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium">{f.title}</p>
                  <p className="text-xs text-white/60">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-xs text-white/50">
          © 2026 Municipal Corporation of Delhi · Government of NCT of Delhi
        </p>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
