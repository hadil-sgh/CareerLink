import { Stock } from "./Stock";
<<<<<<< HEAD
import {Project } from "./Project";
=======
>>>>>>> eeba9af5cbccc19b71a1c1112c2e2050c0ddfd7b
import { MethodPayment } from "./methodPayment";
export class Expense {

   idexpense!:number;
    amount!: number;
    date!: Date;
    category!: string;
    methodPayment!:MethodPayment;
<<<<<<< HEAD
   
  
    stock!: Stock; // Vous devrez spécifier le type correct selon votre logique

    project!: Project; // Vous devrez spécifier le type correct selon votre logique
=======
    stock!: Stock; // Vous devrez spécifier le type correct selon votre logique

    project!: any; // Vous devrez spécifier le type correct selon votre logique
>>>>>>> eeba9af5cbccc19b71a1c1112c2e2050c0ddfd7b
}