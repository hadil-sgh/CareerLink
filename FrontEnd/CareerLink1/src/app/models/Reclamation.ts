import { StatuReclamation } from "./statuReclamation";
import { TypeReclamation } from "./typeReclamation";
import {Reponse } from "./Reponse";


export class Reclamation {

    idreclamation!:number;
    datereclamation!: Date;
    description!: string;
    statuReclamation!:StatuReclamation;
    typeReclamation!:TypeReclamation;
   
     
 
    reponse!: Reponse[]; 
   
    
 }