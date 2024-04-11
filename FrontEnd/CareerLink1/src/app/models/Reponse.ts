import {Reclamation } from "./Reclamation";
export class Reponse{
    idrponse!:number;
    datereponse!: Date;
    reponsecontent!: string;  
    reclamation: Reclamation = new Reclamation(); 
   
}