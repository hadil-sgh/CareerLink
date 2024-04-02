
import {Project } from "./Project";
import { Reclamation } from "./Reclamation";

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
    qrCodeData!:string;
     qrCodeImageUrl!:string;
    statusPayment!:StatusPayment;
   
    project: Project = new Project(); 
    reclamation!:Reclamation[];
    
   
}