import { Status } from "./Status";

export interface Task2 {
    id: number;
    description: string;
    dueDate: Date;
    status: Status;
    priority: Priority;
    user: User;
  }
  

  
  export enum Priority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH'
  }
  
  export interface User {
    // Define the properties of the User entity here
  }
  