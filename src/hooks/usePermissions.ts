import { useMemo } from "react";
import { useAuth } from "@/lib/auth";
import { normalizeRole, type RoleLike, type RoleName } from "@/lib/permissions";

export function usePermissions(allowedRoles: readonly RoleLike[] = []) {
  const { user, isReady } = useAuth();

  const normalizedUserRole = useMemo(() => normalizeRole(user?.role), [user?.role]);
  const normalizedAllowedRoles = useMemo(() => allowedRoles.map((role) => normalizeRole(role)), [allowedRoles]);

  const isAuthenticated = Boolean(user && isReady);
  const hasAccess = isAuthenticated && (normalizedAllowedRoles.length === 0 || normalizedAllowedRoles.includes(normalizedUserRole));

  return {
    user,
    isReady,
    isAuthenticated,
    hasAccess,
    normalizedRole: normalizedUserRole,
    allowedRoles: normalizedAllowedRoles,
    hasRole: (role: RoleLike) => normalizeRole(role) === normalizedUserRole,
  };
}
