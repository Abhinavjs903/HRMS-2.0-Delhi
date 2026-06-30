import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { AuthLayout } from "@/components/layout/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/lib/auth";
import { demoUsers } from "@/lib/demoUsers";
import { Lock, Mail } from "lucide-react";
import { NagarSetuLogoLarge } from "@/components/widgets/logo";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [{ title: "Sign in — Nagar Setu HRMS" }],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { login, user, isReady } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("admin@mcd.gov.in");
  const [password, setPassword] = useState("Admin@123");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isReady && user) {
      router.navigate({ to: "/dashboard", replace: true });
    }
  }, [router, isReady, user]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const ok = login(email, password);
    if (!ok) {
      setError("Invalid email or password. Please use one of the demo accounts below.");
    }
  };

  const handleDemoLogin = (demoUser: (typeof demoUsers)[number]) => {
    setEmail(demoUser.email);
    setPassword(demoUser.password);
    setError("");
    login(demoUser.email, demoUser.password);
  };

  return (
    <AuthLayout>
      <div className="flex flex-col gap-4 sm:gap-6">
        {/* Official Logo */}
        <div className="flex justify-center mb-2">
          <NagarSetuLogoLarge />
        </div>

        <div className="space-y-1 text-center">
          <h2 className="text-2xl font-bold tracking-tight">Welcome to Nagar Setu</h2>
          <p className="text-sm text-muted-foreground">
            MCD HRMS Portal — Sign in to access your account.
          </p>
        </div>

        <Card className="p-5 shadow-sm border-border/60 sm:p-6">
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
              <div className="flex items-center justify-between gap-2">
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

            {error ? <p className="text-sm text-destructive">{error}</p> : null}

            <Button type="submit" className="h-11 w-full">
              Sign in to Nagar Setu
            </Button>
          </form>
        </Card>

        <div className="space-y-3">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <h3 className="text-sm font-semibold">Demo Accounts</h3>
            <p className="text-xs text-muted-foreground">Use any account to preview the portal.</p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {demoUsers.map((demoUser) => (
              <Card key={demoUser.id} className="flex h-full flex-col p-4">
                <div className="space-y-1">
                  <p className="text-sm font-semibold">{demoUser.label}</p>
                  <p className="text-xs text-muted-foreground">{demoUser.role}</p>
                </div>
                <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                  <p className="break-all">
                    <span className="font-medium text-foreground">Email:</span> {demoUser.email}
                  </p>
                  <p className="break-all">
                    <span className="font-medium text-foreground">Password:</span> {demoUser.password}
                  </p>
                </div>
                <Button type="button" variant="outline" className="mt-4 h-10 w-full" onClick={() => handleDemoLogin(demoUser)}>
                  Login as {demoUser.label}
                </Button>
              </Card>
            ))}
          </div>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          Restricted to authorized MCD personnel. By signing in you agree to the
          Government IT usage policy.
        </p>
      </div>
    </AuthLayout>
  );
}
