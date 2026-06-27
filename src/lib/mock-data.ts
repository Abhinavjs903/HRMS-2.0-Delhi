import type { Role } from "./auth";

export type Employee = {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  zone: string;
  ward: string;
  joinDate: string;
  status: "Active" | "On Leave" | "Transferred" | "Retired";
  avatar?: string;
};

export const departments = [
  "Administration",
  "Public Health",
  "Sanitation",
  "Engineering",
  "Education",
  "Horticulture",
  "Revenue",
  "Human Resources",
];

export const zones = ["North", "South", "East", "West", "Central", "Najafgarh", "Najafgarh", "Shahdara North", "Shahdara South", "Rohini", "Civil Lines", "Karol Bagh"];

export const employees: Employee[] = [
  { id: "MCD-ADM-001", name: "Rajesh Kumar", email: "rajesh.kumar@mcd.gov.in", phone: "+91 98100 12345", department: "Administration", designation: "System Administrator", zone: "Central", ward: "Ward 42", joinDate: "2012-03-15", status: "Active" },
  { id: "MCD-HR-014", name: "Priya Sharma", email: "priya.sharma@mcd.gov.in", phone: "+91 98100 23456", department: "Human Resources", designation: "Sr. HR Officer", zone: "Central", ward: "Ward 12", joinDate: "2015-07-01", status: "Active" },
  { id: "MCD-PH-002", name: "Vikram Singh", email: "vikram.singh@mcd.gov.in", phone: "+91 98100 34567", department: "Public Health", designation: "Department Head", zone: "North", ward: "Ward 5", joinDate: "2008-09-12", status: "Active" },
  { id: "MCD-SN-128", name: "Anjali Verma", email: "anjali.verma@mcd.gov.in", phone: "+91 98100 45678", department: "Sanitation", designation: "Junior Engineer", zone: "South", ward: "Ward 88", joinDate: "2019-01-20", status: "Active" },
  { id: "MCD-ENG-045", name: "Amit Patel", email: "amit.patel@mcd.gov.in", phone: "+91 98100 56789", department: "Engineering", designation: "Assistant Engineer", zone: "West", ward: "Ward 33", joinDate: "2017-04-10", status: "Active" },
  { id: "MCD-EDU-022", name: "Sunita Rao", email: "sunita.rao@mcd.gov.in", phone: "+91 98100 67890", department: "Education", designation: "Principal", zone: "East", ward: "Ward 60", joinDate: "2010-06-25", status: "On Leave" },
  { id: "MCD-HRT-008", name: "Mohit Khanna", email: "mohit.khanna@mcd.gov.in", phone: "+91 98100 78901", department: "Horticulture", designation: "Garden Supervisor", zone: "Rohini", ward: "Ward 18", joinDate: "2014-11-30", status: "Active" },
  { id: "MCD-REV-066", name: "Kavita Nair", email: "kavita.nair@mcd.gov.in", phone: "+91 98100 89012", department: "Revenue", designation: "Tax Inspector", zone: "South", ward: "Ward 91", joinDate: "2016-02-14", status: "Active" },
  { id: "MCD-SN-201", name: "Ravi Joshi", email: "ravi.joshi@mcd.gov.in", phone: "+91 98100 90123", department: "Sanitation", designation: "Field Officer", zone: "Shahdara North", ward: "Ward 7", joinDate: "2020-08-05", status: "Active" },
  { id: "MCD-PH-074", name: "Deepa Iyer", email: "deepa.iyer@mcd.gov.in", phone: "+91 98101 01234", department: "Public Health", designation: "Health Inspector", zone: "Najafgarh", ward: "Ward 55", joinDate: "2013-12-01", status: "Transferred" },
  { id: "MCD-ENG-112", name: "Sanjay Mehta", email: "sanjay.mehta@mcd.gov.in", phone: "+91 98101 11223", department: "Engineering", designation: "Executive Engineer", zone: "Karol Bagh", ward: "Ward 22", joinDate: "2009-05-18", status: "Active" },
  { id: "MCD-ADM-099", name: "Neha Gupta", email: "neha.gupta@mcd.gov.in", phone: "+91 98101 33445", department: "Administration", designation: "Section Officer", zone: "Civil Lines", ward: "Ward 3", joinDate: "2018-10-22", status: "Active" },
];

export const stats = {
  totalEmployees: 8420,
  presentToday: 7612,
  onLeave: 312,
  pendingApprovals: 47,
  payrollProcessed: "₹ 18.4 Cr",
  openGrievances: 23,
  transfersThisMonth: 14,
  newJoiners: 32,
};

export type LeaveRequest = {
  id: string;
  employee: string;
  employeeId: string;
  type: "Casual" | "Sick" | "Earned" | "Maternity" | "Compensatory";
  from: string;
  to: string;
  days: number;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
};

export const leaveRequests: LeaveRequest[] = [
  { id: "LV-1042", employee: "Anjali Verma", employeeId: "MCD-SN-128", type: "Casual", from: "2026-07-02", to: "2026-07-03", days: 2, reason: "Personal work", status: "Pending" },
  { id: "LV-1041", employee: "Amit Patel", employeeId: "MCD-ENG-045", type: "Sick", from: "2026-06-28", to: "2026-06-30", days: 3, reason: "Fever", status: "Pending" },
  { id: "LV-1040", employee: "Sunita Rao", employeeId: "MCD-EDU-022", type: "Earned", from: "2026-06-25", to: "2026-07-05", days: 10, reason: "Family function", status: "Approved" },
  { id: "LV-1039", employee: "Mohit Khanna", employeeId: "MCD-HRT-008", type: "Casual", from: "2026-06-29", to: "2026-06-29", days: 1, reason: "Bank work", status: "Pending" },
  { id: "LV-1038", employee: "Kavita Nair", employeeId: "MCD-REV-066", type: "Earned", from: "2026-07-10", to: "2026-07-14", days: 5, reason: "Vacation", status: "Pending" },
  { id: "LV-1037", employee: "Ravi Joshi", employeeId: "MCD-SN-201", type: "Sick", from: "2026-06-24", to: "2026-06-26", days: 3, reason: "Flu", status: "Rejected" },
];

export type Activity = {
  id: string;
  who: string;
  action: string;
  target: string;
  time: string;
  type: "leave" | "payroll" | "transfer" | "grievance" | "join";
};

export const recentActivity: Activity[] = [
  { id: "A1", who: "Priya Sharma", action: "approved leave for", target: "Anjali Verma", time: "2 min ago", type: "leave" },
  { id: "A2", who: "System", action: "processed June payroll for", target: "Sanitation Dept", time: "1 hr ago", type: "payroll" },
  { id: "A3", who: "Vikram Singh", action: "initiated transfer of", target: "Deepa Iyer", time: "3 hr ago", type: "transfer" },
  { id: "A4", who: "Citizen Portal", action: "filed grievance #G-2287 against", target: "Ward 33 Sanitation", time: "5 hr ago", type: "grievance" },
  { id: "A5", who: "HR Module", action: "onboarded new joiner", target: "Neha Gupta", time: "Yesterday", type: "join" },
  { id: "A6", who: "Rajesh Kumar", action: "updated salary structure for", target: "Engineering grade JE", time: "Yesterday", type: "payroll" },
];

export type Payroll = {
  id: string;
  employee: string;
  employeeId: string;
  department: string;
  basic: number;
  hra: number;
  da: number;
  deductions: number;
  net: number;
  month: string;
  status: "Paid" | "Processing" | "Hold";
};

export const payrolls: Payroll[] = employees.slice(0, 10).map((e, i) => {
  const basic = 45000 + i * 3500;
  const hra = Math.round(basic * 0.27);
  const da = Math.round(basic * 0.42);
  const deductions = Math.round(basic * 0.18);
  return {
    id: `PAY-${2026}06-${1000 + i}`,
    employee: e.name,
    employeeId: e.id,
    department: e.department,
    basic, hra, da, deductions,
    net: basic + hra + da - deductions,
    month: "June 2026",
    status: i % 7 === 0 ? "Hold" : i % 4 === 0 ? "Processing" : "Paid",
  };
});

export type Transfer = {
  id: string;
  employee: string;
  employeeId: string;
  fromZone: string;
  toZone: string;
  fromDept: string;
  toDept: string;
  effectiveDate: string;
  status: "Pending" | "Approved" | "Rejected" | "Completed";
  reason: string;
};

export const transfers: Transfer[] = [
  { id: "TR-501", employee: "Deepa Iyer", employeeId: "MCD-PH-074", fromZone: "Central", toZone: "Najafgarh", fromDept: "Public Health", toDept: "Public Health", effectiveDate: "2026-07-15", status: "Approved", reason: "Departmental restructuring" },
  { id: "TR-502", employee: "Amit Patel", employeeId: "MCD-ENG-045", fromZone: "West", toZone: "Rohini", fromDept: "Engineering", toDept: "Engineering", effectiveDate: "2026-08-01", status: "Pending", reason: "Request by employee" },
  { id: "TR-503", employee: "Ravi Joshi", employeeId: "MCD-SN-201", fromZone: "Shahdara North", toZone: "East", fromDept: "Sanitation", toDept: "Sanitation", effectiveDate: "2026-07-20", status: "Pending", reason: "Workforce balancing" },
  { id: "TR-504", employee: "Mohit Khanna", employeeId: "MCD-HRT-008", fromZone: "Rohini", toZone: "Civil Lines", fromDept: "Horticulture", toDept: "Horticulture", effectiveDate: "2026-06-01", status: "Completed", reason: "Promotion posting" },
  { id: "TR-505", employee: "Kavita Nair", employeeId: "MCD-REV-066", fromZone: "South", toZone: "Karol Bagh", fromDept: "Revenue", toDept: "Revenue", effectiveDate: "2026-07-30", status: "Rejected", reason: "Compassionate grounds" },
];

export type Grievance = {
  id: string;
  title: string;
  filedBy: string;
  category: "Workplace" | "Salary" | "Harassment" | "Facilities" | "Other";
  zone: string;
  ward: string;
  raisedOn: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  status: "Open" | "In Review" | "Resolved" | "Escalated";
};

export const grievances: Grievance[] = [
  { id: "G-2287", title: "Pending sanitation payment dispute", filedBy: "Citizen — Anonymous", category: "Salary", zone: "West", ward: "Ward 33", raisedOn: "2026-06-27", priority: "High", status: "Open" },
  { id: "G-2286", title: "Office AC non-functional", filedBy: "Sanjay Mehta", category: "Facilities", zone: "Karol Bagh", ward: "Ward 22", raisedOn: "2026-06-26", priority: "Medium", status: "In Review" },
  { id: "G-2285", title: "Unfair leave rejection", filedBy: "Ravi Joshi", category: "Workplace", zone: "Shahdara North", ward: "Ward 7", raisedOn: "2026-06-25", priority: "Medium", status: "Escalated" },
  { id: "G-2284", title: "Delay in pension processing", filedBy: "Retired Employee", category: "Salary", zone: "Central", ward: "Ward 12", raisedOn: "2026-06-24", priority: "High", status: "In Review" },
  { id: "G-2283", title: "Workplace harassment report", filedBy: "Anonymous", category: "Harassment", zone: "South", ward: "Ward 88", raisedOn: "2026-06-22", priority: "Critical", status: "Open" },
  { id: "G-2282", title: "Broken washroom plumbing", filedBy: "Mohit Khanna", category: "Facilities", zone: "Rohini", ward: "Ward 18", raisedOn: "2026-06-20", priority: "Low", status: "Resolved" },
];

export type AttendanceRow = {
  employeeId: string;
  name: string;
  department: string;
  checkIn: string;
  checkOut: string;
  status: "Present" | "Late" | "Absent" | "On Leave" | "WFH";
  hours: string;
};

export const todayAttendance: AttendanceRow[] = [
  { employeeId: "MCD-ADM-001", name: "Rajesh Kumar", department: "Administration", checkIn: "09:02", checkOut: "—", status: "Present", hours: "8h 12m" },
  { employeeId: "MCD-HR-014", name: "Priya Sharma", department: "Human Resources", checkIn: "08:55", checkOut: "—", status: "Present", hours: "8h 19m" },
  { employeeId: "MCD-PH-002", name: "Vikram Singh", department: "Public Health", checkIn: "09:34", checkOut: "—", status: "Late", hours: "7h 40m" },
  { employeeId: "MCD-SN-128", name: "Anjali Verma", department: "Sanitation", checkIn: "—", checkOut: "—", status: "On Leave", hours: "—" },
  { employeeId: "MCD-ENG-045", name: "Amit Patel", department: "Engineering", checkIn: "09:01", checkOut: "—", status: "Present", hours: "8h 13m" },
  { employeeId: "MCD-EDU-022", name: "Sunita Rao", department: "Education", checkIn: "—", checkOut: "—", status: "Absent", hours: "—" },
  { employeeId: "MCD-HRT-008", name: "Mohit Khanna", department: "Horticulture", checkIn: "08:45", checkOut: "—", status: "Present", hours: "8h 29m" },
  { employeeId: "MCD-REV-066", name: "Kavita Nair", department: "Revenue", checkIn: "09:15", checkOut: "—", status: "WFH", hours: "8h 00m" },
];

export type Notification = {
  id: string;
  title: string;
  body: string;
  time: string;
  unread: boolean;
};

export const notifications: Notification[] = [
  { id: "n1", title: "Leave approval pending", body: "5 leave requests awaiting your action", time: "2m", unread: true },
  { id: "n2", title: "Payroll processed", body: "June 2026 payroll completed for Sanitation Dept", time: "1h", unread: true },
  { id: "n3", title: "Transfer order issued", body: "TR-501 approved for Deepa Iyer", time: "3h", unread: true },
  { id: "n4", title: "New grievance filed", body: "G-2287 marked High priority", time: "5h", unread: false },
  { id: "n5", title: "Policy update", body: "Updated maternity leave policy circular published", time: "Yesterday", unread: false },
];

export const rolePermissions: Record<Role, string[]> = {
  Admin: ["dashboard", "employees", "attendance", "leave", "payroll", "transfers", "grievances", "employee-360", "employee-setup", "delhi-workforce", "zone-map", "settings", "profile"],
  "HR Officer": ["dashboard", "employees", "attendance", "leave", "payroll", "grievances", "employee-360", "employee-setup", "delhi-workforce", "settings", "profile"],
  "Department Head": ["dashboard", "employees", "attendance", "leave", "transfers", "grievances", "employee-360", "delhi-workforce", "zone-map", "profile"],
  Employee: ["dashboard", "attendance", "leave", "payroll", "grievances", "profile"],
};
