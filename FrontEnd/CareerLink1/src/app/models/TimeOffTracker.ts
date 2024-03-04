import { LeaveStatus } from "./LeaveStatus";
import { LeaveType } from "./LeaveType";
import { User } from "./User";

export class TimeOffTracker { 
     id!:number;
     type !: LeaveType;
     description  !: String;
     fromDate !: Date ;
     toDate !: Date;
     status !:LeaveStatus ;
     user !: User;
}