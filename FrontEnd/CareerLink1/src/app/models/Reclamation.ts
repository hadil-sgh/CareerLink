
import { TypeReclamation } from "./typeReclamation";
import {Reponse } from "./Reponse";
import { Expense } from "./Expense";

export class Reclamation {

    idreclamation!:number;
    datereclamation!: Date;
    description!: string;
 
    typeReclamation!:TypeReclamation;
   importance!:number;
     
 
    reponse!: Reponse[]; 
    expense: Expense = new Expense(); 

   
    
 }