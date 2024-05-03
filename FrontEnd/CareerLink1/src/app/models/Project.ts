
import { Team } from "./Team";
import { Task2 } from "./Task2";
import { Expense } from "./Expense";

export class Project {
    id!: number;
    name!: string;
    description!: string;
    dueDate!: Date;
    price!: number;
    teams!: Team[];
    tasks!: Task2[];
    expense!: Expense;
 
  }   
