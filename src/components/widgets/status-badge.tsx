import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const TONE: Record<string, string> = {
  Active: "bg-success/10 text-success border-success/20",
  Present: "bg-success/10 text-success border-success/20",
  Paid: "bg-success/10 text-success border-success/20",
  Approved: "bg-success/10 text-success border-success/20",
  Completed: "bg-success/10 text-success border-success/20",
  Resolved: "bg-success/10 text-success border-success/20",

  Pending: "bg-warning/15 text-warning-foreground border-warning/30",
  Processing: "bg-warning/15 text-warning-foreground border-warning/30",
  "In Review": "bg-warning/15 text-warning-foreground border-warning/30",
  Late: "bg-warning/15 text-warning-foreground border-warning/30",
  Medium: "bg-warning/15 text-warning-foreground border-warning/30",

  "On Leave": "bg-info/10 text-info border-info/20",
  WFH: "bg-info/10 text-info border-info/20",
  Low: "bg-info/10 text-info border-info/20",

  Rejected: "bg-destructive/10 text-destructive border-destructive/20",
  Absent: "bg-destructive/10 text-destructive border-destructive/20",
  Hold: "bg-destructive/10 text-destructive border-destructive/20",
  Open: "bg-destructive/10 text-destructive border-destructive/20",
  Escalated: "bg-destructive/10 text-destructive border-destructive/20",
  Critical: "bg-destructive/10 text-destructive border-destructive/20",
  High: "bg-destructive/10 text-destructive border-destructive/20",

  Transferred: "bg-muted text-muted-foreground border-border",
  Retired: "bg-muted text-muted-foreground border-border",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <Badge variant="outline" className={cn("font-medium rounded-md border", TONE[status] ?? "bg-muted text-muted-foreground border-border")}>
      {status}
    </Badge>
  );
}
