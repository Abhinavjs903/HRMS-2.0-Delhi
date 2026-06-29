export type RoleName = "admin" | "hr_officer" | "department_head" | "employee";
export type RoleLike = RoleName | string | null | undefined;

const ROLE_ALIASES: Record<string, RoleName> = {
  admin: "admin",
  administrator: "admin",
  "system administrator": "admin",
  hr_officer: "hr_officer",
  hr: "hr_officer",
  "hr officer": "hr_officer",
  department_head: "department_head",
  head: "department_head",
  "department head": "department_head",
  employee: "employee",
};

export const ROLE_LABELS: Record<RoleName, string> = {
  admin: "Administrator",
  hr_officer: "HR Officer",
  department_head: "Department Head",
  employee: "Employee",
};

export const ROLE_ORDER: RoleName[] = ["admin", "hr_officer", "department_head", "employee"];

export const ROLE_PERMISSIONS: Record<RoleName, string[]> = {
  admin: ["dashboard", "employees", "attendance", "leave", "payroll", "transfers", "grievances", "employee-360", "employee-setup", "delhi-workforce", "zone-map", "settings", "profile"],
  hr_officer: ["dashboard", "employees", "attendance", "leave", "payroll", "grievances", "employee-360", "employee-setup", "delhi-workforce", "settings", "profile"],
  department_head: ["dashboard", "employees", "attendance", "leave", "transfers", "grievances", "employee-360", "delhi-workforce", "zone-map", "profile"],
  employee: ["dashboard", "attendance", "leave", "payroll", "grievances", "profile"],
};

export function normalizeRole(role: RoleLike): RoleName {
  if (!role) return "employee";

  const normalized = String(role).trim().toLowerCase().replace(/[^a-z0-9]+/g, "_");
  return ROLE_ALIASES[normalized] ?? "employee";
}

export function hasRole(role: RoleLike, allowedRoles: readonly RoleLike[]): boolean {
  const normalizedRole = normalizeRole(role);
  return allowedRoles.some((candidate) => normalizeRole(candidate) === normalizedRole);
}
