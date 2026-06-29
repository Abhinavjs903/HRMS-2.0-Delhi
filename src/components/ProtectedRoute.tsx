import { useEffect, type ReactNode } from "react";
import { useRouter } from "@tanstack/react-router";
import { usePermissions } from "@/hooks/usePermissions";
import type { RoleLike } from "@/lib/permissions";

type ProtectedRouteProps = {
  allowedRoles: readonly RoleLike[];
  children: ReactNode;
};

export function ProtectedRoute({ allowedRoles, children }: ProtectedRouteProps) {
  const router = useRouter();
  const { isReady, isAuthenticated, hasAccess } = usePermissions(allowedRoles);

  useEffect(() => {
    if (!isReady) return;

    if (!isAuthenticated) {
      router.navigate({ to: "/login", replace: true });
      return;
    }

    if (!hasAccess) {
      router.navigate({ to: "/unauthorized", replace: true });
    }
  }, [hasAccess, isAuthenticated, isReady, router]);

  if (!isReady || !isAuthenticated || !hasAccess) {
    return null;
  }

  return <>{children}</>;
}
