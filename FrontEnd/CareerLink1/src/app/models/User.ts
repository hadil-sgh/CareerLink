import { Role } from "./Role";

export class User{
    id!:number;
    firstName!:String;
    lastName!:String;
    phoneNumber!:number;
    address!:String;
    birthday!:Date;
    role!:Role;
    email!:String;
    login!:String;
    pwd!:String
}
