import { Stock } from "./Stock";
import {Project } from "./Project";

import { MethodPayment } from "./methodPayment";
export class Expense {

   idexpense!:number;
    amount!: number;
    date!: Date;
    category!: string;
    methodPayment!:MethodPayment;
   
  
    stock!: Stock; // Vous devrez spécifier le type correct selon votre logique

    project!: Project; // Vous devrez spécifier le type correct selon votre logique
}