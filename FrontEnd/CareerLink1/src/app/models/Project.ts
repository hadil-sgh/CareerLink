<<<<<<< HEAD
export class Project {
     idProject!:number;
     name!:String;
    description!:String;
     dueDate!:Date;
     price!:number;
}
=======
import { Team } from "./Team";
import { Task } from "./Task";
import { Expense } from "./Expense";

export class Project {
    id!: number;
    name!: string;
    description!: string;
    dueDate!: Date;
    price!: number;
    teams!: Team[];
    tasks!: Task[];
    expense!: Expense;
 
  }   
>>>>>>> eeba9af5cbccc19b71a1c1112c2e2050c0ddfd7b
