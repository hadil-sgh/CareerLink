export enum Role {
    Admin = "Admin",
    HRManager = "HR_manager",
    Consultant = "Consultant",
    ProjectManager = "Project_manager",
    SalesManager = "Sales_manager",
    Employee = "Employee"
  }
  
  export interface Daysoffbyrole {
    id: number;
    role: Role;
    daysoff: number;
  }
  