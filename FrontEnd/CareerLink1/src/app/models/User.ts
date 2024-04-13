import { Role } from "./Role";
import { Expense } from "./Expense";

export class User{
    id!:number;
    firstName!:String;
    lastName!:String;
    cin!:number;
    phoneNumber!:number;
    address!:String;
    birthday!:Date;
    recdate!:Date;
    role!:Role;
    email!:string;
    expense!: Expense[];
   
}
