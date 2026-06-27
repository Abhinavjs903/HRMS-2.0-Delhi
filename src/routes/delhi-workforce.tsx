import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/widgets/page-header";
import { DelhiWorkforcePanel } from "@/components/widgets/delhi-workforce-panel";

export const Route = createFileRoute("/delhi-workforce")({
  head: () => ({ meta: [{ title: "Delhi Workforce — Nagar Setu HRMS" }] }),
  component: DelhiWorkforcePage,
});

function DelhiWorkforcePage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Delhi Workforce"
        description="City wide service delivery and operational coverage insights"
      />
      <DelhiWorkforcePanel />
    </DashboardLayout>
  );
}
