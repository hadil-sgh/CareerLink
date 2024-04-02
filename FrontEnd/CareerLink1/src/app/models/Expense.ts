
import {Project } from "./Project";
import { Reclamation } from "./Reclamation";

import { MethodPayment } from "./methodPayment";
export class Expense {

   idexpense!:number;
   unitPrice!: number;
   quantity!: number;
    amount!: number;
    dateexpense!: Date;
    category!: string;
    methodPayment!:MethodPayment;
    qrCodeData!:string;
     qrCodeImageUrl!:string;
  
   
    project: Project = new Project(); 
    reclamation!:Reclamation[];
    
   
}