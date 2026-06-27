import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Tone = "primary" | "success" | "warning" | "info" | "destructive";

const toneClass: Record<Tone, string> = {
  primary: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/15 text-warning-foreground",
  info: "bg-info/10 text-info",
  destructive: "bg-destructive/10 text-destructive",
};

export function StatCard({
  label,
  value,
  delta,
  trend = "up",
  icon: Icon,
  tone = "primary",
  hint,
}: {
  label: string;
  value: string | number;
  delta?: string;
  trend?: "up" | "down";
  icon: LucideIcon;
  tone?: Tone;
  hint?: string;
}) {
  return (
    <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
            <p className="mt-2 text-2xl font-bold tracking-tight text-foreground">{value}</p>
            {(delta || hint) && (
              <div className="mt-2 flex items-center gap-1.5">
                {delta && (
                  <span className={cn("inline-flex items-center gap-0.5 text-xs font-medium", trend === "up" ? "text-success" : "text-destructive")}>
                    {trend === "up" ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                    {delta}
                  </span>
                )}
                {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
              </div>
            )}
          </div>
          <div className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-lg", toneClass[tone])}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
