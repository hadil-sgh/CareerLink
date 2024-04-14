
import { Team } from "./Team";
import { Task } from "./Task";
import { Expense } from "./Expense";
import { User } from "./User";

export class Project {
    idProject!: number;
    name!: string;
    description!: string;
    dueDate!: Date;
    price!: number;
    teams!: Team[];
    tasks!: Task[];
    expense!: Expense[];
  
  }   
