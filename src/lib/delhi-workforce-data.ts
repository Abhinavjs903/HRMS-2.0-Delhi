export const DELHI_DEPARTMENTS = [
  "Sanitation",
  "Public Health",
  "Engineering",
  "Revenue",
  "Education",
  "Horticulture",
  "Enforcement",
  "Administration",
] as const;

export type Department = (typeof DELHI_DEPARTMENTS)[number];

export interface WardMetric {
  id: string;
  name: string;
  number: number;
  employees: number;
  attendancePct: number;
  vacancies: number;
  pendingGrievances: number;
  byDept: Record<Department, { employees: number; attendancePct: number; vacancies: number; grievances: number }>;
}

export interface ZoneMetric {
  id: string;
  name: string;
  code: string;
  employees: number;
  attendancePct: number;
  vacancies: number;
  pendingGrievances: number;
  sanctioned: number;
  wards: WardMetric[];
}

function seeded(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function hashStr(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function buildWard(wardId: string): WardMetric {
  const rnd = seeded(hashStr(wardId));
  const baseEmp = 180 + Math.floor(rnd() * 420);
  const byDept = {} as WardMetric["byDept"];
  let totalEmp = 0;
  let totalPresent = 0;
  let totalVac = 0;
  let totalGriev = 0;

  for (const department of DELHI_DEPARTMENTS) {
    const share = 0.06 + rnd() * 0.16;
    const employees = Math.max(4, Math.round(baseEmp * share));
    const attendancePct = 72 + Math.floor(rnd() * 26);
    const vacancies = Math.floor(rnd() * (employees * 0.18));
    const grievances = Math.floor(rnd() * 14);
    byDept[department] = { employees, attendancePct, vacancies, grievances };
    totalEmp += employees;
    totalPresent += Math.round((employees * attendancePct) / 100);
    totalVac += vacancies;
    totalGriev += grievances;
  }

  return {
    id: wardId,
    name: `Ward ${wardId.split("-").pop()}`,
    number: Number(wardId.split("-").pop()),
    employees: totalEmp,
    attendancePct: Math.round((totalPresent / totalEmp) * 100),
    vacancies: totalVac,
    pendingGrievances: totalGriev,
    byDept,
  };
}

function buildZone(zoneId: string, zoneName: string, code: string, wardCount: number): ZoneMetric {
  const wards: WardMetric[] = Array.from({ length: wardCount }, (_, index) => buildWard(`${zoneId}-w${index + 1}`));
  let employees = 0;
  let present = 0;
  let vacancies = 0;
  let pendingGrievances = 0;

  for (const ward of wards) {
    employees += ward.employees;
    present += Math.round((ward.employees * ward.attendancePct) / 100);
    vacancies += ward.vacancies;
    pendingGrievances += ward.pendingGrievances;
  }

  const sanctioned = Math.round(employees * (1.12 + (hashStr(zoneId) % 7) / 100));

  return {
    id: zoneId,
    name: zoneName,
    code,
    employees,
    attendancePct: employees ? Math.round((present / employees) * 100) : 0,
    vacancies,
    pendingGrievances,
    sanctioned,
    wards,
  };
}

export const DELHI_ZONE_DATA: ZoneMetric[] = [
  buildZone("zone-central", "Central Zone", "MCD-CZ", 5),
  buildZone("zone-north", "North Zone", "MCD-N", 6),
  buildZone("zone-south", "South Zone", "MCD-S", 7),
  buildZone("zone-east", "East Zone", "MCD-E", 6),
  buildZone("zone-west", "West Zone", "MCD-W", 6),
  buildZone("zone-najafgarh", "Najafgarh Zone", "MCD-NG", 5),
  buildZone("zone-civil-lines", "Civil Lines Zone", "MCD-CL", 4),
  buildZone("zone-karol-bagh", "Karol Bagh Zone", "MCD-KB", 4),
];

export const DELHI_CITY_SUMMARY = {
  employees: DELHI_ZONE_DATA.reduce((sum, zone) => sum + zone.employees, 0),
  attendancePct: Math.round(
    DELHI_ZONE_DATA.reduce((sum, zone) => sum + zone.attendancePct * zone.employees, 0) /
      DELHI_ZONE_DATA.reduce((sum, zone) => sum + zone.employees, 0)
  ),
  vacancies: DELHI_ZONE_DATA.reduce((sum, zone) => sum + zone.vacancies, 0),
  pendingGrievances: DELHI_ZONE_DATA.reduce((sum, zone) => sum + zone.pendingGrievances, 0),
  sanctioned: DELHI_ZONE_DATA.reduce((sum, zone) => sum + zone.sanctioned, 0),
};

export function getZoneMetric(zoneId: string) {
  return DELHI_ZONE_DATA.find((zone) => zone.id === zoneId);
}
