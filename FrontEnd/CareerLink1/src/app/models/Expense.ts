import { Stock } from "./Stock";
import { MethodPayment } from "./methodPayment";
export class Expense {

   idexpense!:number;
    amount!: number;
    date!: Date;
    category!: string;
    methodPayment!:MethodPayment;
    stock!: Stock; // Vous devrez spécifier le type correct selon votre logique

    project!: any; // Vous devrez spécifier le type correct selon votre logique
}