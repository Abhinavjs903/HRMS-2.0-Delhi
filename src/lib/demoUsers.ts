export type Role = "Administrator" | "HR Officer" | "Department Head" | "Employee";

export type DemoUser = {
  id: string;
  label: string;
  role: Role;
  zone_id: string;
  department_id: string;
  employee_id: string;
  name: string;
  email: string;
  password: string;
  department: string;
  designation: string;
};

export const demoUsers: DemoUser[] = [
  {
    id: "u-001",
    label: "Administrator",
    role: "Administrator",
    zone_id: "central",
    department_id: "administration",
    employee_id: "MCD-ADM-001",
    name: "Rajesh Kumar",
    email: "admin@mcd.gov.in",
    password: "Admin@123",
    department: "Administration",
    designation: "System Administrator",
  },
  {
    id: "u-002",
    label: "HR Officer (South Zone)",
    role: "HR Officer",
    zone_id: "south",
    department_id: "human-resources",
    employee_id: "MCD-HR-014",
    name: "Priya Sharma",
    email: "hr@mcd.gov.in",
    password: "Hr@123",
    department: "Human Resources",
    designation: "Sr. HR Officer",
  },
  {
    id: "u-003",
    label: "Department Head (Sanitation)",
    role: "Department Head",
    zone_id: "south",
    department_id: "sanitation",
    employee_id: "MCD-SN-128",
    name: "Vikram Singh",
    email: "head@mcd.gov.in",
    password: "Head@123",
    department: "Sanitation",
    designation: "Department Head",
  },
  {
    id: "u-004",
    label: "Employee",
    role: "Employee",
    zone_id: "south",
    department_id: "sanitation",
    employee_id: "MCD-SN-128",
    name: "Anjali Verma",
    email: "employee@mcd.gov.in",
    password: "Employee@123",
    department: "Sanitation",
    designation: "Junior Engineer",
  },
];
