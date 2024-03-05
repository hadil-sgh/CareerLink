import { Role } from "./Role";

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
    email!:String;
   
}
