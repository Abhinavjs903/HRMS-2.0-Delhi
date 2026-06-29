import type { AuthUser } from "./auth";
import { normalizeRole } from "./permissions";

export type DemoUserLike = Pick<AuthUser, "role" | "zone_id" | "department_id" | "employee_id"> | null | undefined;

type ResolvedScope = {
  role: ReturnType<typeof normalizeRole>;
  zoneId: string;
  departmentId: string;
  employeeId: string;
};

type ScopeItem = {
  id?: string;
  employeeId?: string;
  employee?: string;
  department?: string;
  zone?: string;
};

type EmployeeLike = ScopeItem & {
  department?: string;
  zone?: string;
  id?: string;
};

type EmployeeLookup = {
  id?: string;
  department?: string;
  zone?: string;
};

function normalizeValue(value: string | null | undefined) {
  return String(value ?? "").trim().toLowerCase();
}

function resolveScope(user: DemoUserLike): ResolvedScope {
  return {
    role: normalizeRole(user?.role),
    zoneId: normalizeValue(user?.zone_id),
    departmentId: normalizeValue(user?.department_id),
    employeeId: normalizeValue(user?.employee_id),
  };
}

function matchesScope(item: ScopeItem, scope: ResolvedScope, employeeLookup?: EmployeeLookup) {
  if (scope.role === "admin") return true;

  const itemZone = normalizeValue((employeeLookup?.zone) ?? (item as { zone?: string }).zone);
  const itemDepartment = normalizeValue((employeeLookup?.department) ?? (item as { department?: string }).department);
  const itemEmployeeId = normalizeValue((item as { employeeId?: string }).employeeId ?? (item as { id?: string }).id ?? (item as { employee?: string }).employee);

  if (scope.role === "hr_officer") {
    return itemZone === scope.zoneId;
  }

  if (scope.role === "department_head") {
    return itemDepartment === scope.departmentId;
  }

  if (scope.role === "employee") {
    return itemEmployeeId === scope.employeeId;
  }

  return true;
}

export function filterForUser<T extends ScopeItem>(
  items: T[],
  user: DemoUserLike,
  resolveItemScope?: (item: T, scope: ResolvedScope) => boolean,
) {
  const scope = resolveScope(user);

  if (scope.role === "admin") return items;

  return items.filter((item) => resolveItemScope?.(item, scope) ?? matchesScope(item, scope));
}

export function filterEmployeesForUser<T extends EmployeeLike>(items: T[], user: DemoUserLike) {
  return filterForUser(items, user, (employee, scope) => {
    const itemZone = normalizeValue(employee.zone);
    const itemDepartment = normalizeValue(employee.department);
    const itemEmployeeId = normalizeValue(employee.id);

    if (scope.role === "hr_officer") return itemZone === scope.zoneId;
    if (scope.role === "department_head") return itemDepartment === scope.departmentId;
    if (scope.role === "employee") return itemEmployeeId === scope.employeeId;
    return true;
  });
}

export function filterPayrollForUser<T extends ScopeItem>(items: T[], user: DemoUserLike, employeeLookup: EmployeeLookup[]) {
  return filterForUser(items, user, (item, scope) => {
    const employee = employeeLookup.find((candidate) => normalizeValue(candidate.id) === normalizeValue(item.employeeId));
    return matchesScope(item, scope, employee);
  });
}

export function filterAttendanceForUser<T extends ScopeItem>(items: T[], user: DemoUserLike, employeeLookup: EmployeeLookup[]) {
  return filterForUser(items, user, (item, scope) => {
    const employee = employeeLookup.find((candidate) => normalizeValue(candidate.id) === normalizeValue(item.employeeId));
    return matchesScope(item, scope, employee);
  });
}

export function filterLeaveForUser<T extends ScopeItem>(items: T[], user: DemoUserLike, employeeLookup: EmployeeLookup[]) {
  return filterForUser(items, user, (item, scope) => {
    const employee = employeeLookup.find((candidate) => normalizeValue(candidate.id) === normalizeValue(item.employeeId));
    return matchesScope(item, scope, employee);
  });
}
