import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AuthLayout } from "@/components/layout/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useAuth, ROLES, type Role } from "@/lib/auth";
import { Lock, Mail } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [{ title: "Sign in — Nagar Setu HRMS" }],
  }),
  component: LoginPage,
});

const DEMO_EMAIL: Record<Role, string> = {
  Admin: "admin@mcd.gov.in",
  "HR Officer": "hr@mcd.gov.in",
  "Department Head": "head@mcd.gov.in",
  Employee: "anjali@mcd.gov.in",
};

function LoginPage() {
  const { login, user, isReady } = useAuth();
  const router = useRouter();
  const [role, setRole] = useState<Role>("Admin");
  const [email, setEmail] = useState(DEMO_EMAIL.Admin);
  const [password, setPassword] = useState("demo1234");

  useEffect(() => {
    if (isReady && user) {
      router.navigate({ to: "/dashboard", replace: true });
    }
  }, [router, isReady, user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(role);
  };

  const selectRole = (r: Role) => {
    setRole(r);
    setEmail(DEMO_EMAIL[r]);
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Sign in to your Nagar Setu account to continue.
          </p>
        </div>

        <Card className="p-6 shadow-sm border-border/60">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Official email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a className="text-xs text-primary hover:underline" href="#">Forgot?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Sign in as</Label>
              <div className="grid grid-cols-2 gap-2">
                {ROLES.map((r) => (
                  <button
                    type="button"
                    key={r}
                    onClick={() => selectRole(r)}
                    className={`text-xs font-medium rounded-md border px-3 py-2 text-left transition-colors ${
                      role === r
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border hover:bg-muted text-muted-foreground"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full h-10">
              Sign in to Nagar Setu
            </Button>
          </form>
        </Card>

        <p className="text-xs text-center text-muted-foreground">
          Restricted to authorized MCD personnel. By signing in you agree to the
          Government IT usage policy.
        </p>
      </div>
    </AuthLayout>
  );
}
