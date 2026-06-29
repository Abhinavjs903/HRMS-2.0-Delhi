import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/unauthorized")({
  head: () => ({ meta: [{ title: "Unauthorized — Nagar Setu HRMS" }] }),
  component: UnauthorizedPage,
});

function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md border-border/60 shadow-sm">
        <CardHeader className="space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="text-xl">Access denied</CardTitle>
            <CardDescription>
              You are signed in, but your account does not have permission to view this area.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={() => router.navigate({ to: "/dashboard" })}>
            Go to dashboard
          </Button>
          <Button className="flex-1" onClick={() => router.navigate({ to: "/login" })}>
            Sign out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
