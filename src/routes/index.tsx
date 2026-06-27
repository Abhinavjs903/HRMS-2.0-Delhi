import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/")({
  component: IndexRedirect,
});

function IndexRedirect() {
  const { user, isReady } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (isReady) {
      router.navigate({ to: user ? "/dashboard" : "/login", replace: true });
    }
  }, [isReady, user, router]);
  return null;
}
