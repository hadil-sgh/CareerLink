
import {Project } from "./Project";
import { Reclamation } from "./Reclamation";
import { User } from "./User";

import { MethodPayment } from "./methodPayment";
import { StatusPayment } from "./statuspayment";
export class Expense {

   idexpense!:number;
   unitPrice!: number;
   quantity!: number;
    amount!: number;
    dateexpense!: Date;
    category!: string;
    methodPayment!:MethodPayment;
    
    statusPayment!:StatusPayment;

   user: User = new User();
    project: Project = new Project(); 
    reclamation!:Reclamation[];
    
   
}